import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async findById(id: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
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
