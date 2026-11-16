import InitiativePage from "./InitiativePage.jsx";
import { initiativePages } from "./initiativeContent.js";

export default function BiogasCleanEnergy({ onNavigate }) {
  return <InitiativePage page={initiativePages["initiative-biogas-clean-energy"]} onNavigate={onNavigate} />;
}
