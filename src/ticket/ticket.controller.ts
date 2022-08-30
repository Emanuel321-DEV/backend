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

import { CreateTicketDTO, UpdateTicketDTO } from './dto/ticket.dto';
import { TicketService } from './ticket.service';

@Controller('ticket')
@UseGuards(AuthGuard('jwt'))
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  async listAll() {
    return this.ticketService.findAll();
  }

  @Get(':id')
  async showOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.ticketService.findOneOrFail(id);
  }

  @Post()
  async store(@Body() data: CreateTicketDTO) {
    return this.ticketService.store(data);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateTicketDTO,
  ) {
    return this.ticketService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.ticketService.destroy(id);
  }
}
