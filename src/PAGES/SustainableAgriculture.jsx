import InitiativePage from "./InitiativePage.jsx";
import { initiativePages } from "./initiativeContent.js";

export default function SustainableAgriculture({ onNavigate }) {
  return (
    <InitiativePage
      page={initiativePages["initiative-agriculture"]}
      onNavigate={onNavigate}
    />
  );
}
