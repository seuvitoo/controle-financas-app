import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Lancamentos extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("decimal")
  valor: number;

  @Column("date")
  dataRealizada: Date;

  @Column()
  fluxo: string;

  @Column()
  tipoFluxo: string;

  @Column()
  classificacao: string;

  @Column("text", { nullable: true })
  observacao: string;
}
