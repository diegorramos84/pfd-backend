import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateAccountDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  accountName: string;

  @IsString()
  @IsNotEmpty()
  accountType: string;

  @IsNumber()
  balance: number;
}
