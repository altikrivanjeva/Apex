import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import { useAuth } from '../context/AuthContext';

export default function Logout() {
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();

  useEffect(() => {
    destroyCookie(null, 'token', { path: '/' });
    setIsLoggedIn(false);
    router.replace('//');
  }, [router, setIsLoggedIn]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p className="text-lg">Logging out...</p>
    </div>
  );
}
