import { Controller, Get, HttpStatus, Redirect } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {

  @Get()
  @ApiExcludeEndpoint()
  @Redirect('/api', HttpStatus.FOUND)
  root(): void {
    return;
  }
}
