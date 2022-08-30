import { CompanyEntity } from 'src/company/company.entity';
import { LocalEntity } from 'src/local/local.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'responsible' })
export class ResponsibleEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  nameResponsible: string;

  @Column()
  telephone: string;

  @Column({ name: 'address' })
  cepResponsible: string;

  @Column()
  numberHome: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @ManyToOne((type) => CompanyEntity, (responsible) => ResponsibleEntity)
  company?: CompanyEntity;

  @ManyToOne((type) => LocalEntity, (responsible) => ResponsibleEntity)
  local?: LocalEntity;
}
