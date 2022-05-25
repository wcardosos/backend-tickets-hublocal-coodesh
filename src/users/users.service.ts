import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface IUserWithoutPassword {
  id: string;
  username: string;
  name: string;
}

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const { name, username, password } = createUserDto;

    await this.prismaService.user.create({
      data: {
        name,
        username,
        password,
      },
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  async findById(id: string): Promise<IUserWithoutPassword | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        name: true,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async delete(id: string): Promise<void | null> {
    const user = await this.findById(id);

    if (user) {
      await this.prismaService.user.delete({
        where: {
          id,
        },
      });
    }

    return null;
  }
}
