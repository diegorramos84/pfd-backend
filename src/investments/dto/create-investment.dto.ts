import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateInvestmentDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  investmentName: string;

  @IsString()
  @IsNotEmpty()
  investmentType: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  currentValue: number;
}
