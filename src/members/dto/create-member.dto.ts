// src/members/dto/create-member.dto.ts
export class CreateMemberDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  membershipType: 'STANDARD' | 'PREMIUM' | 'STUDENT';
}