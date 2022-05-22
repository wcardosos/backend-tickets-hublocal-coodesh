import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';

@Injectable()
export class EnterprisesService {
  constructor(private prismaService: PrismaService) {}

  async create(createEnterpriseDto: CreateEnterpriseDto): Promise<void> {
    const { name, cnpj, description, responsible, userId } =
      createEnterpriseDto;

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

  findAll() {
    return `This action returns all enterprises`;
  }

  findById(id: string) {
    return `This action returns a #${id} enterprise`;
  }

  update(id: string, updateEnterpriseDto: UpdateEnterpriseDto) {
    return `This action updates a #${id} enterprise`;
  }

  delete(id: string) {
    return `This action removes a #${id} enterprise`;
  }
}
