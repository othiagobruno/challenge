import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/module/user.module';
import { AuthModule } from './modules/auth/module/auth.module';
import { APP_GUARD } from '@nestjs/core';
import AuthJWTGuard from './modules/auth/strategy/jwt.guard';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthJWTGuard,
    },
  ],
})
export class AppModule {}
