import Log from '../models/Log';
import connectDB from './db';

interface LogData {
  tipo: 'auth' | 'producto' | 'usuario' | 'sistema' | 'seguridad';
  accion: string;
  usuario?: string;
  email?: string;
  detalles?: any;
  ip?: string;
  userAgent?: string;
  nivel?: 'info' | 'warning' | 'error' | 'critical';
}

export class Logger {
  static async log(data: LogData) {
    try {
      await connectDB();
      
      const log = new Log({
        tipo: data.tipo,
        accion: data.accion,
        usuario: data.usuario,
        email: data.email,
        detalles: data.detalles || {},
        ip: data.ip,
        userAgent: data.userAgent,
        nivel: data.nivel || 'info',
        timestamp: new Date()
      });

      await log.save();
      
      // Log en consola para desarrollo
      if (process.env.NODE_ENV === 'development') {
        console.log(`[${data.nivel?.toUpperCase()}] ${data.tipo}: ${data.accion}`);
      }
    } catch (error) {
      console.error('Error guardando log:', error);
      // No lanzar error para no interrumpir la operación principal
    }
  }

  // Métodos específicos para cada tipo
  static async auth(accion: string, email: string, detalles?: any, ip?: string, userAgent?: string) {
    await this.log({
      tipo: 'auth',
      accion,
      email,
      detalles,
      ip,
      userAgent,
      nivel: accion.includes('fallido') ? 'warning' : 'info'
    });
  }

  static async producto(accion: string, usuarioId: string, detalles: any, ip?: string) {
    await this.log({
      tipo: 'producto',
      accion,
      usuario: usuarioId,
      detalles,
      ip,
      nivel: 'info'
    });
  }

  static async seguridad(accion: string, detalles: any, ip?: string, nivel: 'warning' | 'error' | 'critical' = 'warning') {
    await this.log({
      tipo: 'seguridad',
      accion,
      detalles,
      ip,
      nivel
    });
  }
}