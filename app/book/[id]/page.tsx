import InsideBookClient from "@/app/components/book-components/InsideBookClient";
import { getBookById } from "@/app/lib/getBookById";
import type { Metadata } from "next";

// Type for your page component
interface PageProps {
  params: { id: string };
}

// ✅ Correct: generateMetadata argument type
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const book = await getBookById(params.id);

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

// ✅ Page component
export default async function InsideBook({ params }: PageProps) {
  const book = await getBookById(params.id);

  if (!book) return <div>Book not found</div>;

  return <InsideBookClient bookId={params.id} />;
}
