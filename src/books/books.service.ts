// src/books/books.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './interfaces/book.interface';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  private books: Book[] = [
    {
      id: 1,
      title: 'Harry Potter and the Philosopher\'s Stone',
      isbn: '978-0747532699',
      authorId: 1,
      genre: 'Fantasy',
      publishedYear: 1997,
      publisher: 'Bloomsbury',
      totalCopies: 10,
      availableCopies: 8,
      description: 'The first book in the Harry Potter series.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      title: '1984',
      isbn: '978-0451524935',
      authorId: 2,
      genre: 'Dystopian Fiction',
      publishedYear: 1949,
      publisher: 'Secker & Warburg',
      totalCopies: 15,
      availableCopies: 12,
      description: 'A dystopian social science fiction novel.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      title: 'Murder on the Orient Express',
      isbn: '978-0062693662',
      authorId: 3,
      genre: 'Mystery',
      publishedYear: 1934,
      publisher: 'Collins Crime Club',
      totalCopies: 8,
      availableCopies: 6,
      description: 'A detective novel featuring Hercule Poirot.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      title: 'Animal Farm',
      isbn: '978-0451526342',
      authorId: 2,
      genre: 'Political Satire',
      publishedYear: 1945,
      publisher: 'Secker & Warburg',
      totalCopies: 12,
      availableCopies: 10,
      description: 'An allegorical novella about farm animals.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  private nextId = 5;

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