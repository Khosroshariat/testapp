"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSelectedBooks } from "../../redux/booksSlice";
import { RootState, AppDispatch } from "../../redux/store";
import formatTime from "@/app/utilities/formatTime";

function SelectedBooks() {
  const dispatch = useDispatch<AppDispatch>();
  const { selected, loading, error } = useSelector(
    (state: RootState) => state.books
  );
  const [durations, setDurations] = useState<{ [bookId: string]: number }>({});

  useEffect(() => {
    dispatch(fetchSelectedBooks());
  }, [dispatch]);

  const handleLoadedMetadata = (bookId: string, duration: number) => {
    setDurations((prev) => ({
      ...prev,
      [bookId]: duration,
    }));
  };

  if (error.selected) return <div>Error loading selected book</div>;

  return (
    <>
      <div className="for-you__title">Selected just for you</div>
      {selected.map((book) => (
        <div key={book.id}>
          {loading.selected ? (
            <div className="selected__book--skeleton"></div>
          ) : (
            <>
              <audio
                src={book.audioLink}
                onLoadedMetadata={(e) =>
                  handleLoadedMetadata(book.id, e.currentTarget.duration)
                }
                style={{ display: "none" }}
              ></audio>
              <Link className="selected__book" href={`book/${book.id}`}>
                <div className="selected__book--sub-title">{book.subTitle}</div>
                <div className="selected__book--line"></div>
                <div className="selected__book--content">
                  <figure
                    className="book__image--wrapper"
                    style={{
                      height: "140px",
                      width: "140px",
                      minWidth: "140px",
                    }}
                  >
                    {loading.selected ? (
                      <div
                        className="book__image--skeleton"
                        style={{
                          height: "140px",
                          width: "140px",
                          minWidth: "140px",
                        }}
                      ></div>
                    ) : (
                      <img
                        className="book__image"
                        src={book.imageLink}
                        alt="book"
                        style={{ display: "block" }}
                      />
                    )}
                  </figure>
                  <div className="selected__book--text">
                    <div className="selected__book--title">{book.title}</div>
                    <div className="selected__book--author">{book.author}</div>
                    <div className="selected__book--duration-wrapper">
                      <div className="selected__book--icon">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 16 16"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
                        </svg>
                      </div>
                      <div className="selected__book--duration">
                        {formatTime(durations[book.id] || 0)}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </>
          )}
        </div>
      ))}
    </>
  );
}

export default SelectedBooks;
