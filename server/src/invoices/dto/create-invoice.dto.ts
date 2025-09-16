import {
  IsBoolean,
  IsDate,
  IsInt,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateInvoiceDto {
  @IsString()
  vendorName: string;

  @IsInt()
  amount: number;

  @IsDate()
  dueDate: Date;

  @IsString()
  @Length(5, 100)
  description: string;

  @IsUUID()
  userId: string;

  @IsBoolean()
  paid: boolean;
}
