import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS para permitir que el frontend hable con el backend
   app.enableCors({
     origin: 'https://rueda-fortuna-nest-js-next-kydqykwmy-santiagourdanetas-projects.vercel.app/', // ¡Permite que tu frontend hable con este backend!
     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Qué tipo de peticiones se permiten
     credentials: true, // Si usaras cookies o sesiones, esto sería importante
   });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
