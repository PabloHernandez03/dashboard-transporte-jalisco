import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('etup')
@Index(['anio', 'mes'])
export class Etup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'source_id', unique: true })
    source_id: string;

    @Column({ name: 'anio', type: 'int' })
    anio: number;

    @Column({ name: 'mes', type: 'int' })
    @Index()
    mes: number;

    @Column({ name: 'transporte', type: 'text' })
    @Index()
    transporte: string;

    @Column({ name: 'variable', type: 'text' })
    @Index()
    variable: string;

    @Column({ name: 'municipio', type: 'text' })
    municipio: string;

    @Column({ name: 'valor', type: 'int', nullable: true })
    valor: number | null;

    @Column({ name: 'estatus', type: 'text' })
    estatus: string;

}