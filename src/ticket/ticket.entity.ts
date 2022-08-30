import { LocalEntity } from 'src/local/local.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 } from 'uuid';

@Entity({ name: 'ticket' })
export class TicketEntity {
  @PrimaryColumn('uuid')
  id: string;

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }

  @Column()
  title: string;

  @Column()
  created_by: string;

  @Column()
  received_by: string;

  @Column()
  status: string;

  @ManyToOne((type) => LocalEntity, (ticket) => TicketEntity)
  dataLocal: LocalEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
