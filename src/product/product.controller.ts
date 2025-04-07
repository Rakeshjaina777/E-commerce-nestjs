import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UserEntity } from '../users/entities/user.entity';
import { UpdateProductDto } from './dto/update-product.dto';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    // Assign current user as owner
    return this.productsService.create({
      ...createProductDto,
      // ownerId: user.id,
    });
  }

  @Patch(':id')
  // @UseGuards(OwnershipGuard)
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(+id, updateProductDto);
  }
}
