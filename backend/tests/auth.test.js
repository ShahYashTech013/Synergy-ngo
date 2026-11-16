const assert = require("node:assert/strict");
const { randomBytes, randomUUID } = require("node:crypto");
const test = require("node:test");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const userId = "507f1f77bcf86cd799439011";

function mockModelMethod(context, name, implementation) {
  const descriptor = Object.getOwnPropertyDescriptor(User, name);
  Object.defineProperty(User, name, {
    configurable: true,
    writable: true,
    value: implementation,
  });
  context.after(() => {
    if (descriptor) Object.defineProperty(User, name, descriptor);
    else delete User[name];
  });
}

function createResponse() {
  return {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
}

function createUser(overrides = {}) {
  return {
    _id: { toString: () => userId },
    name: "Test User",
    email: `test-${randomUUID()}@example.test`,
    password: "",
    role: "user",
    isActive: true,
    createdAt: new Date("2026-01-01T00:00:00.000Z"),
    updatedAt: new Date("2026-01-01T00:00:00.000Z"),
    ...overrides,
  };
}

test("user authentication validates, hashes, returns safe users, and verifies JWTs", async (t) => {
  const previousSecret = process.env.JWT_SECRET;
  const secret = randomBytes(32).toString("hex");
  process.env.JWT_SECRET = secret;
  t.after(() => {
    if (previousSecret === undefined) delete process.env.JWT_SECRET;
    else process.env.JWT_SECRET = previousSecret;
  });

  await t.test("registers with a bcrypt hash and returns no password fields", async (subtest) => {
    const accountPassword = `T3st-${randomBytes(12).toString("hex")}`;
    const user = createUser({ email: `test-${randomUUID()}@example.test` });
    let createdUser;
    mockModelMethod(subtest, "init", async () => {});
    mockModelMethod(subtest, "exists", async () => null);
    mockModelMethod(subtest, "create", async (details) => {
      createdUser = { ...user, ...details };
      return createdUser;
    });

    const req = {
      body: {
        name: " Test User ",
        email: user.email.toUpperCase(),
        password: accountPassword,
        role: "admin",
      },
    };
    const res = createResponse();
    let nextError;

    await authController.register(req, res, (error) => { nextError = error; });

    assert.equal(nextError, undefined);
    assert.equal(res.statusCode, 201);
    assert.equal(createdUser.name, "Test User");
    assert.equal(createdUser.email, user.email);
    assert.notEqual(createdUser.password, accountPassword);
    assert.equal(await bcrypt.compare(accountPassword, createdUser.password), true);
    assert.equal("password" in res.body.user, false);
    assert.equal("passwordHash" in res.body.user, false);
    assert.equal(res.body.user.role, "user");
    assert.equal(jwt.verify(res.body.token, secret).sub, userId);
  });

  await t.test("rejects a duplicate email", async (subtest) => {
    mockModelMethod(subtest, "init", async () => {});
    mockModelMethod(subtest, "exists", async () => ({ _id: userId }));
    mockModelMethod(subtest, "create", async () => {
      throw new Error("Duplicate users must not be created.");
    });

    const res = createResponse();
    await authController.register({
      body: {
        name: "Test User",
        email: `test-${randomUUID()}@example.test`,
        password: `T3st-${randomBytes(12).toString("hex")}`,
      },
    }, res, (error) => { throw error; });

    assert.equal(res.statusCode, 409);
    assert.match(res.body.message, /already exists/i);
  });

  await t.test("accepts valid login and rejects invalid credentials generically", async (subtest) => {
    const accountPassword = `T3st-${randomBytes(12).toString("hex")}`;
    const user = createUser({ password: await bcrypt.hash(accountPassword, 4) });
    mockModelMethod(subtest, "findOne", () => ({
      select: async () => user,
    }));

    const success = createResponse();
    await authController.login({
      body: { email: user.email.toUpperCase(), password: accountPassword },
    }, success, (error) => { throw error; });

    assert.equal(success.statusCode, 200);
    assert.equal(success.body.user.email, user.email);
    assert.equal("password" in success.body.user, false);

    const failure = createResponse();
    await authController.login({
      body: { email: user.email, password: "wrong-password-123" },
    }, failure, (error) => { throw error; });

    assert.equal(failure.statusCode, 401);
    assert.equal(failure.body.message, "Invalid email or password.");
  });

  await t.test("loads the current role from MongoDB and prevents user tokens from admin access", async (subtest) => {
    const user = createUser();
    mockModelMethod(subtest, "findById", () => ({
      select: async () => user,
    }));

    const req = {
      headers: {
        authorization: `Bearer ${jwt.sign({ sub: userId, role: "admin" }, secret)}`,
      },
    };
    const res = createResponse();
    let nextCalled = false;
    await authMiddleware(req, res, () => { nextCalled = true; });

    assert.equal(nextCalled, true);
    assert.equal(req.user.role, "user");

    authMiddleware.requireAdmin(req, res, () => { throw new Error("User token must not grant admin access."); });
    assert.equal(res.statusCode, 403);
  });

  await t.test("accepts the existing separately signed admin token", async () => {
    const req = {
      headers: {
        authorization: `Bearer ${jwt.sign({ email: "admin@example.test", role: "admin" }, secret)}`,
      },
    };
    const res = createResponse();
    let nextCalled = false;
    await authMiddleware(req, res, () => { nextCalled = true; });

    assert.equal(nextCalled, true);
    assert.equal(req.user.role, "admin");
    authMiddleware.requireAdmin(req, res, () => { nextCalled = true; });
    assert.equal(nextCalled, true);
  });
});
