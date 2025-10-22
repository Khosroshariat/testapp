"use client";
import { useState } from "react";

function PlanFaq() {
  const [showAnswer, setShowAnswer] = useState<string | null>(null);

  const toggleAnswer = (faqId: string) => {
    setShowAnswer((prev) => (prev === faqId ? null : faqId));
  };

  return (
    <>
      <div className="faq__wrapper">
        {[
          {
            id: "faq1",
            question: "How does the free 7-day trial work?",
            answer: ` Begin your complimentary 7-day trial with a Summarist annual
              membership. You are under no obligation to continue your
              subscription, and you will only be billed when the trial period
              expires. With Premium access, you can learn at your own pace and
              as frequently as you desire, and you may terminate your
              subscription prior to the conclusion of the 7-day free trial.`,
            height: `120px`,
          },
          {
            id: "faq2",
            question:
              "Can I switch subscriptions from monthly to yearly, or yearly to monthly?",
            answer: ` While an annual plan is active, it is not feasible to switch to a
              monthly plan. However, once the current month ends, transitioning
              from a monthly plan to an annual plan is an option.`,
            height: `72px`,
          },
          {
            id: "faq3",
            question: "What's included in the Premium plan?",
            answer: `Premium membership provides you with the ultimate Summarist
              experience, including unrestricted entry to many best-selling
              books high-quality audio, the ability to download titles for
              offline reading, and the option to send your reads to your Kindle.`,
              height: `96px`
          },
          {
            id: "faq4",
            question: "Can I cancel during my trial or subscription?",
            answer: `You will not be charged if you cancel your trial before its
              conclusion. While you will not have complete access to the entire
              Summarist library, you can still expand your knowledge with one
              curated book per day.`,
              height: `96px`
          },
        ].map((faq) => (
          <div
            key={faq.id}
            className="accordion__card"
            onClick={() => toggleAnswer(faq.id)}
          >
            <div className="accordion__header">
              <div className="accordion__title">{faq.question}</div>
              <svg
                className={`accordion__icon ${
                  showAnswer === faq.id ? "accordion__icon--rotate" : ""
                }`}
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </div>
            <div
              className={`collapse ${showAnswer === faq.id ? "show" : ""}`}
              style={{ height: showAnswer === faq.id ? faq.height : "0px" }}
            >
              <div className="accordion__body">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default PlanFaq;
