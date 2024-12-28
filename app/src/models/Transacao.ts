import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity
} from "typeorm";
import { Usuario } from "./Usuario";
import { Categoria } from "./Categoria";

@Entity()
export class Transacao extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.transacoes)
  usuario: Usuario;

  @ManyToOne(() => Categoria, (categoria) => categoria.transacoes)
  categoria: Categoria;

  @Column("decimal")
  valor: number;

  @Column()
  tipo: string;

  @Column({ nullable: true })
  descricao: string;

  @Column({ type: "date" })
  data: Date;
}