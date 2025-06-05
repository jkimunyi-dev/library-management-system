// src/authors/authors.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Author } from './interfaces/author.interface';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  private authors: Author[] = [
    {
      id: 1,
      firstName: 'J.K.',
      lastName: 'Rowling',
      email: 'jk.rowling@example.com',
      birthDate: new Date('1965-07-31'),
      nationality: 'British',
      biography: 'British author, best known for the Harry Potter series.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      firstName: 'George',
      lastName: 'Orwell',
      email: 'george.orwell@example.com',
      birthDate: new Date('1903-06-25'),
      nationality: 'British',
      biography: 'English novelist and essayist, known for 1984 and Animal Farm.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      firstName: 'Agatha',
      lastName: 'Christie',
      email: 'agatha.christie@example.com',
      birthDate: new Date('1890-09-15'),
      nationality: 'British',
      biography: 'English writer known for detective novels featuring Hercule Poirot.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  private nextId = 4;

  findAll(): Author[] {
    return this.authors;
  }

  findOne(id: number): Author {
    const author = this.authors.find(author => author.id === id);
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  create(createAuthorDto: CreateAuthorDto): Author {
    const newAuthor: Author = {
      id: this.nextId++,
      ...createAuthorDto,
      birthDate: new Date(createAuthorDto.birthDate),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.authors.push(newAuthor);
    return newAuthor;
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto): Author {
    const authorIndex = this.authors.findIndex(author => author.id === id);
    if (authorIndex === -1) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }

    const updatedAuthor: Author = {
      ...this.authors[authorIndex],
      ...updateAuthorDto,
      birthDate: updateAuthorDto.birthDate ? new Date(updateAuthorDto.birthDate) : this.authors[authorIndex].birthDate,
      updatedAt: new Date(),
    };

    this.authors[authorIndex] = updatedAuthor;
    return updatedAuthor;
  }

  remove(id: number): void {
    const authorIndex = this.authors.findIndex(author => author.id === id);
    if (authorIndex === -1) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    this.authors.splice(authorIndex, 1);
  }
}