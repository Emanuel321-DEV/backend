import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDTO } from './dtos/create-company.dto';
import { CompanyEntity } from './company.entity';
import { UpdateCompanyDTO } from './dtos/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>, // private readonly usersService: UsersService,
  ) {}

  async findAll() {
    return await this.companyRepository
      .createQueryBuilder()
      .select('company')
      .from(CompanyEntity, 'company')
      .groupBy('company.id')
      .getRawMany();
  }

  async findOneOrFail(id: string) {
    try {
      return await this.companyRepository
        .createQueryBuilder()
        .select('company')
        .from(CompanyEntity, 'company')
        .groupBy('company.id')
        .where('company.id = :id', { id: id })
        .getRawOne();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  async store(data: CreateCompanyDTO) {
    const company = this.companyRepository.create(data);
    const saveCompany = await this.companyRepository.save(company);

    return saveCompany;
  }
  async update(id: string, data: UpdateCompanyDTO) {
    const company = await this.companyRepository.findOneOrFail({
      where: {
        id,
      },
    });

    await this.companyRepository.merge(company, data);

    await this.companyRepository.save(company);
  }
  async destroy(id: string) {
    await this.companyRepository.findOneOrFail({
      where: {
        id,
      },
    });

    await this.companyRepository.softDelete({ id });
  }
}
