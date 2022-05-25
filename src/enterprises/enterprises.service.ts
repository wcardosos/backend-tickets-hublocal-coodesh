import { Injectable } from '@nestjs/common';
import { Enterprise } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';

@Injectable()
export class EnterprisesService {
  constructor(private prismaService: PrismaService) {}

  async create(enterpriseData: CreateEnterpriseDto): Promise<void> {
    const { name, cnpj, description, responsible, userId } = enterpriseData;

    await this.prismaService.enterprise.create({
      data: {
        name,
        cnpj,
        description,
        user: {
          connect: { id: userId },
        },
        responsibles: {
          create: {
            ...responsible,
            isMain: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<Enterprise[]> {
    return this.prismaService.enterprise.findMany();
  }

  async findById(id: string): Promise<Enterprise | null> {
    const enterprise = await this.prismaService.enterprise.findUnique({
      where: {
        id,
      },
      include: {
        locations: true,
        responsibles: true,
      },
    });

    if (!enterprise) {
      return null;
    }

    return enterprise;
  }

  async update(
    id: string,
    updateEnterpriseDto: UpdateEnterpriseDto,
  ): Promise<void> {
    const { name, cnpj, description } = updateEnterpriseDto;

    await this.prismaService.enterprise.update({
      where: {
        id,
      },
      data: {
        name,
        cnpj,
        description,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.enterprise.delete({
      where: {
        id,
      },
    });
  }
}
