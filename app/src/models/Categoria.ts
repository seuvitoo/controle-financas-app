import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity
} from "typeorm";
import { Transacao } from "./Transacao";

@Entity()
export class Categoria extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column("decimal")
  percentual: number;

  @OneToMany(() => Transacao, (transacao) => transacao.categoria)
  transacoes: Transacao[];
}