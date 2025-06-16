import { Injectable, OnModuleInit } from '@nestjs/common';
import { connect, Channel } from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit {
  private channel: Channel;

  async onModuleInit() {
    const conn = await connect(process.env.RABBITMQ_URL);
    this.channel = await conn.createChannel();
    console.log('✅ RabbitMQ connected');
  }

  async sendToQueue(queue: string, data: any) {
    await this.channel.assertQueue(queue);
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
  }

  async consume(queue: string, callback: (msg: any) => void) {
    await this.channel.assertQueue(queue);
    this.channel.consume(queue, (msg) => {
      if (msg) {
        const data = JSON.parse(msg.content.toString());
        callback(data);
        this.channel.ack(msg);
      }
    });
  }
}
