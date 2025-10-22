"use client";

import AudioPlayer from "../../components/player-files/AudioPlayer";

import { notFound } from "next/navigation";
import { getBookById } from "../../lib/getBookById";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";


 function PlayerBook() {
  const { id } = useParams();
  const [book, setBook] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook() {
      try {
        const fetchedBook = await getBookById(id as string);
        setBook(fetchedBook);
      } catch (error) {
        console.error("Failed to load book", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="audio__book--spinner">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          version="1.1"
          viewBox="0 0 16 16"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 16c-2.137 0-4.146-0.832-5.657-2.343s-2.343-3.52-2.343-5.657c0-1.513 0.425-2.986 1.228-4.261 0.781-1.239 1.885-2.24 3.193-2.895l0.672 1.341c-1.063 0.533-1.961 1.347-2.596 2.354-0.652 1.034-0.997 2.231-0.997 3.461 0 3.584 2.916 6.5 6.5 6.5s6.5-2.916 6.5-6.5c0-1.23-0.345-2.426-0.997-3.461-0.635-1.008-1.533-1.822-2.596-2.354l0.672-1.341c1.308 0.655 2.412 1.656 3.193 2.895 0.803 1.274 1.228 2.748 1.228 4.261 0 2.137-0.832 4.146-2.343 5.657s-3.52 2.343-5.657 2.343z"></path>
        </svg>
      </div>
    );
  }

  if (!book) return <div>Book not found</div>;
  return (
    <>
      <div className="summary">
        <div className="audio__book--summary" style={{ fontSize: "16px" }}>
          <div className="audio__book--summary-title">
            <b>{book.title}</b>
          </div>
          <div className="audio__book--summary-text">{book.summary}</div>
        </div>

        <div className="audio__wrapper">
          <AudioPlayer book={book} />
        </div>
      </div>
    </>
  );
}

export default PlayerBook;
