'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { Button } from './ui/button';

export default function LogoutButton() {
  return (
    <Button
      variant="outline" 
      onClick={() => signOut({ callbackUrl: '/' })}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Cerrar Sesión
    </Button>
  );
}