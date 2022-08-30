import { IsNotEmpty } from 'class-validator';
import { CompanyEntity } from 'src/company/company.entity';
import { TicketEntity } from 'src/ticket/ticket.entity';

export class CreateLocalDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  cep: string;

  @IsNotEmpty()
  numberLocal: string;

  @IsNotEmpty()
  company: CompanyEntity;
}

export class UpdateLocalDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  cep: string;

  @IsNotEmpty()
  numberLocal: string;

  @IsNotEmpty()
  company: CompanyEntity;
}
