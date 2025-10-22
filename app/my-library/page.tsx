"use client";
import SavedBooks from "../components/book-components/SavedBooks";
import FinishedBooks from "../components/book-components/FinishedBooks";
import Login from "../components/Login";
import { useAuth } from "../components/context/AuthContext";

function MyLibrary() {
  const { user } = useAuth();
  return (
    <>
      <div className="row">
        <div className="container">
          {user ? (
            <>
              <SavedBooks />
              <FinishedBooks />
            </>
          ) : (
            <Login />
          )}
        </div>
      </div>
    </>
  );
}

export default MyLibrary;
