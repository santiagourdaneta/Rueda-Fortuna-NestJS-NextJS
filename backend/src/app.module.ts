import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module'; // Importa el módulo de usuario
import { PrismaModule } from './prisma/prisma.module'; // Importa el módulo de Prisma


@Module({
  imports: [UserModule, PrismaModule], // Asegúrate de importar UserModule y PrismaModule
  controllers: [AppController],
  providers: [AppService, PrismaService], // PrismaService debe estar en los providers para que NestJS lo reconozca
})
export class AppModule {}