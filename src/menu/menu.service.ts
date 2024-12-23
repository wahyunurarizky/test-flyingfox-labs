import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuDto } from './create-menu.dto';
import { UpdateMenuDto } from './update-menu.dto';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    // Fetch all menus
    const menus = await this.prisma.menu.findMany();

    // Helper function to build the hierarchy
    const buildHierarchy = (parentId: string | null): any[] => {
      return menus
        .filter((menu) => menu.parentId === parentId)
        .map((menu) => ({
          ...menu,
          children: buildHierarchy(menu.id), // Recursively build children
        }));
    };

    // Build the hierarchy starting from the root (where parentId is null)
    return buildHierarchy(null);
  }

  async create(data: CreateMenuDto) {
    return this.prisma.menu.create({ data });
  }

  async update(id: string, data: UpdateMenuDto) {
    return this.prisma.menu.update({
      where: { id },
      data,
    });
  }

  async findOne(id: string) {
    return this.prisma.menu.findUnique({ where: { id } });
  }

  async delete(id: string) {
    return this.prisma.menu.delete({ where: { id } });
  }
}
