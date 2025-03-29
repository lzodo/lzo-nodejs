import { Module } from '@nestjs/common';
import { MockController } from './mock.controller';
import { MockService } from './mock.service';
import { User } from '@/user/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '@/user/entity/profile.entity';
import { Logs } from '@/logs/entity/logs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Logs])],
  controllers: [MockController],
  providers: [MockService],
})
export class MockModule {}
