import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/app/auth/guards/jwt-auth.guard';
import { CreateProductDTO } from 'src/app/product/dtos/create-product-dto';
import { UpdateProductDTO } from 'src/app/product/dtos/update-product-dto';
import { CreateProduct } from 'src/app/product/use-cases/create-product';
import { DeleteProduct } from 'src/app/product/use-cases/delete-product';
import { ReadProduct } from 'src/app/product/use-cases/read-product';
import { UpdateProduct } from 'src/app/product/use-cases/update-product';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProduct: CreateProduct,
    private readonly readProduct: ReadProduct,
    private readonly updateProduct: UpdateProduct,
    private readonly deleteProduct: DeleteProduct,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProduct: CreateProductDTO) {
    await this.createProduct.execute(createProduct);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async read(@Param('id') id: string) {
    return await this.readProduct.execute(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') id: string,
    @Body() updateProduct: UpdateProductDTO,
  ) {
    await this.updateProduct.execute(id, updateProduct);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.deleteProduct.execute(id);
  }
}
