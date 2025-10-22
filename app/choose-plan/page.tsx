"use client"
import PlanHeader from "../components/plan/PlanHeader";
import PlanFeatures from "../components/plan/PlanFeatures";
import PlanCards from "../components/plan/PlanCards";
import PlanFaq from "../components/plan/PlanFaq";

function ChoosePlan() {
  return (
    <>
      <div className="plan">
        <PlanHeader />
        <div className="row">
          <div className="container">
            <PlanFeatures />
            <PlanCards />
            <PlanFaq />
          </div>
        </div>
      </div>
    </>
  );
}

export default ChoosePlan;
