import mongoose, { Schema, Document } from 'mongoose';

export interface ILog extends Document {
  tipo: 'auth' | 'producto' | 'usuario' | 'sistema' | 'seguridad';
  accion: string;
  usuario?: mongoose.Types.ObjectId;
  email?: string;
  detalles: {
    [key: string]: any;
  };
  ip?: string;
  userAgent?: string;
  nivel: 'info' | 'warning' | 'error' | 'critical';
  timestamp: Date;
}

const LogSchema = new Schema<ILog>({
  tipo: {
    type: String,
    required: true,
    enum: ['auth', 'producto', 'usuario', 'sistema', 'seguridad'],
    index: true
  },
  accion: {
    type: String,
    required: true,
    maxlength: 200
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  email: {
    type: String
  },
  detalles: {
    type: Schema.Types.Mixed,
    default: {}
  },
  ip: {
    type: String
  },
  userAgent: {
    type: String
  },
  nivel: {
    type: String,
    enum: ['info', 'warning', 'error', 'critical'],
    default: 'info',
    index: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
});

// Índices compuestos para consultas eficientes
LogSchema.index({ tipo: 1, timestamp: -1 });
LogSchema.index({ usuario: 1, timestamp: -1 });
LogSchema.index({ nivel: 1, timestamp: -1 });

// TTL Index: Eliminar logs después de 90 días (opcional)
LogSchema.index({ timestamp: 1 }, { expireAfterSeconds: 7776000 });

export default mongoose.models.Log || mongoose.model<ILog>('Log', LogSchema);
