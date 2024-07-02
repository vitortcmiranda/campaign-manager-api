import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class Campaign {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @CreateDateColumn()
    dataCadastro: Date;

    @Column()
    dataInicio: Date;

    @Column()
    dataFim: Date;

    @Column()
    status: string;

    @Column()
    categoria: string;

    @DeleteDateColumn()
    deletedAt?: Date;
}