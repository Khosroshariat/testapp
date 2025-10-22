"use client";
import PricingTop from "next/image";

function PlanHeader() {
  return (
    <>
      <div className="plan__header--wrapper">
        <div className="plan__header">
          <div className="plan__title">
            Get unlimited access to many amazing books to read
          </div>
          <div className="plan__sub--title">
            Turn ordinary moments into amazing learning opportunities
          </div>
          <figure className="plan__img--mask">
            <PricingTop
              alt="pricing"
              src="/pricing-top.png"
              width={860}
              height={722}
              loading="lazy"
              style={{ color: "transparent" }}
            />
          </figure>
        </div>
      </div>
    </>
  );
}

export default PlanHeader;
