import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper functions
const randomName = (prefix: string) =>
  `${prefix} ${Math.floor(Math.random() * 1000)}`;

async function main() {
  const maxDepth = 2; // Define the maximum depth
  const rootMenusCount = 2; // Number of root menus
  const childMenusPerParent = 2; // Number of children per menu

  const rootMenus = [];

  // Create root menus
  for (let i = 0; i < rootMenusCount; i++) {
    const menu = await prisma.menu.create({
      data: {
        name: randomName('Root Menu'),
        depth: 0,
        parentId: null,
      },
    });
    rootMenus.push(menu);
  }

  // Recursive function to create child menus
  async function createChildren(parentId: string, currentDepth: number) {
    if (currentDepth >= maxDepth) return;

    for (let i = 0; i < childMenusPerParent; i++) {
      const childMenu = await prisma.menu.create({
        data: {
          name: randomName(`Menu Level ${currentDepth + 1}`),
          depth: currentDepth + 1,
          parentId,
        },
      });

      // Recursively create children for the current menu
      await createChildren(childMenu.id, currentDepth + 1);
    }
  }

  // Generate children for each root menu
  for (const rootMenu of rootMenus) {
    await createChildren(rootMenu.id, 0);
  }

  console.log('Randomized seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
