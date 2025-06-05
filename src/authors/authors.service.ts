// src/authors/authors.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Author } from './interfaces/author.interface';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  private authors: Author[] = [];
  private nextId = 1;

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
