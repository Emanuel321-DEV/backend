import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CompanyEntity } from './company/company.entity';
import { LocalEntity } from './local/local.entity';
import { ResponsibleEntity } from './responsible/responsible.entity';
import { TicketEntity } from './ticket/ticket.entity';
import { LocalModule } from './local/local.module';
import { ResponsibleModule } from './responsible/responsible.module';
import { TicketModule } from './ticket/ticket.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { UsersEntity } from './users/users.entity';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Permite o uso do process.env (P var de ambiente)
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION,
      url: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      entities: [
        CompanyEntity,
        LocalEntity,
        ResponsibleEntity,
        TicketEntity,
        UsersEntity,
      ],
      synchronize: true, // Nao utilizar em prod
    } as TypeOrmModuleOptions),
    UsersModule, //criado em aula
    CompanyModule,
    LocalModule,
    ResponsibleModule,
    TicketModule,
    AuthModule,
  ],
})
export class AppModule {}
