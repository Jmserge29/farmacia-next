import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectDB from './db';
import { Logger } from './logger';
import User from '../models/User';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Credenciales incompletas');
        }

        try {
          await connectDB();
          
          const user = await User.findOne({ 
            email: credentials.email.toLowerCase() 
          });

          if (!user) {
            await Logger.auth(
              'Login fallido - Usuario no existe',
              credentials.email,
              { razon: 'usuario_no_encontrado' },
              req.headers?.['x-forwarded-for'] as string,
              req.headers?.['user-agent'] as string
            );
            throw new Error('Credenciales inválidas');
          }

          if (!user.activo) {
            await Logger.auth(
              'Login fallido - Usuario inactivo',
              credentials.email,
              { razon: 'usuario_inactivo' },
              req.headers?.['x-forwarded-for'] as string
            );
            throw new Error('Usuario inactivo');
          }

          const isValid = await bcrypt.compare(credentials.password, user.password);

          if (!isValid) {
            await Logger.auth(
              'Login fallido - Contraseña incorrecta',
              credentials.email,
              { razon: 'password_incorrecto' },
              req.headers?.['x-forwarded-for'] as string
            );
            throw new Error('Credenciales inválidas');
          }

          // Actualizar último acceso
          user.ultimoAcceso = new Date();
          await user.save();

          // Log exitoso
          await Logger.auth(
            'Login exitoso',
            credentials.email,
            { userId: user._id, rol: user.rol },
            req.headers?.['x-forwarded-for'] as string,
            req.headers?.['user-agent'] as string
          );

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.nombre,
            role: user.rol
          };
        } catch (error) {
          console.error('Error en authorize:', error);
          throw error;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 horas
  },
  secret: process.env.NEXTAUTH_SECRET,
};
