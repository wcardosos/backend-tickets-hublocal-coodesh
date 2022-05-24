import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} location`;
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return `This action updates a #${id} location`;
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
