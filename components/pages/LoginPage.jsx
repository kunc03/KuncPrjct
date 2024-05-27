import firebase_app from '@/lib/firebase/init';
import { signIn } from '@/lib/firebase/services';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Router } from 'next/router';
import React from 'react';

function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(false);
  const [error, setError] = React.useState(null);
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password, remember);
    if (error) {
      setError(error.message);
    } else {
      router.push('/admin');
    }
  };
  return (
    <div className="p-6 border-[1px] border-gray-300 flex flex-col justify-center items-center gap-5 lg:w-[40%] md:w-[40%] w-[95%]">
      <h1 className="text-3xl font-semibold text-sky-600">Sign In</h1>

      <form onSubmit={handleForm} className="form flex flex-col w-full gap-5">
        <label htmlFor="email">
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" className="p-2 w-full outline-none" />
        </label>
        <label htmlFor="password">
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" className="p-2 w-full outline-none" />
        </label>

        <div>
          <label>
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            Remember Me
          </label>
        </div>

        <button type="submit" className="bg-sky-600 py-2 text-sky-50 font-semibold hover:ring-[1px] hover:ring-sky-600 hover:bg-sky-50 hover:text-sky-600 duration-300">
          Sign In
        </button>
      </form>
      <p className="flex items-center gap-2">
        Don{"'"}t have an Account ?
        <Link href="/signup" className="text-sky-500 hover:text-sky-700">
          Sign Up now
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
