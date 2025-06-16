import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Req,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Roles('CUSTOMER')
  @ApiOperation({ summary: 'Place a new order (Customer only)' })
  create(@Req() req, @Body() dto: CreateOrderDto) {
    return this.orderService.create(req.user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders for current user' })
  findAll(@Req() req) {
    return this.orderService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single order with items' })
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Put(':id/status')
  @Roles('ADMIN', 'SELLER')
  @ApiOperation({ summary: 'Update order status (Admin/Seller only)' })
  update(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return this.orderService.updateStatus(id, dto);
  }
}
