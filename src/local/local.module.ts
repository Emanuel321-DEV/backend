import { Module } from '@nestjs/common';
import { LocalService } from './local.service';
import { LocalController } from './local.controller';
import { LocalEntity } from './local.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([LocalEntity])],
  providers: [LocalService],
  controllers: [LocalController],
})
export class LocalModule {}
