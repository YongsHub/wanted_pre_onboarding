import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/entities/board.entity';
import { Company } from 'src/entities/company.entity';
import { User } from 'src/entities/user.entity';
import { JobAdvertisementController } from './job-advertisement.controller';
import { JobAdvertisementService } from './job-advertisement.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, Company, User]),
  ],
  exports: [TypeOrmModule],
  controllers: [JobAdvertisementController],
  providers: [JobAdvertisementService]
})
export class JobAdvertisementModule {}
