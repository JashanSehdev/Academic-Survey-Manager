import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UserModule } from '../users/user.module.js';

@Module({
  imports: [UserModule], 
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
