import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
  await prisma.invoice.deleteMany({});
  await prisma.user.deleteMany({});

  const admin = await prisma.user.create({
    data: {
      email: 'root@root.com',
      password: 'root123', // TODO: add the hash of the admin123
      name: 'John Doe',
    },
  });

  const vendors = [
    { name: 'Office Supplies Co', amount: 120.5 },
    { name: 'Internet Provider', amount: 75.0 },
    { name: 'Cleaning Service', amount: 200.0 },
    { name: 'Software Subscription', amount: 50.0 },
    { name: 'Coffee & Snacks', amount: 30.0 },
  ];

  for (let i = 0; i < vendors.length; i++) {
    await prisma.invoice.create({
      data: {
        vendorName: vendors[i].name,
        amount: vendors[i].amount,
        dueDate: new Date(Date.now() + (i + 1) * 7 * 24 * 60 * 60 * 1000),
        description: `Invoice for ${vendors[i].name}`,
        paid: i % 2 === 0,
        userId: admin.id,
      },
    });
  }

  console.log('Admin user and invoices created successfully!');
}

seed();
