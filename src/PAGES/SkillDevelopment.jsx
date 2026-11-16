import InitiativePage from "./InitiativePage.jsx";
import { initiativePages } from "./initiativeContent.js";

export default function SkillDevelopment({ onNavigate }) {
  return <InitiativePage page={initiativePages["initiative-skill-development"]} onNavigate={onNavigate} />;
}
