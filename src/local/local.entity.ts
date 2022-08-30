// import { Responsible } from 'src/responsible/responsible.entity';
// import { Ticket } from 'src/ticket/ticket.entity';
import { CompanyEntity } from 'src/company/company.entity';
import { ResponsibleEntity } from 'src/responsible/responsible.entity';
import { TicketEntity } from 'src/ticket/ticket.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'local' })
export class LocalEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column({ name: 'address' })
  cep: string;

  @Column()
  numberLocal: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @ManyToOne((type) => CompanyEntity, (local) => LocalEntity)
  company: CompanyEntity;

  @OneToMany((type) => ResponsibleEntity, (local) => LocalEntity)
  responsible: ResponsibleEntity[];

  @OneToMany((type) => TicketEntity, (local) => LocalEntity)
  ticket: TicketEntity[];

  //   @OneToMany((type) => Ticket, (local) => Local)
  //   ticket: Ticket[];
}
