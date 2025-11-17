import 'next-auth';

declare module 'next-auth' {
  interface User {
    role: string;
    id: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string;
    id: string;
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> e92e1b769dd6025695d105952d7b8ddb1f82d0b5
