import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto, UpdateOrderDto } from './dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateOrderDto) {
    const total = await this.calculateTotal(dto.items);

    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId,
          total,
          items: {
            create: dto.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: 0, // to be updated below
            })),
          },
        },
        include: {
          items: true,
        },
      });

      // update item prices
      for (const item of dto.items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });
        if (!product)
          throw new NotFoundException(`Product ${item.productId} not found`);

        await tx.orderItem.updateMany({
          where: { orderId: order.id, productId: item.productId },
          data: { price: product.price },
        });
      }

      return tx.order.findUnique({
        where: { id: order.id },
        include: { items: { include: { product: true } } },
      });
    });
  }

  async findAll(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: { product: true },
        },
      },
    });
  }

  async updateStatus(id: string, dto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id },
      data: { status: dto.status },
    });
  }

  private async calculateTotal(
    items: { productId: string; quantity: number }[],
  ) {
    let total = 0;
    for (const item of items) {
      const product = await this.prisma.product.findUnique({
        where: { id: item.productId },
      });
      if (!product)
        throw new NotFoundException(`Product ${item.productId} not found`);
      total += product.price * item.quantity;
    }
    return total;
  }
}
