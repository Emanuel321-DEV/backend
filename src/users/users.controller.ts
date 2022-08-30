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
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
// @UseGuards(AuthGuard('jwt')) // Informa que todos os metodos abaixo sao protegidos - precisam de autenticacao -
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async listAll() {
    return await this.usersService.findAll();
  }

  @Post()
  async store(@Body() data: CreateUserDTO) {
    return await this.usersService.store(data);
  }

  @Get(':id') // PUUUIDPIPE = verifica se o id eh um uuid
  async showOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.findOneOrFail(id);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateUserDTO,
  ) {
    return await this.usersService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.destroy(id);
  }
}
