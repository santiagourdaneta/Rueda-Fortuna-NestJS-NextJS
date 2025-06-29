'use client'; // ¡Esta línea es ESENCIAL para la interactividad de React en Next.js!

// Importamos las herramientas de Material-UI para construir nuestra interfaz visual
import { Button, Typography, Box, Container } from '@mui/material';
// Importamos hooks de React: useRef para referenciar elementos, useState para manejar el estado
// y useEffect para ejecutar código al cargar o actualizar la página.
import { useRef, useState, useEffect, useCallback  } from 'react';
// Importamos GSAP, nuestra potente librería para animaciones fluidas
import { gsap } from 'gsap';
// Importamos Axios, el "cartero" que nos ayuda a enviar y recibir mensajes del backend
import axios from 'axios';

// --- ¡Añade esta interfaz! ---
interface SpinAttempt {
  id: string; // O number, si tu ID es un número en Prisma
  userId: string;
  prize: string;
  spinDate: string; // Viene como string, puedes convertirlo a Date si necesitas más manipulación
  isPaid: boolean;
}
// --- Fin de la interfaz ---

// La función principal de nuestra página, lo que el jugador verá en su navegador
export default function Home() {
  // `wheelRef` es una referencia a la caja que contiene los segmentos de la rueda,
  // permitiendo a GSAP manipularla directamente.
  const wheelRef = useRef(null);

  // `userId` almacenará el ID único del usuario, que obtenemos del backend.
  // `balance` almacenará el saldo simulado del usuario, también del backend.
  const [userId, setUserId] = useState(null);
  const [balance, setBalance] = useState(0);

  const [message, setMessage] = useState(''); // Estado para el mensaje dinámico
  const [isLoading, setIsLoading] = useState(false); // Estado para el indicador de carga

   // --- ¡Usa el tipo SpinAttempt[] para spinHistory! ---
  const [spinHistory, setSpinHistory] = useState<SpinAttempt[]>([]);
  // --- Fin del cambio ---
  // La URL base de nuestro backend (la "Caja Fuerte").
  const backendUrl = 'http://localhost:3000';

  // `prizes` define la información de cada segmento de la rueda:
  // Su nombre, color y el ángulo final en el círculo si lo dividimos en 4 segmentos de 90 grados.
  // El orden es importante para el cálculo del premio.
  const prizes = [
    { name: '🎉 100 SOLES 🎉', color: '#FFD700', endAngle: 90 },     // De 0 a 90 grados
    { name: '👎 PERDISTE 👎', color: '#808080', endAngle: 180 },    // De 90 a 180 grados
    { name: '💸 50 SOLES 💸', color: '#00BFFF', endAngle: 270 },    // De 180 a 270 grados
    { name: '🔄 OTRA VEZ 🔄', color: '#FF6347', endAngle: 360 }     // De 270 a 360 grados
  ];

 // Envuelve fetchSpinHistory en useCallback
  const fetchSpinHistory = useCallback(async (currentUserId: string) => {
      if (currentUserId) {
          try {
              const response = await axios.get(`${backendUrl}/user/${currentUserId}/spin-history`);
              setSpinHistory(response.data);
              console.log('Historial de giros cargado:', response.data);
          } catch (error) {
              console.error('Error al cargar historial de giros:', error);
          }
      }
  }, [backendUrl, setSpinHistory]); // Dependencias de fetchSpinHistory
     
  // `useEffect` se ejecuta una vez al cargar la página (debido al array vacío `[]`).
  // Su propósito es obtener el ID y balance del usuario de prueba desde el backend.
  useEffect(() => {
    const fetchUser = async () => {

      setIsLoading(true); // Activa el indicador de carga
      setMessage('Cargando datos del usuario...'); // Muestra mensaje de carga

      try {
        // Hacemos una petición GET al backend para obtener el usuario de prueba
        const response = await axios.get(`${backendUrl}/user/test-user`);
        // Actualizamos los estados con la información del usuario
        setUserId(response.data.userId);
        setBalance(response.data.balance);
        setMessage(`Bienvenido de nuevo, ${response.data.email}!`); // Mensaje de bienvenida
        // Llama a fetchSpinHistory aquí también para cargar el historial inicial
        fetchSpinHistory(response.data.userId);
        console.log('Usuario y balance cargados:', response.data);
      } catch (error) {
        // Manejo de errores si el backend no responde o hay un problema
        console.error('Error al cargar usuario de prueba:', error);
       // alert('Hubo un error al conectar con el servidor. Asegúrate de que el backend esté funcionando.');
      } finally {
      setIsLoading(false); // Desactiva el indicador de carga
    }
    };
    fetchUser(); // Llamamos a la función para cargar el usuario
  }, [backendUrl, fetchSpinHistory, setBalance, setMessage, setIsLoading, setUserId]); // Agrega fetchSpinHistory y otras dependencias aquí

     
 

  // La estructura visual de nuestra aplicación
  return (
    // La caja principal que ocupa toda la pantalla y centra el contenido.
    <Box
      sx={{
        minHeight: '100vh', // Altura mínima de la pantalla
        display: 'flex', // Habilita Flexbox para alinear elementos
        flexDirection: 'column', // Los elementos se apilan verticalmente
        alignItems: 'center', // Centra horizontalmente
        justifyContent: 'center', // Centra verticalmente
        bgcolor: '#e0f7fa', // Color de fondo azul claro
        p: 2, // Espaciado interno
        width: '100vw', // Ocupa todo el ancho de la ventana
      }}
    >
      {/* Contenedor principal que limita el ancho del contenido en pantallas grandes y centra los hijos */}
      <Container maxWidth="sm" sx={{
          textAlign: 'center', // Centra el texto
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Centra hijos como la rueda y botones
          justifyContent: 'center',
        }}>
        {/* Título del juego */}
        <Typography variant="h3" component="h1" gutterBottom>
          🎉 ¡GIRA Y GANA! 🎉
        </Typography>

        {/* Descripción */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          ¿Te atreves a probar tu suerte?
        </Typography>

        {/* Muestra el saldo simulado del usuario, actualizado desde el backend */}
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.dark' }}>
          Tu saldo simulado: S/. {balance.toFixed(2)}
        </Typography>

            {/* Mensaje dinámico e indicador de carga */}
        <Box sx={{ minHeight: '40px', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isLoading ? (
            <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              {message} <span role="img" aria-label="loading">⏳</span>
            </Typography>
          ) : (
            <Typography variant="body1" color="text.primary" sx={{ fontWeight: 'bold' }}>
              {message}
            </Typography>
          )}
        </Box>

        {/* La caja que representa la rueda de la fortuna en sí */}
        <Box
          sx={{
            width: { xs: 250, sm: 300, md: 400 }, // Tamaño responsivo de la rueda
            height: { xs: 250, sm: 300, md: 400 }, // Mismo que el ancho para hacerla circular
            borderRadius: '50%', // Define la forma circular
            bgcolor: 'warning.light', // Color de fondo de la rueda
            border: '5px solid', // Borde visible
            borderColor: 'warning.dark', // Color del borde
            position: 'relative', // Necesario para posicionar los segmentos y la flecha encima
            overflow: 'hidden', // Asegura que los segmentos no se salgan del círculo
            mb: 4, // Margen inferior
          }}
        >
          {/* Este es el contenedor que GSAP animará para hacer girar la rueda */}
          <Box
            ref={wheelRef} // Asignamos la referencia para GSAP
            sx={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              transform: 'rotate(0deg)', // Estado inicial de la rotación
              transformOrigin: 'center center', // Rota desde el centro
            }}
          >
            {/* --- SEGMENTO 1: Gana 100 Soles --- */}
            <Box
              sx={{
                position: 'absolute', top: '50%', left: '50%', width: '100%', height: '100%',
                transformOrigin: '0% 0%',
                clipPath: 'polygon(0% 0%, 50% 0%, 50% 50%, 0% 50%)', // Forma de triángulo/rebanada
                transform: 'rotate(0deg)', // Posición del primer segmento
                backgroundColor: prizes[0].color, // Color definido en la lista de premios
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {/* Contenedor para el texto del premio, con ajustes para centrarlo y orientarlo */}
              <Box
                sx={{
                  position: 'absolute',
                  transform: 'translate(-50%, -50%) rotate(45deg) translate(25%, 0%)',
                  width: '100%', height: '100%', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', textAlign: 'center', color: 'white',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                }}
              >
                <Typography variant="caption" sx={{ fontSize: { xs: '0.7rem', sm: '0.9rem', md: '1.1rem' }, fontWeight: 'bold' }}>
                  {prizes[0].name}
                </Typography>
              </Box>
            </Box>

            {/* --- SEGMENTO 2: Perdiste --- */}
            <Box
              sx={{
                position: 'absolute', top: '50%', left: '50%', width: '100%', height: '100%',
                transformOrigin: '0% 0%',
                clipPath: 'polygon(0% 0%, 50% 0%, 50% 50%, 0% 50%)',
                transform: 'rotate(90deg)', // Segmento rotado 90 grados
                backgroundColor: prizes[1].color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  transform: 'translate(-50%, -50%) rotate(45deg) translate(25%, 0%)',
                  width: '100%', height: '100%', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', textAlign: 'center', color: 'white',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                }}
              >
                <Typography variant="caption" sx={{ fontSize: { xs: '0.7rem', sm: '0.9rem', md: '1.1rem' }, fontWeight: 'bold' }}>
                  {prizes[1].name}
                </Typography>
              </Box>
            </Box>

            {/* --- SEGMENTO 3: Gana 50 Soles --- */}
            <Box
              sx={{
                position: 'absolute', top: '50%', left: '50%', width: '100%', height: '100%',
                transformOrigin: '0% 0%',
                clipPath: 'polygon(0% 0%, 50% 0%, 50% 50%, 0% 50%)',
                transform: 'rotate(180deg)', // Segmento rotado 180 grados
                backgroundColor: prizes[2].color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  transform: 'translate(-50%, -50%) rotate(45deg) translate(25%, 0%)',
                  width: '100%', height: '100%', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', textAlign: 'center', color: 'white',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                }}
              >
                <Typography variant="caption" sx={{ fontSize: { xs: '0.7rem', sm: '0.9rem', md: '1.1rem' }, fontWeight: 'bold' }}>
                  {prizes[2].name}
                </Typography>
              </Box>
            </Box>

            {/* --- SEGMENTO 4: Intenta de Nuevo --- */}
            <Box
              sx={{
                position: 'absolute', top: '50%', left: '50%', width: '100%', height: '100%',
                transformOrigin: '0% 0%',
                clipPath: 'polygon(0% 0%, 50% 0%, 50% 50%, 0% 50%)',
                transform: 'rotate(270deg)', // Segmento rotado 270 grados
                backgroundColor: prizes[3].color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  transform: 'translate(-50%, -50%) rotate(45deg) translate(25%, 0%)',
                  width: '100%', height: '100%', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', textAlign: 'center', color: 'white',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                }}
              >
                <Typography variant="caption" sx={{ fontSize: { xs: '0.7rem', sm: '0.9rem', md: '1.1rem' }, fontWeight: 'bold' }}>
                  {prizes[3].name}
                </Typography>
              </Box>
            </Box>

          </Box> {/* Fin del contenedor de los segmentos que gira */}
        </Box> {/* Fin de la caja principal de la RUEDA */}

        {/* La FLECHA INDICADORA que se mantiene fija mientras la rueda gira */}
        <Box
          sx={{
            position: 'absolute', // Posicionamiento absoluto sobre la rueda
            top: '50%', // Centrado verticalmente respecto a la rueda
            left: '50%', // Centrado horizontalmente respecto a la rueda
            transform: 'translate(-50%, -120%)', // Ajuste para moverla arriba y centrarla
            width: 0, height: 0, // Inicia con tamaño cero para formar el triángulo
            borderLeft: '20px solid transparent', // Lado izquierdo del triángulo
            borderRight: '20px solid transparent', // Lado derecho del triángulo
            borderBottom: '40px solid #FF0000', // Base del triángulo (flecha roja)
            zIndex: 10, // Asegura que esté por encima de la rueda
          }}
        />

        {/* Botón principal para iniciar el giro */}
        <Button
          variant="contained" // Botón con fondo de color
          color="primary" // Color primario de Material-UI
          size="large" // Tamaño grande
          sx={{ mb: 2 }} // Margen inferior
          onClick={async () => {
        if (!userId) {
            setMessage('Error: ID de usuario no disponible. Recarga la página.');
            return;
        }

        setIsLoading(true); // Activa el indicador de carga al iniciar el giro
        setMessage('Girando la rueda...'); // Mensaje de giro

        try {
            const spinResponse = await axios.post(`${backendUrl}/user/spin`, { userId });
            const { newBalance, message: backendMessage } = spinResponse.data; // Renombramos 'message' para evitar conflicto
            
            if (backendMessage.includes('Saldo insuficiente')) {
                setMessage(backendMessage); // Muestra el mensaje de saldo insuficiente del backend
                setBalance(newBalance);
                setIsLoading(false); // Desactiva la carga si no hay fondos
                return;
            }

            // Lógica de animación GSAP
            const baseRotations = Math.floor(Math.random() * 3) + 3;
            const randomExtraAngle = Math.random() * 360;
            const totalRotation = baseRotations * 360 + randomExtraAngle;

            gsap.to(wheelRef.current, {
                duration: 4,
                rotation: totalRotation,
                ease: "power3.out",
                onComplete: () => {
                    setMessage(backendMessage); // Muestra el mensaje del premio real del backend
                    setBalance(newBalance); // Actualiza el balance
                    setIsLoading(false); // Desactiva el indicador de carga cuando termina la animación
                    fetchSpinHistory(userId);
                }
            });

        } catch (error) {
            console.error('Error al girar la rueda:', error);
            setMessage('Error al procesar el giro. Intenta de nuevo.'); // Mensaje de error genérico
            setIsLoading(false); // Desactiva la carga en caso de error
        }
    }

  }

disabled={isLoading} // Deshabilita el botón mientras se carga o gira

        >
          Paga 20 soles y Gira
        </Button>

      
{/* Historial de Giros */}
    <Box sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper', p: 2, borderRadius: 2, boxShadow: 3, mb: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
        Historial de Giros (últimos 5)
      </Typography>
      {spinHistory.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          Aún no hay giros registrados. ¡Anímate a jugar!
        </Typography>
      ) : (
        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
          {spinHistory.map((attempt) => (
            <Typography key={attempt.id} component="li" variant="body2" sx={{ mb: 0.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{new Date(attempt.spinDate).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                <span style={{ fontWeight: 'bold' }}>{attempt.prize}</span>
              </Box>
            </Typography>
          ))}
        </Box>
      )}
    </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          🔥 No lo pienses más... ¡el siguiente ganador podrías ser tú!
        </Typography>
      </Container>
    </Box>
  );
}
