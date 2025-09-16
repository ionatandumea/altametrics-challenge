import { Controller, Get, Param } from '@nestjs/common';
import { InvoicesService } from 'src/invoices/invoices.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Public()
  @Get()
  findAll() {
    return this.invoicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(+id);
  }
}
