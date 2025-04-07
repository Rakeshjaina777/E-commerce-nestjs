import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsController } from './product.controller';
import { ProductService } from './product.service';
import { Category } from '../category/entities/category.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  controllers: [ProductsController],
  providers: [ProductService,],
  exports: [ProductService],
})
export class ProductsModule {}
