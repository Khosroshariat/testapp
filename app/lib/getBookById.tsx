// lib/getBookById.ts
import { Book } from "@/app/types/books";

const API_BASE = "https://us-central1-summaristt.cloudfunctions.net/getBooks";

export async function getBookById(id: string): Promise<Book | null> {
  const statuses = ["recommended", "finished", "selected", "suggested"];

  for (const status of statuses) {
    try {
      const res = await fetch(`${API_BASE}?status=${status}`, { cache: 'no-store' });
      if (!res.ok) continue;

      const books: Book[] = await res.json();
      const found = books.find((book) => book.id === id);
      if (found) return found;
    } catch (err) {
      console.error(`Failed to fetch ${status} books:`, err);
    }
  }

  return null;
}
