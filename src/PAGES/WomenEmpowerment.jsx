import InitiativePage from "./InitiativePage.jsx";
import { initiativePages } from "./initiativeContent.js";

export default function WomenEmpowerment({ onNavigate }) {
  return <InitiativePage page={initiativePages["initiative-women-empowerment"]} onNavigate={onNavigate} />;
}
