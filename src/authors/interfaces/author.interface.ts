// src/authors/interfaces/author.interface.ts
export interface Author {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  nationality: string;
  biography?: string;
  createdAt: Date;
  updatedAt: Date;
}