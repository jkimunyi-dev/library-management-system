// src/books/books.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './interfaces/book.interface';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  private books: Book[] = [];
  private nextId = 1;

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: number): Book {
    const book = this.books.find(book => book.id === id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  findByAuthor(authorId: number): Book[] {
    return this.books.filter(book => book.authorId === authorId);
  }

  create(createBookDto: CreateBookDto): Book {
    const newBook: Book = {
      id: this.nextId++,
      ...createBookDto,
      availableCopies: createBookDto.totalCopies,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.books.push(newBook);
    return newBook;
  }

  update(id: number, updateBookDto: UpdateBookDto): Book {
    const bookIndex = this.books.findIndex(book => book.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    const updatedBook: Book = {
      ...this.books[bookIndex],
      ...updateBookDto,
      updatedAt: new Date(),
    };

    this.books[bookIndex] = updatedBook;
    return updatedBook;
  }

  remove(id: number): void {
    const bookIndex = this.books.findIndex(book => book.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    this.books.splice(bookIndex, 1);
  }

  borrowBook(bookId: number): Book {
    const book = this.findOne(bookId);
    if (book.availableCopies <= 0) {
      throw new NotFoundException(`No available copies of book with ID ${bookId}`);
    }
    book.availableCopies--;
    book.updatedAt = new Date();
    return book;
  }

  returnBook(bookId: number): Book {
    const book = this.findOne(bookId);
    if (book.availableCopies >= book.totalCopies) {
      throw new NotFoundException(`All copies of book with ID ${bookId} are already returned`);
    }
    book.availableCopies++;
    book.updatedAt = new Date();
    return book;
  }
}
