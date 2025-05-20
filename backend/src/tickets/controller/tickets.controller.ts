import { Body, Controller, Get, Param, Patch, Post, UseGuards, Request } from '@nestjs/common';
import { TicketsService } from '../service/tickets.service';
import { UpdateTicketDto } from '../dto/update-ticket.dto';
import { AssignTicketDto } from '../dto/assign-ticket.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateTicketDto } from '../dto/create-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateTicketDto, @Request() req) {
    return this.ticketsService.create(dto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.ticketsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTicketDto) {
    return this.ticketsService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/assign')
  assign(@Param('id') id: string, @Body() dto: AssignTicketDto) {
    return this.ticketsService.assign(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/metrics/admin')
  getMetrics() {
    return this.ticketsService.getMetrics();
  }
}
