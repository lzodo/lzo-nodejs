import { Controller, Get } from '@nestjs/common';
import { RangerService } from './ranger.service';

@Controller('ranger')
export class RangerController {
  constructor(private readonly rangerService: RangerService) {}

  @Get()
  getValue(): Array<number> {
    return this.rangerService.getValue();
  }
}
