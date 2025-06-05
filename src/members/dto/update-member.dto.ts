// src/members/dto/update-member.dto.ts
export class UpdateMemberDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  membershipType?: 'STANDARD' | 'PREMIUM' | 'STUDENT';
  isActive?: boolean;
}