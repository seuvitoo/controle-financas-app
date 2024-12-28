import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import * as bcrypt from "bcryptjs";
import { Renda } from "./Renda";
import { Transacao } from "./Transacao";

@Entity()
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  data_criacao: Date;

  @OneToMany(() => Renda, (renda) => renda.usuario)
  rendas: Renda[];

  @OneToMany(() => Transacao, (transacao) => transacao.usuario)
  transacoes: Transacao[];

  @BeforeInsert()
  async hashSenha() {
    this.senha = await bcrypt.hash(this.senha, 10);
  }

  async compararSenha(senha: string) {
    return await bcrypt.compare(senha, this.senha);
  }
}