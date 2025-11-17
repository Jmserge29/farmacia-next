import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import connectDB from '@/src/lib/db';
import User from '@/src/models/User';
import { Logger } from '@/src/lib/logger';

const registerSchema = z.object({
  nombre: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  rol: z.enum(['admin', 'cliente']).optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Validación
    const validacion = registerSchema.safeParse(body);
    if (!validacion.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', detalles: validacion.error.issues },
        { status: 400 }
      );
    }

    const { nombre, email, password, rol } = validacion.data;

    await connectDB();

    // Verificar si existe
    const existente = await User.findOne({ email: email.toLowerCase() });
    if (existente) {
      await Logger.seguridad(
        'Intento de registro con email existente',
        { email, ip },
        ip,
        'warning'
      );
      return NextResponse.json(
        { error: 'El email ya está registrado' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crear usuario
    const usuario = new User({
      nombre,
      email: email.toLowerCase(),
      password: hashedPassword,
      rol: rol || 'cliente'
    });

    await usuario.save();

    // Log
    await Logger.auth(
      'Registro exitoso',
      email,
      { userId: usuario._id, rol: usuario.rol },
      ip,
      request.headers.get('user-agent') || undefined
    );

    return NextResponse.json(
      { 
        message: 'Usuario registrado exitosamente',
        user: {
          id: usuario._id,
          nombre: usuario.nombre,
          email: usuario.email,
          rol: usuario.rol
        }
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Error en registro:', error);
    await Logger.seguridad(
      'Error en registro',
      { error: error.message },
      undefined,
      'error'
    );
    return NextResponse.json(
      { error: 'Error en el servidor' },
      { status: 500 }
    );
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> e92e1b769dd6025695d105952d7b8ddb1f82d0b5
