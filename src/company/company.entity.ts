import { LocalEntity } from 'src/local/local.entity';
import { ResponsibleEntity } from 'src/responsible/responsible.entity';
import { UsersEntity } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'company' })
export class CompanyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cnpj: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @ManyToOne((type) => UsersEntity, (company) => CompanyEntity)
  user: UsersEntity;

  @OneToMany((type) => ResponsibleEntity, (company) => CompanyEntity)
  responsible: ResponsibleEntity[];

  @OneToMany((type) => LocalEntity, (company) => CompanyEntity)
  local: LocalEntity[];
}
