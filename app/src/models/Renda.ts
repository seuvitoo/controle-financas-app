import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { Usuario } from "./Usuario";

@Entity()
export class Renda extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.rendas)
  usuario: Usuario;

  @Column("decimal")
  valor: number;

  @Column("date")
  mes: Date;
}
