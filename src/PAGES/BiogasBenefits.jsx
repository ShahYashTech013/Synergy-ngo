import BiogasLearningPage from "./BiogasLearningPage.jsx";
import { biogasLearningPages } from "./biogasLearningContent.js";

export default function BiogasBenefits({ onNavigate }) {
  return <BiogasLearningPage page={biogasLearningPages["biogas-benefits"]} onNavigate={onNavigate} />;
}
