import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Categoria } from "./Categoria";

@Entity()
export class Classificacao extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column("text", { nullable: true })
  descricao: string;

  @OneToMany(() => Categoria, (categoria) => categoria.classificacao)
  categorias: Categoria[];
}
