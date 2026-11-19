import InitiativePage from "./InitiativePage.jsx";
import { initiativePages } from "./initiativeContent.js";

export default function Environment({ onNavigate }) {
  return (
    <InitiativePage
      page={initiativePages["initiative-environment"]}
      onNavigate={onNavigate}
    />
  );
}
