import BiogasLearningPage from "./BiogasLearningPage.jsx";
import { biogasLearningPages } from "./biogasLearningContent.js";

export default function HowBiogasWorks({ onNavigate }) {
  return <BiogasLearningPage page={biogasLearningPages["biogas-how-it-works"]} onNavigate={onNavigate} />;
}
