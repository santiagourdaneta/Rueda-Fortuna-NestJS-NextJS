import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, SpinAttempt } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Esto es solo un placeholder para un usuario, ¡no es una autenticación real!
  // En un juego real, aquí habría un sistema de login y registro.
  // Por ahora, crearemos o encontraremos un usuario fijo para todas las pruebas.
  async getOrCreateTestUser(): Promise<User> {
    let user = await this.prisma.user.findUnique({
      where: { email: 'test@example.com' },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: 'test@example.com',
          password: 'hashedpassword_for_test', // En un caso real, esto sería un hash
          balance: 1000.00, // Le damos 1000 soles simulados al inicio
        },
      });
      console.log('Usuario de prueba creado:', user.email, 'Balance:', user.balance);
    } else {
      console.log('Usando usuario de prueba existente:', user.email, 'Balance:', user.balance);
    }
    return user;
  }

  // Función para simular el giro de la rueda
  async spinWheel(userId: string): Promise<{ prize: string; newBalance: number; message: string }> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return { prize: 'Error', newBalance: 0, message: 'Usuario no encontrado.' };
    }

    const spinCost = 20.00; // Costo simulado de un giro

    if (user.balance < spinCost) {
      return { prize: 'Sin Fondos', newBalance: user.balance, message: 'Saldo insuficiente. Recarga tu balance simulado.' };
    }

   
 // Simular el pago
    let currentBalance = user.balance - spinCost;

     // Lógica de ponderación de premios
    // Definimos los premios con sus "pesos" (cuanto mayor el peso, mayor la probabilidad)
    const weightedPrizes = [
      { name: '🎉 100 SOLES 🎉', weight: 10 }, // 10% de probabilidad
      { name: '👎 PERDISTE 👎', weight: 40 },  // 40% de probabilidad
      { name: '💸 50 SOLES 💸', weight: 30 },   // 30% de probabilidad
      { name: '🔄 OTRA VEZ 🔄', weight: 20 },  // 20% de probabilidad
    ];

    // Calcular el total de los pesos
    const totalWeight = weightedPrizes.reduce((sum, p) => sum + p.weight, 0);

    // Generar un número aleatorio entre 0 y el total de pesos
    let randomNum = Math.random() * totalWeight;

    // Seleccionar el premio basado en el número aleatorio y los pesos
    let selectedPrize = '';
    for (const prize of weightedPrizes) {
      if (randomNum < prize.weight) {
        selectedPrize = prize.name;
        break;
      }
      randomNum -= prize.weight;
    }

    // Simular ganancia según el premio seleccionado
    let prizeValue = 0;
    if (selectedPrize === '🎉 100 SOLES 🎉') {
      prizeValue = 100;
    } else if (selectedPrize === '💸 50 SOLES 💸') {
      prizeValue = 50;
    }
    const finalBalance = currentBalance + prizeValue;

  // Actualizar el balance del usuario en la base de datos
     await this.prisma.user.update({
         where: { id: userId },
         data: { balance: finalBalance },
     });

     // Guardar el intento de giro
     await this.prisma.spinAttempt.create({
       data: {
         userId: user.id,
         prize: selectedPrize,
         isPaid: true,
       },
     });

     let message = `¡Giraste la rueda y ganaste: ${selectedPrize}! Tu nuevo balance es: ${finalBalance.toFixed(2)} soles simulados.`;
         if (selectedPrize === '👎 PERDISTE 👎') {
             message = `Giraste la rueda y... ¡${selectedPrize}! Tu nuevo balance es: ${finalBalance.toFixed(2)} soles simulados.`;
         } else if (selectedPrize === '🔄 OTRA VEZ 🔄') {
              message = `Giraste la rueda y... ¡${selectedPrize}! Tu nuevo balance es: ${finalBalance.toFixed(2)} soles simulados.`;
         }

         return { prize: selectedPrize, newBalance: finalBalance, message: message };
       }


  // Obtener el balance del usuario
  async getUserBalance(userId: string): Promise<number> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { balance: true }
    });
    return user ? user.balance : 0;
  }

   // Nueva función para obtener el historial de giros de un usuario
  async getSpinHistory(userId: string): Promise<SpinAttempt[]> {
    return this.prisma.spinAttempt.findMany({
      where: { userId },
      orderBy: { spinDate: 'desc' }, // Ordenar por fecha, los más recientes primero
      take: 5, // Limitar a los últimos 5 giros
    });
  }

}