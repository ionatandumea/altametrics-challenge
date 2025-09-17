import { Controller, Get } from '@nestjs/common';
import { InvoicesService } from 'src/invoices/invoices.service';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  findAll() {
    return this.invoicesService.findAll();
  }
}
