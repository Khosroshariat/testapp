import InsideBookClient from "@/app/components/book-components/InsideBookClient";
import { getBookById } from "@/app/lib/getBookById";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params; // ✅ await the params
  const book = await getBookById(id);

  if (!book) {
    return {
      title: "Book Not Found | Summarist",
      description: "This book could not be found.",
    };
  }

  return {
    title: `${book.title} | Summarist`,
    description: book.subTitle || book.author || "Book summary and details.",
  };
}

export default async function InsideBook({ params }: { params: { id: string } }) {
  const { id } = await params; // ✅ await the params
  const book = await getBookById(id);

  if (!book) return <div>Book not found</div>;

  return <InsideBookClient bookId={id} />;
}
