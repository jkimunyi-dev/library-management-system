// src/books/books.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './interfaces/book.interface';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(@Query('authorId') authorId?: string): Book[] {
    if (authorId) {
      return this.booksService.findByAuthor(parseInt(authorId));
    }
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Book {
    return this.booksService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createBookDto: CreateBookDto): Book {
    return this.booksService.create(createBookDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ): Book {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): void {
    return this.booksService.remove(id);
  }

  @Post(':id/borrow')
  borrowBook(@Param('id', ParseIntPipe) id: number): Book {
    return this.booksService.borrowBook(id);
  }

  @Post(':id/return')
  returnBook(@Param('id', ParseIntPipe) id: number): Book {
    return this.booksService.returnBook(id);
  }
}