// src/books/dto/create-book.dto.ts
export class CreateBookDto {
  title: string;
  isbn: string;
  authorId: number;
  genre: string;
  publishedYear: number;
  publisher: string;
  totalCopies: number;
  description?: string;
}