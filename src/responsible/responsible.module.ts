import { Module } from '@nestjs/common';
import { ResponsibleService } from './responsible.service';
import { ResponsibleController } from './responsible.controller';
import { ResponsibleEntity } from './responsible.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ResponsibleEntity])],
  providers: [ResponsibleService],
  controllers: [ResponsibleController],
})
export class ResponsibleModule {}
