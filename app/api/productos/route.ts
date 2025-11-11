import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import connectDB from '@/src/lib/db';
import Product from '@/src/models/Product';
import { Logger } from '@/src/lib/logger';
import { authOptions } from '@/src/lib/auth';
import { getServerSession } from 'next-auth';

const productoSchema = z.object({
  nombre: z.string().min(1).max(200),
  descripcion: z.string().min(1).max(1000),
  precio: z.number().positive(),
  stock: z.number().int().min(0),
  categoria: z.enum(['medicamentos', 'cuidado-personal', 'vitaminas', 'primeros-auxilios', 'otros']),
  requiereReceta: z.boolean().optional(),
  imagen: z.string().url().optional()
});

// GET - Listar productos
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const categoria = searchParams.get('categoria');
    const busqueda = searchParams.get('q');
    
    const query: any = { activo: true };
    
    if (categoria) {
      query.categoria = categoria;
    }
    
    if (busqueda) {
      query.$text = { $search: busqueda };
    }

    const productos = await Product.find(query)
      .select('-creadoPor')
      .sort({ fechaCreacion: -1 })
      .limit(100);

    return NextResponse.json({ productos });

  } catch (error) {
    console.error('Error obteniendo productos:', error);
    return NextResponse.json(
      { error: 'Error obteniendo productos' },
      { status: 500 }
    );
  }
}

// POST - Crear producto (solo admin)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validacion = productoSchema.safeParse(body);
    
    if (!validacion.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', detalles: validacion.error.issues },
        { status: 400 }
      );
    }

    await connectDB();

    const producto = new Product({
      ...validacion.data,
      creadoPor: session.user.id
    });

    await producto.save();

    // Log
    await Logger.producto(
      'Producto creado',
      session.user.id,
      { 
        productoId: producto._id,
        nombre: producto.nombre,
        categoria: producto.categoria 
      },
      request.headers.get('x-forwarded-for') || undefined
    );

    return NextResponse.json(
      { message: 'Producto creado', producto },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creando producto:', error);
    return NextResponse.json(
      { error: 'Error creando producto' },
      { status: 500 }
    );
  }
}