import { IsNotEmpty } from 'class-validator';
import { LocalEntity } from 'src/local/local.entity';

export class CreateTicketDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  created_by: string;

  @IsNotEmpty()
  received_by: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  dataLocal: LocalEntity;
}
export class UpdateTicketDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  created_by: string;

  @IsNotEmpty()
  received_by: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  dataLocal: LocalEntity;
}
