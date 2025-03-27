import { Module } from '@nestjs/common';
import { RangerController } from './ranger.controller';
import { RangerService } from './ranger.service';

@Module({
  controllers: [RangerController],
  providers: [RangerService]
})
export class RangerModule {}
