import { Module } from '@nestjs/common';
import { InvoicesService } from 'src/invoices/invoices.service';
import { InvoicesController } from 'src/invoices/invoices.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule {}
