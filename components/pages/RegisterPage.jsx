import { signUp } from '@/lib/firebase/services';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import firebase_app from '@/lib/firebase/init';

function RegisterPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const router = useRouter();
  const [rememberMe, setRememberMe] = React.useState(false);
  const [error, setError] = useState(null);

  const handleForm = async (event) => {
    event.preventDefault();
    try {
      const { result, error } = await signUp(email, password);
      // else successful
      console.log(result);
      return router.push('/signin');
    } catch (error) {
      setError(error.message);
    }

    // if (error) {
    //   return console.log(error);
    // }

    // // else successful
    // console.log(result);
    // return router.push('/signin');
  };

  return (
    <div className="p-6 border-[1px] border-gray-300 flex flex-col justify-center items-center gap-5 lg:w-[40%] md:w-[40%] w-[95%]">
      <h1 className="text-3xl font-semibold text-sky-600">Sign Up</h1>
      <form onSubmit={handleForm} className="form flex flex-col w-full gap-5">
        <label htmlFor="email">
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" className="p-2 w-full outline-none" />
        </label>
        <label htmlFor="password">
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" className="p-2 w-full outline-none" />
        </label>

        {/* <div>
          <label>
            <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
            Remember Me
          </label>
        </div> */}

        <button type="submit" className="bg-sky-600 py-2 text-sky-50 font-semibold hover:ring-[1px] hover:ring-sky-600 hover:bg-sky-50 hover:text-sky-600 duration-300">
          Sign Up
        </button>
      </form>
      <p className="flex items-center gap-2">
        Already have an Account ?
        <Link href="/signin" className="text-sky-500 hover:text-sky-700">
          Sign In here
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
