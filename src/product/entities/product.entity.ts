import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ nullable: true })
  imageUrl: string;

  // Each product belongs to one category.
  @ManyToOne(() => Category, (category) => category.products, { eager: true })
  category: Category;

  // Simulated owner ID field (in a real app this might be a relation to a User entity)
  @Column()
  ownerId: number;
}
