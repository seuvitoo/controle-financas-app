import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import * as bcrypt from "bcryptjs";
import { Transaction } from "./Transaction";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column()
  data_criacao: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.usuario)
  transactions: Transaction[];

  @BeforeInsert()
  async hashPassword() {
    this.senha = await bcrypt.hash(this.senha, 10);
  }

  async comparePassword(senha: string) {
    return await bcrypt.compare(senha, this.senha);
  }
}
