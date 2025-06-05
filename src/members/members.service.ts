// src/members/members.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Member } from './interfaces/member.interface';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MembersService {
  private members: Member[] = [];
  private nextId = 1;

  findAll(): Member[] {
    return this.members;
  }

  findOne(id: number): Member {
    const member = this.members.find(member => member.id === id);
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    return member;
  }

  findByEmail(email: string): Member | undefined {
    return this.members.find(member => member.email === email);
  }

  create(createMemberDto: CreateMemberDto): Member {
    const joinDate = new Date();
    const expiryDate = new Date();
    expiryDate.setFullYear(joinDate.getFullYear() + 1);

    const newMember: Member = {
      id: this.nextId++,
      ...createMemberDto,
      joinDate,
      expiryDate,
      isActive: true,
      borrowedBooks: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.members.push(newMember);
    return newMember;
  }

  update(id: number, updateMemberDto: UpdateMemberDto): Member {
    const memberIndex = this.members.findIndex(member => member.id === id);
    if (memberIndex === -1) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }

    const updatedMember: Member = {
      ...this.members[memberIndex],
      ...updateMemberDto,
      updatedAt: new Date(),
    };

    this.members[memberIndex] = updatedMember;
    return updatedMember;
  }

  remove(id: number): void {
    const memberIndex = this.members.findIndex(member => member.id === id);
    if (memberIndex === -1) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    this.members.splice(memberIndex, 1);
  }

  borrowBook(memberId: number, bookId: number): Member {
    const member = this.findOne(memberId);
    if (!member.isActive) {
      throw new NotFoundException(`Member with ID ${memberId} is not active`);
    }
    if (member.borrowedBooks.includes(bookId)) {
      throw new NotFoundException(`Member already has book with ID ${bookId}`);
    }
    member.borrowedBooks.push(bookId);
    member.updatedAt = new Date();
    return member;
  }

  returnBook(memberId: number, bookId: number): Member {
    const member = this.findOne(memberId);
    const bookIndex = member.borrowedBooks.indexOf(bookId);
    if (bookIndex === -1) {
      throw new NotFoundException(`Member does not have book with ID ${bookId}`);
    }
    member.borrowedBooks.splice(bookIndex, 1);
    member.updatedAt = new Date();
    return member;
  }

  renewMembership(id: number): Member {
    const member = this.findOne(id);
    const newExpiryDate = new Date();
    newExpiryDate.setFullYear(newExpiryDate.getFullYear() + 1);
    member.expiryDate = newExpiryDate;
    member.isActive = true;
    member.updatedAt = new Date();
    return member;
  }
}
