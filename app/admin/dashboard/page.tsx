import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { User, Mail, Shield, Database, Package, Users, FileText } from 'lucide-react';
import Link from 'next/link';
import LogoutButton from '@/src/components/LogoutButton';
import { authOptions } from '@/src/lib/auth';
import { Button } from '@/src/components/ui/button';

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">FarmaShop - Administrador</h1>
          <LogoutButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Bienvenida */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Panel de Administración
          </h2>
          <p className="text-gray-600">
            Bienvenido, {session.user.name} - Gestiona el sistema desde aquí
          </p>
        </div>

        {/* Admin Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-blue-600">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-sm font-medium">Administrador</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{session.user.name}</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-600">
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

          <Card className="border-l-4 border-l-purple-600">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-600" />
                <CardTitle className="text-sm font-medium">Privilegios</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">Full Access</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-600">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-orange-600" />
                <CardTitle className="text-sm font-medium">ID Sistema</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-mono truncate">{session.user.id}</p>
            </CardContent>
          </Card>
        </div>

        {/* Admin Panel */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Package className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Gestionar Productos</CardTitle>
              <CardDescription>
                Crear, editar y eliminar productos del catálogo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/productos">
                <Button className="w-full">
                  Ir a Productos
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Gestionar Usuarios</CardTitle>
              <CardDescription>
                Ver y administrar todos los usuarios del sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/usuarios">
                <Button className="w-full">
                  Ir a Usuarios
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <FileText className="h-10 w-10 text-purple-600 mb-2" />
              <CardTitle>Logs de Seguridad</CardTitle>
              <CardDescription>
                Monitorear toda la actividad del sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/logs">
                <Button className="w-full">
                  Ver Logs
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Session Details */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Detalles de la sesión de administrador</CardTitle>
            <CardDescription>Información técnica de tu sesión actual</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
              <code>{JSON.stringify(session, null, 2)}</code>
            </pre>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}