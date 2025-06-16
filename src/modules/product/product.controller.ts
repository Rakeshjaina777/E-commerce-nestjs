import {
    Controller, Post, Body, UseGuards, Get, Query, Param, Put, Delete, Req,
  } from '@nestjs/common';
  import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
  import { ProductService } from './product.service';
  import { CreateProductDto, UpdateProductDto, FilterProductDto } from './dto';
  import { Roles } from 'src/common/decorators/roles.decorator';
  import { AuthGuard } from 'src/common/guards/auth.guard';
  import { RolesGuard } from 'src/common/guards/roles.guard';
  
  @ApiTags('Products')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Controller('products')
  export class ProductController {
    constructor(private productService: ProductService) {}
  
    @Post()
    @Roles('SELLER', 'ADMIN')
    @ApiOperation({ summary: 'Create new product (Seller/Admin only)' })
    create(@Body() dto: CreateProductDto, @Req() req) {
      return this.productService.create(req.user.id, dto);
    }
  
    @Get()
    @ApiOperation({ summary: 'List products with optional filters' })
    findAll(@Query() filter: FilterProductDto) {
      return this.productService.findAll(filter);
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get single product by ID' })
    findOne(@Param('id') id: string) {
      return this.productService.findOne(id);
    }
  
    @Put(':id')
    @Roles('SELLER', 'ADMIN')
    @ApiOperation({ summary: 'Update product (Seller/Admin)' })
    update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
      return this.productService.update(id, dto);
    }
  
    @Delete(':id')
    @Roles('SELLER', 'ADMIN')
    @ApiOperation({ summary: 'Del
  