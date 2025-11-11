import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  requiereReceta: boolean;
  imagen?: string;
  activo: boolean;
  creadoPor: mongoose.Types.ObjectId;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}

const ProductSchema = new Schema<IProduct>({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
    maxlength: [200, 'Máximo 200 caracteres']
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es requerida'],
    maxlength: [1000, 'Máximo 1000 caracteres']
  },
  precio: {
    type: Number,
    required: [true, 'El precio es requerido'],
    min: [0, 'El precio debe ser positivo']
  },
  stock: {
    type: Number,
    required: [true, 'El stock es requerido'],
    min: [0, 'El stock no puede ser negativo'],
    default: 0
  },
  categoria: {
    type: String,
    required: [true, 'La categoría es requerida'],
    enum: ['medicamentos', 'cuidado-personal', 'vitaminas', 'primeros-auxilios', 'otros']
  },
  requiereReceta: {
    type: Boolean,
    default: false
  },
  imagen: {
    type: String
  },
  activo: {
    type: Boolean,
    default: true
  },
  creadoPor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now
  }
});

// Índices
ProductSchema.index({ nombre: 'text', descripcion: 'text' });
ProductSchema.index({ categoria: 1, activo: 1 });
ProductSchema.index({ precio: 1 });

// Middleware para actualizar fechaActualizacion
ProductSchema.pre('save', function(next) {
  this.fechaActualizacion = new Date();
  next();
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);