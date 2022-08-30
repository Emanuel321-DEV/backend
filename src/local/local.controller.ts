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
import { CreateLocalDTO, UpdateLocalDTO } from './dto/local.dto';
import { LocalService } from './local.service';

@Controller('local')
@UseGuards(AuthGuard('jwt'))
export class LocalController {
  constructor(private readonly localService: LocalService) {}

  @Get()
  async listAll() {
    return this.localService.findAll();
  }

  @Get(':id')
  async showOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.localService.findOneOrFail(id);
  }

  @Post()
  async store(@Body() data: CreateLocalDTO) {
    return this.localService.store(data);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateLocalDTO,
  ) {
    return this.localService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.localService.destroy(id);
  }
}
