import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Flow } from "./Flow";
import { User } from "./User";

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("date")
  data: Date;

  @Column("decimal")
  valor: number;

  @ManyToOne(() => Flow, (fluxo) => fluxo.transactions)
  fluxo: Flow;

  @Column()
  classificacao: string;

  @Column("text", { nullable: true })
  observacao: string;

  @ManyToOne(() => User, (usuario) => usuario.transactions)
  usuario: User;
}
