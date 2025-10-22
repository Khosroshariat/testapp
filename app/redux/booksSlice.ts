import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Book } from "../types/books";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";

interface BooksState {
  recommended: Book[];
  finished: Book[];
  selected: Book[];
  suggested: Book[];
  searchResults: Book[];
  loading: {
    recommended: boolean;
    finished: boolean;
    selected: boolean;
    suggested: boolean;
    search: boolean;
  };
  error: {
    recommended: string | null;
    finished: string | null;
    selected: string | null;
    suggested: string | null;
    search: string | null;
  };
}

const initialState: BooksState = {
  recommended: [],
  finished: [],
  selected: [],
  suggested: [],
  searchResults: [],
  loading: {
    recommended: false,
    finished: false,
    selected: false,
    suggested: false,
    search: false,
  },
  error: {
    recommended: null,
    finished: null,
    selected: null,
    suggested: null,
    search: null,
  },
};

export const fetchRecommendedBooks = createAsyncThunk(
  "books/fetchRecommended",
  async () => {
    const res = await axios.get<Book[]>(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
    );
    return res.data;
  }
);

// Thunk for finished books
export const fetchFinishedBooks = createAsyncThunk(
  "books/fetchFinishedBooks",
  async () => {
    const res = await axios.get<Book[]>("/api/books/finished");
    return res.data;
  }
);

export const fetchSelectedBooks = createAsyncThunk(
  "books/fetchSelectedBooks",
  async () => {
    const res = await axios.get<Book[]>(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
    );
    return res.data;
  }
);

export const fetchSuggestedBooks = createAsyncThunk(
  "books/fetchSuggestedBooks",
  async () => {
    const res = await axios.get<Book[]>(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
    );
    return res.data;
  }
);

export const searchBooks = createAsyncThunk(
  "books/searchBooks",
  async (query: string) => {
    const res = await axios.get<Book[]>(
      `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${query}`
    );
    return res.data;
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
  setBookDuration: (
    state,
    action: PayloadAction<{ bookId: string; duration: number }>
  ) => {
    const { bookId, duration } = action.payload;

    // Update duration for book in all lists
    const allLists = [
      state.recommended,
      state.selected,
      state.suggested,
      state.searchResults,
      state.finished,
    ];

    for (const list of allLists) {
      const book = list.find((b) => b.id === bookId);
      if (book) {
        book.duration = duration;
      }
    }
  },
},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendedBooks.pending, (state) => {
        state.loading.recommended = true;
        state.error.recommended = null;
      })
      .addCase(fetchRecommendedBooks.fulfilled, (state, action) => {
        state.loading.recommended = false;
        state.recommended = action.payload;
      })
      .addCase(fetchRecommendedBooks.rejected, (state, action) => {
        state.loading.recommended = false;
        state.error.recommended =
          action.error.message ?? "Error fetching recommended books";
      })
      .addCase(fetchFinishedBooks.pending, (state) => {
        state.loading.finished = true;
        state.error.finished = null;
      })
      .addCase(fetchFinishedBooks.fulfilled, (state, action) => {
        state.loading.finished = false;
        state.finished = action.payload;
      })
      .addCase(fetchFinishedBooks.rejected, (state, action) => {
        state.loading.finished = false;
        state.error.finished =
          action.error.message ?? "Error fetching finished books";
      })
      .addCase(fetchSelectedBooks.pending, (state) => {
        state.loading.selected = true;
        state.error.selected = null;
      })
      .addCase(fetchSelectedBooks.fulfilled, (state, action) => {
        state.loading.selected = false;
        state.selected = action.payload;
      })
      .addCase(fetchSelectedBooks.rejected, (state, action) => {
        state.loading.selected = false;
        state.error.selected =
          action.error.message ?? "Error fetching selected books";
      })
      .addCase(fetchSuggestedBooks.pending, (state) => {
        state.loading.suggested = true;
        state.error.suggested = null;
      })
      .addCase(fetchSuggestedBooks.fulfilled, (state, action) => {
        state.loading.suggested = false;
        state.suggested = action.payload;
      })
      .addCase(fetchSuggestedBooks.rejected, (state, action) => {
        state.loading.suggested = false;
        state.error.suggested =
          action.error.message ?? "Error fetching suggested books";
      })
      .addCase(searchBooks.pending, (state) => {
        state.loading.search = true;
        state.error.search = null;
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.loading.search = false;
        state.searchResults = action.payload;
      })
      .addCase(searchBooks.rejected, (state, action) => {
        state.loading.search = false;
        state.error.search = action.error.message ?? "Error searching books";
      });
  },
});

export default booksSlice.reducer;
export const { setBookDuration } = booksSlice.actions;
