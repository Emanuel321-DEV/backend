import { IsNotEmpty } from 'class-validator';
import { UsersEntity } from 'src/users/users.entity';

export class CreateCompanyDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  cnpj: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  user: UsersEntity;
}
