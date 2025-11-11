import Link from 'next/link';
import { Button } from '../src/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center mb-8">
          FarmaShop
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Sistema de gestión de farmacia
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/login">
            <Button>Iniciar Sesión</Button>
          </Link>
          <Link href="/register">
            <Button variant="outline">Registrarse</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}