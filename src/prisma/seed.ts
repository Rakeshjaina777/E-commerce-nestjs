import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();
  await prisma.category.deleteMany();

  // Add Categories
  const electronics = await prisma.category.create({
    data: { name: 'Electronics' },
  });
  const fashion = await prisma.category.create({ data: { name: 'Fashion' } });

  // Create Seller
  const seller = await prisma.user.create({
    data: {
      email: 'seller@nestmart.com',
      password: 'hashedpassword',
      name: 'Seller One',
      role: 'SELLER',
    },
  });

  // Create Products
  await prisma.product.createMany({
    data: [
      {
        name: 'iPhone 15',
        description: 'Latest Apple iPhone',
        price: 999.99,
        stock: 25,
        sellerId: seller.id,
        categoryId: electronics.id,
      },
      {
        name: 'Nike Sneakers',
        description: 'Comfortable running shoes',
        price: 89.99,
        stock: 100,
        sellerId: seller.id,
        categoryId: fashion.id,
      },
    ],
  });

  // Create Customer with Cart
  const customer = await prisma.user.create({
    data: {
      email: 'customer@nestmart.com',
      password: 'securehashed',
      name: 'Customer One',
      role: 'CUSTOMER',
      cart: {
        create: {},
      },
    },
  });

  console.log('✅ Seed complete!');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
