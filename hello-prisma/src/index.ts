import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a new user
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User',
      posts: {
        create: {
          title: 'Hello World',
          content: 'This is my first post!',
          published: true
        }
      }
    },
    include: {
      posts: true
    }
  });

  console.log('Created user with post:', user);

  // Get all users with their posts
  const users = await prisma.user.findMany({
    include: {
      posts: true
    }
  });

  console.log('All users with their posts:', users);
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
