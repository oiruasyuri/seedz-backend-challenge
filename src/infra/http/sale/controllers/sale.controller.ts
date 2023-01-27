import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/app/auth/guards/jwt-auth.guard';
import { CreateSaleDTO } from 'src/app/sale/dtos/create-sale-dto';
import { CreateSale } from 'src/app/sale/use-cases/create-sale';
import { DeleteSale } from 'src/app/sale/use-cases/delete-sale';

@Controller('sales')
export class SaleController {
  constructor(
    private readonly createSale: CreateSale,
    private readonly deleteSale: DeleteSale,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Request() request, @Body() createSale: CreateSaleDTO) {
    const { id } = request.user;

    const sale = Object.assign(createSale, { user_id: id });

    await this.createSale.execute(sale);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.deleteSale.execute(id);
  }
}
