"use client";
import SelectedBooks from "../components/book-components/SelectedBooks";
import RecommendedBooks from "../components/book-components/RecommendedBooks";
import SuggestedBooks from "../components/book-components/SuggestedBooks";

function forYou() {
  return (
    <>
      <div className="row">
        <div className="container">
          <div className="for-you__wrapper">
            <SelectedBooks />

            <div>
              <RecommendedBooks />
            </div>
            <div>
              <SuggestedBooks />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default forYou;
