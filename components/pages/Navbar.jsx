import { useAuthContext } from '@/context/AuthContext';
import { signOut } from '@/lib/firebase/services';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  const handleSignOut = async () => {
    const { result, error } = await signOut();
    if (error) {
      console.error('Sign out error:', error);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="w-full p-10 bg-gray-400 text-gray-50 flex items-center justify-between">
      <Link href={'/'} className="text-3xl font-bold">
        LOGO
      </Link>
      {user ? (
        <div className="flex items-center gap-4 ">
          <Link href={'/admin'} className="p-1 bg-sky-400 rounded-sm hover:bg-sky-600 hover:text-sky-50 duration-200 ">
            Dashboard
          </Link>
          <button onClick={handleSignOut} className="p-1 bg-sky-400 rounded-sm hover:bg-sky-600 hover:text-sky-50 duration-200 ">
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4 ">
          <Link href="/signin" className="p-1 bg-sky-400 rounded-sm hover:bg-sky-600 hover:text-sky-50 duration-200 ">
            Sign In
          </Link>
          <Link href="/signup" className="p-1 bg-sky-400 rounded-sm hover:bg-sky-600 hover:text-sky-50 duration-200 ">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
