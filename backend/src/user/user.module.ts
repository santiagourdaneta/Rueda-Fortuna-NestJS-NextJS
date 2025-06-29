import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Importa PrismaModule

@Module({
  imports: [PrismaModule], // Para que UserService pueda usar PrismaService
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // Exporta UserService si otros módulos lo van a usar
})
export class UserModule {}