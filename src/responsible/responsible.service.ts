import { Injectable } from '@nestjs/common';
import { Responsible } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

export interface IResponsibleData {
  name: string;
  telephone: string;
  zipcode: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  isMain: boolean;
}

@Injectable()
export class ResponsibleService {
  constructor(private prismaService: PrismaService) {}

  async create(data: IResponsibleData): Promise<Responsible> {
    return this.prismaService.responsible.create({
      data,
    });
  }

  async findAll(): Promise<Responsible[]> {
    const responsibles = await this.prismaService.responsible.findMany();

    return responsibles;
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.responsible.delete({
      where: {
        id,
      },
    });
  }
}
