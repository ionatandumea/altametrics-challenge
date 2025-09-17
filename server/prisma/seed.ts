import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
  await prisma.invoice.deleteMany({});
  await prisma.user.deleteMany({});

  const admin = await prisma.user.create({
    data: {
      email: 'root@root.com',
      password: '$2b$10$jDcvBBWtPx2j0Ng9rsX6ZurSV9W7jUl3dTasTm93wEIYztUys.L82',
      name: 'John Doe',
    },
  });

  const vendors = [
    { name: 'Office Supplies Co', amount: 120.5 },
    { name: 'Internet Provider', amount: 75.0 },
    { name: 'Cleaning Service', amount: 200.0 },
    { name: 'Software Subscription', amount: 50.0 },
    { name: 'Coffee & Snacks', amount: 30.0 },
    { name: 'Printer Ink Depot', amount: 95.25 },
    { name: 'Electric Utility', amount: 310.0 },
    { name: 'Water Company', amount: 145.0 },
    { name: 'Office Furniture Mart', amount: 450.0 },
    { name: 'Courier Express', amount: 60.0 },
    { name: 'Stationery World', amount: 80.0 },
    { name: 'IT Support Services', amount: 275.0 },
    { name: 'Building Maintenance', amount: 500.0 },
    { name: 'Security Services', amount: 380.0 },
    { name: 'Cloud Hosting', amount: 220.0 },
    { name: 'Accounting Firm', amount: 600.0 },
    { name: 'Legal Counsel', amount: 750.0 },
    { name: 'Marketing Agency', amount: 450.0 },
    { name: 'Travel Agency', amount: 125.0 },
    { name: 'Event Catering', amount: 300.0 },
    { name: 'Janitorial Supplies', amount: 90.0 },
    { name: 'Team Lunches', amount: 180.0 },
    { name: 'Office Plants & Decor', amount: 70.0 },
    { name: 'Payroll Services', amount: 400.0 },
    { name: 'Employee Training', amount: 350.0 },
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
