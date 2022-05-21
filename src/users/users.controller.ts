import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashManager } from '../lib/HashManager';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    const { name, username, password } = createUserDto;

    const hashedPassword = await HashManager.hash(password);

    const newUser = {
      name,
      username,
      password: hashedPassword,
    };

    await this.usersService.create(newUser);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Res() response: Response) {
    const user = await this.usersService.findById(id);
    if (user) {
      return response.json({ user });
    }

    return response
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'User not found' });
  }

  @Get('/username/:username')
  async findByUsername(
    @Param('username') username: string,
    @Res() response: Response,
  ) {
    const user = await this.usersService.findByUsername(username);
    if (user) {
      return response.json({ user });
    }

    return response
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'User not found' });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
