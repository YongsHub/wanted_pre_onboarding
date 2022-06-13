import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeORMConfig } from './configs/typeorm.config';
import { JobAdvertisementModule } from './job-advertisement/job-advertisement.module';
import { JobAdvertisementService } from './job-advertisement/job-advertisement.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JobAdvertisementModule,
    TypeOrmModule.forRoot(typeORMConfig),
  ],
  controllers: [AppController],
  providers: [AppService, JobAdvertisementService],
})
export class AppModule {}
