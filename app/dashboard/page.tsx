import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  // Redirigir según el rol
  if (session.user.role === 'admin') {
    redirect('/admin/dashboard');
  } else {
    redirect('/cliente/dashboard');
  }

  return null;
}