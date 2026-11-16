const bcrypt = require("bcryptjs");

(async () => {
  const password = process.argv[2];
  if (!password) {
    console.error('Usage: npm run admin:hash -- "YourStrongPassword"');
    process.exit(1);
  }
  console.log(await bcrypt.hash(password, 12));
})();
