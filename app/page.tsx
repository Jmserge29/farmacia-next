import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Pill, ShieldCheck, Clock, TrendingUp, Users, Package, ArrowRight, CheckCircle2 } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
                <Pill className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">FarmaShop</span>
            </div>
            <nav className="hidden items-center gap-8 md:flex">
              <a href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Características
              </a>
              <a href="#benefits" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Beneficios
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Comenzar</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-900">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              Sistema de gestión farmacéutica
            </div>

            <h1 className="mb-6 max-w-4xl text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              La plataforma completa para gestionar tu <span className="text-blue-600">farmacia</span>
            </h1>

            <p className="mb-10 max-w-2xl text-balance text-lg text-gray-600 sm:text-xl">
              Optimiza el inventario, gestiona ventas y controla tu negocio de forma segura con la herramienta diseñada
              para farmacias modernas.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/register">
                <Button size="lg" className="group gap-2 text-base">
                  Comenzar gratis
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="text-base bg-transparent">
                  Ver demo
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid w-full max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">24/7</div>
                  <div className="text-sm text-gray-600">Soporte disponible</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">99.9%</div>
                  <div className="text-sm text-gray-600">Uptime garantizado</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">500+</div>
                  <div className="text-sm text-gray-600">Farmacias activas</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">5K+</div>
                  <div className="text-sm text-gray-600">Productos gestionados</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Herramientas profesionales para tu farmacia
            </h2>
            <p className="mx-auto max-w-2xl text-balance text-lg text-gray-600">
              Todo lo que necesitas en una sola plataforma, diseñada específicamente para el sector farmacéutico
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-600">
              <CardHeader>
                <Package className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Control de Inventario</CardTitle>
                <CardDescription>
                  Monitorea stock en tiempo real con alertas automáticas de vencimiento y productos agotados.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-green-600">
              <CardHeader>
                <ShieldCheck className="h-10 w-10 text-green-600 mb-2" />
                <CardTitle>Seguridad Total</CardTitle>
                <CardDescription>
                  Registro completo de operaciones con trazabilidad y cumplimiento de regulaciones.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-purple-600">
              <CardHeader>
                <Users className="h-10 w-10 text-purple-600 mb-2" />
                <CardTitle>Gestión Multi-Usuario</CardTitle>
                <CardDescription>
                  Roles personalizables con permisos específicos para cada miembro del equipo.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-orange-600">
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-orange-600 mb-2" />
                <CardTitle>Reportes Inteligentes</CardTitle>
                <CardDescription>
                  Analytics detallados y visualización de datos para decisiones informadas.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-600">
              <CardHeader>
                <Clock className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Punto de Venta Rápido</CardTitle>
                <CardDescription>
                  Sistema ágil de ventas con historial completo de transacciones y clientes.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-green-600">
              <CardHeader>
                <Pill className="h-10 w-10 text-green-600 mb-2" />
                <CardTitle>Catálogo de Productos</CardTitle>
                <CardDescription>
                  Base de datos completa con información detallada, precios y disponibilidad.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                Gestión farmacéutica más rápida e inteligente
              </h2>
              <p className="mb-8 text-lg text-gray-600">
                Diseñado para profesionales que buscan eficiencia, seguridad y control total sobre su negocio.
              </p>
              <ul className="space-y-4">
                {[
                  "Reducción de tiempo en tareas administrativas",
                  "Mayor control sobre vencimientos y stock",
                  "Informes automáticos y análisis de tendencias",
                  "Cumplimiento de normativas sanitarias",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                    <span className="text-gray-900">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-6">
              <Card className="border-l-4 border-l-blue-600">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-sm font-medium">Eficiencia operativa</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-gray-900">+45%</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-600">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-green-600" />
                    <CardTitle className="text-sm font-medium">Tiempo ahorrado</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-gray-900">3hrs por día</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-600">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-purple-600" />
                    <CardTitle className="text-sm font-medium">Control de inventario</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-gray-900">100%</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Transforma la gestión de tu farmacia hoy
          </h2>
          <p className="mb-8 text-balance text-lg text-blue-50 sm:text-xl">
            Únete a cientos de farmacias que ya optimizan su negocio con FarmaShop
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="text-base">
                Crear cuenta gratis
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-white bg-transparent text-base text-white hover:bg-white/10"
              >
                Ver cómo funciona
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                  <Pill className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-900">FarmaShop</span>
              </div>
              <p className="text-sm leading-relaxed text-gray-600">
                Sistema integral de gestión farmacéutica profesional.
              </p>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold text-gray-900">Producto</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#features" className="text-gray-600 hover:text-gray-900">
                    Características
                  </a>
                </li>
                <li>
                  <a href="#benefits" className="text-gray-600 hover:text-gray-900">
                    Beneficios
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold text-gray-900">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Nosotros
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold text-gray-900">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Términos
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t pt-8 text-center">
            <p className="text-sm text-gray-600">&copy; 2025 FarmaShop. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
