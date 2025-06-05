// src/authors/dto/create-author.dto.ts
export class CreateAuthorDto {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  nationality: string;
  biography?: string;
}