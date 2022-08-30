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
import {
  CreateResponsibleDTO,
  UpdateResponsibleDTO,
} from './dto/responsible.dto';
import { ResponsibleService } from './responsible.service';

@Controller('responsible')
@UseGuards(AuthGuard('jwt'))
export class ResponsibleController {
  constructor(private readonly responsibleService: ResponsibleService) {}

  @Get()
  async listAll() {
    return this.responsibleService.findAll();
  }

  @Get(':id')
  async showOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.responsibleService.findOneOrFail(id);
  }

  @Post()
  async store(@Body() data: CreateResponsibleDTO) {
    return await this.responsibleService.store(data);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateResponsibleDTO,
  ) {
    return this.responsibleService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.responsibleService.destroy(id);
  }
}
