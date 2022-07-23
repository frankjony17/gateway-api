import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller()
export class AppController {
  @Get('healthcheck')
  healthCheck() {
    return 'Healthy';
  }
}
