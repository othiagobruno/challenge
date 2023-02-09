import { Module } from '@nestjs/common';
import { UserController } from '../infra/http/controllers/user.controller';
import { UserService } from '../services/user.service';
import { PrismaModule } from 'src/prisma/module/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
