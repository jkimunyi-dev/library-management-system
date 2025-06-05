// src/books/interfaces/book.interface.ts
export interface Book {
  id: number;
  title: string;
  isbn: string;
  authorId: number;
  genre: string;
  publishedYear: number;
  publisher: string;
  totalCopies: number;
  availableCopies: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}