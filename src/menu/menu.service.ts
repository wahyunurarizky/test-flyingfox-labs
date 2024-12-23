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
    // Helper function to get the depth of a menu by parentId
    const getDepth = async (
      parentId: string | null,
      depth: number = 0,
    ): Promise<number> => {
      if (!parentId) return depth;
      const parentMenu = await this.prisma.menu.findUnique({
        where: { id: parentId },
      });
      if (!parentMenu) return depth;
      return getDepth(parentMenu.parentId, depth + 1);
    };

    // Calculate the depth for the new menu
    const depth = await getDepth(data.parentId);

    // Create the new menu with the calculated depth
    return this.prisma.menu.create({
      data: {
        ...data,
        depth,
      },
    });
  }

  async update(id: string, data: UpdateMenuDto) {
    return this.prisma.menu.update({
      where: { id },
      data,
    });
  }

  async findOne(id: string) {
    const menu = await this.prisma.menu.findUnique({ where: { id } });

    if (!menu) {
      return null;
    }

    // Fetch all menus to build the hierarchy
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

    // Attach children to the found menu
    return {
      ...menu,
      children: buildHierarchy(menu.id),
    };
  }

  async delete(id: string) {
    return this.prisma.menu.delete({ where: { id } });
  }
}
