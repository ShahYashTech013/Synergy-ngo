import BiogasLearningPage from "./BiogasLearningPage.jsx";
import { biogasLearningPages } from "./biogasLearningContent.js";

export default function UnderstandingBiogas({ onNavigate }) {
  return <BiogasLearningPage page={biogasLearningPages["biogas-understanding"]} onNavigate={onNavigate} />;
}
