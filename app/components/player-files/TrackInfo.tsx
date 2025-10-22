import { Book } from "../../types/books";

interface TrackInfoProps {
  book: Book;
}


function TrackInfo({book}:TrackInfoProps) {
  return (
    <>
      <div className="audio__track--wrapper">
        <figure className="audio__track--image-mask">
          <figure
            className="book__image--wrapper"
            style={{ height: "48px", width: "48px", minWidth: "48px" }}
          >
            <img
              className="book__image"
              src={book.imageLink}
               alt={book.title}
              style={{ display: "block" }}
            />
          </figure>
        </figure>
        <div className="audio__track--details-wrapper">
          <div className="audio__track--title">{book.title}</div> 
          <div className="audio__track--author">{book.author}</div>
        </div>
      </div>
    </>
  );
}
export default TrackInfo;
