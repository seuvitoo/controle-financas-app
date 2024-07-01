import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Classificacao } from "./Classificacao";
import { Flow } from "./Flow";

@Entity()
export class Categoria extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column("decimal", { nullable: false })
  percentual: number;

  @ManyToOne(() => Classificacao, (classificacao) => classificacao.categorias)
  classificacao: Classificacao;

  @OneToMany(() => Flow, (flow) => flow.categoria)
  flows: Flow[];
}
