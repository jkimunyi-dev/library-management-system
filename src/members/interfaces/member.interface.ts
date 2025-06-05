// src/members/interfaces/member.interface.ts
export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  membershipType: 'STANDARD' | 'PREMIUM' | 'STUDENT';
  joinDate: Date;
  expiryDate: Date;
  isActive: boolean;
  borrowedBooks: number[];
  createdAt: Date;
  updatedAt: Date;
}