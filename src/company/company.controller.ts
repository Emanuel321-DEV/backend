import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateCompanyDTO } from './dtos/create-company.dto';
import { CompanyService } from './company.service';
import { UpdateCompanyDTO } from './dtos/update-company.dto';

@Controller('company')
@UseGuards(AuthGuard('jwt'))
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async listAll() {
    return await this.companyService.findAll();
  }

  @Get(':id')
  async showOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.companyService.findOneOrFail(id);
  }

  @Post()
  async store(@Body() data: CreateCompanyDTO) {
    return await this.companyService.store(data);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateCompanyDTO,
  ) {
    return await this.companyService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.companyService.destroy(id);
  }
}
