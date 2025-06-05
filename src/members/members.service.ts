// src/members/members.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Member } from './interfaces/member.interface';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MembersService {
  private members: Member[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '+1234567890',
      address: '123 Main St, City, State 12345',
      membershipType: 'STANDARD',
      joinDate: new Date('2023-01-15'),
      expiryDate: new Date('2024-01-15'),
      isActive: true,
      borrowedBooks: [1, 3],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '+1234567891',
      address: '456 Oak Ave, City, State 12346',
      membershipType: 'PREMIUM',
      joinDate: new Date('2023-03-10'),
      expiryDate: new Date('2024-03-10'),
      isActive: true,
      borrowedBooks: [2],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob.johnson@university.edu',
      phoneNumber: '+1234567892',
      address: '789 College Rd, University Town, State 12347',
      membershipType: 'STUDENT',
      joinDate: new Date('2023-09-01'),
      expiryDate: new Date('2024-09-01'),
      isActive: true,
      borrowedBooks: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  private nextId = 4;

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