import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  nombre: string;
  email: string;
  password: string;
  rol: 'admin' | 'cliente';
  activo: boolean;
  fechaCreacion: Date;
  ultimoAcceso?: Date;
}

const UserSchema = new Schema<IUser>({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
    minlength: [2, 'Mínimo 2 caracteres'],
    maxlength: [100, 'Máximo 100 caracteres']
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Email inválido']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
    minlength: [8, 'Mínimo 8 caracteres']
  },
  rol: {
    type: String,
    enum: ['admin', 'cliente'],
    default: 'cliente'
  },
  activo: {
    type: Boolean,
    default: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  ultimoAcceso: {
    type: Date
  }
});

// Índices para búsquedas eficientes
UserSchema.index({ email: 1 });
UserSchema.index({ rol: 1, activo: 1 });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);