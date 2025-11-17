import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { User, Mail, Shield, Calendar, Package } from 'lucide-react';
import Link from 'next/link';
import { authOptions } from '@/src/lib/auth';
import LogoutButton from '@/src/components/LogoutButton';

export default async function ClienteDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'cliente') {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">FarmaShop - Cliente</h1>
          <LogoutButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Bienvenida */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Bienvenido, {session.user.name}!
          </h2>
          <p className="text-gray-600">
            Aquí puedes ver tus datos y explorar nuestro catálogo de productos
          </p>
        </div>

        {/* User Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-sm font-medium">Nombre</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{session.user.name}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-green-600" />
                <CardTitle className="text-sm font-medium">Email</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold truncate">{session.user.email}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-600" />
                <CardTitle className="text-sm font-medium">Rol</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold capitalize">{session.user.role}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-orange-600" />
                <CardTitle className="text-sm font-medium">ID Usuario</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-mono truncate">{session.user.id}</p>
            </CardContent>
          </Card>
        </div>

        {/* Session Details */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Detalles de la sesión</CardTitle>
            <CardDescription>Información técnica de tu sesión actual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600 font-medium">Usuario ID:</span>
                <span className="font-mono text-sm">{session.user.id}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600 font-medium">Email:</span>
                <span>{session.user.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600 font-medium">Nombre:</span>
                <span>{session.user.name}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600 font-medium">Rol:</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                  {session.user.role}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones rápidas</CardTitle>
            <CardDescription>Explora las funcionalidades disponibles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/cliente/productos">
                <Button className="w-full" size="lg">
                  <Package className="mr-2 h-5 w-5" />
                  Ver Productos
                </Button>
              </Link>
              <Button variant="outline" size="lg" disabled>
                <Calendar className="mr-2 h-5 w-5" />
                  Mis Pedidos (Próximamente)
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
