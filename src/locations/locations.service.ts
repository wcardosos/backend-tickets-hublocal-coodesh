import { Injectable } from '@nestjs/common';
import { Location } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationsService {
  constructor(private prismaService: PrismaService) {}

  async create(createLocationDto: CreateLocationDto): Promise<void> {
    const { name, zipcode, street, neighborhood, city, state, enterpriseId } =
      createLocationDto;

    await this.prismaService.location.create({
      data: {
        name,
        zipcode,
        street,
        neighborhood,
        city,
        state,
        enterprise: {
          connect: { id: enterpriseId },
        },
      },
    });
  }

  findAll() {
    return `This action returns all locations`;
  }

  async findById(id: string): Promise<Location | null> {
    const location = await this.prismaService.location.findUnique({
      where: {
        id,
      },
    });

    if (!location) {
      return null;
    }

    return location;
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return `This action updates a #${id} location`;
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.location.delete({
      where: {
        id,
      },
    });
  }
}
