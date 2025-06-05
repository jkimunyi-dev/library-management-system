// src/books/dto/update-book.dto.ts
export class UpdateBookDto {
  title?: string;
  isbn?: string;
  authorId?: number;
  genre?: string;
  publishedYear?: number;
  publisher?: string;
  totalCopies?: number;
  availableCopies?: number;
  description?: string;
}