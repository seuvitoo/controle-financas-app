import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Categoria } from "./Categoria";
import { Transaction } from "./Transaction";

@Entity()
export class Flow extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @ManyToOne(() => Categoria, (categoria) => categoria.flows)
  categoria: Categoria;

  @OneToMany(() => Transaction, (transaction) => transaction.fluxo)
  transactions: Transaction[];
}
