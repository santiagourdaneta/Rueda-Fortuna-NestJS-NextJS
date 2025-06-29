import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user') // Esto significa que todas las rutas aquí comenzarán con /user
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Ruta para obtener el balance de un usuario (GET /user/:userId/balance)
  @Get(':userId/balance')
  async getUserBalance(@Param('userId') userId: string) {
    const balance = await this.userService.getUserBalance(userId);
    return { balance };
  }

  // Ruta para simular el giro de la rueda (POST /user/spin)
  @Post('spin')
  async spin(@Body('userId') userId: string) {
    const result = await this.userService.spinWheel(userId);
    return result;
  }

  // Ruta para obtener o crear el usuario de prueba (GET /user/test-user)
  @Get('test-user')
  async getTestUser() {
    const user = await this.userService.getOrCreateTestUser();
    return { userId: user.id, email: user.email, balance: user.balance };
  }

   // Nueva ruta para obtener los intentos de giro de un usuario
  @Get(':userId/spin-history')
  async getSpinHistory(@Param('userId') userId: string) {
    const history = await this.userService.getSpinHistory(userId);
    return history;
  }
  
}