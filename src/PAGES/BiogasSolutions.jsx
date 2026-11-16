import BiogasLearningPage from "./BiogasLearningPage.jsx";
import { biogasLearningPages } from "./biogasLearningContent.js";

export default function BiogasSolutions({ onNavigate }) {
  return <BiogasLearningPage page={biogasLearningPages["biogas-solutions"]} onNavigate={onNavigate} />;
}
