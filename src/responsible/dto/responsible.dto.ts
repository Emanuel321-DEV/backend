import { IsNotEmpty, IsOptional } from 'class-validator';
import { CompanyEntity } from 'src/company/company.entity';
import { LocalEntity } from 'src/local/local.entity';

export class CreateResponsibleDTO {
  @IsNotEmpty()
  nameResponsible: string;

  @IsNotEmpty()
  telephone: string;

  @IsNotEmpty()
  cepResponsible: string;

  @IsNotEmpty()
  numberHome: string;

  @IsOptional()
  company: CompanyEntity;

  @IsOptional()
  local: LocalEntity;
}

export class UpdateResponsibleDTO {
  @IsNotEmpty()
  nameResponsible: string;

  @IsNotEmpty()
  telephone: string;

  @IsNotEmpty()
  cepResponsible: string;

  @IsNotEmpty()
  numberHome: string;

  @IsOptional()
  company?: CompanyEntity;

  @IsOptional()
  local?: LocalEntity;
}
