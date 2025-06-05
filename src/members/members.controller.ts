// src/members/members.controller.ts
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
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './interfaces/member.interface';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  findAll(@Query('email') email?: string): Member[] | Member {
    if (email) {
      const member = this.membersService.findByEmail(email);
      return member ? [member] : [];
    }
    return this.membersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Member {
    return this.membersService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createMemberDto: CreateMemberDto): Member {
    return this.membersService.create(createMemberDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMemberDto: UpdateMemberDto,
  ): Member {
    return this.membersService.update(id, updateMemberDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): void {
    return this.membersService.remove(id);
  }

  @Post(':id/borrow/:bookId')
  borrowBook(
    @Param('id', ParseIntPipe) id: number,
    @Param('bookId', ParseIntPipe) bookId: number,
  ): Member {
    return this.membersService.borrowBook(id, bookId);
  }

  @Post(':id/return/:bookId')
  returnBook(
    @Param('id', ParseIntPipe) id: number,
    @Param('bookId', ParseIntPipe) bookId: number,
  ): Member {
    return this.membersService.returnBook(id, bookId);
  }

  @Post(':id/renew')
  renewMembership(@Param('id', ParseIntPipe) id: number): Member {
    return this.membersService.renewMembership(id);
  }
}