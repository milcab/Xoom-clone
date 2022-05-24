import { useRef, useState } from "react";
import type { NextPage } from "next";
import useFirebaseAuth from "../firebase/hooks";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { signInWithEmailAndPassword } = useFirebaseAuth();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!emailRef.current || !passwordRef.current) {
      setLoading(false);
      return;
    }

    const result = await signInWithEmailAndPassword({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });

    router.push("/home");

    setLoading(false);
  };

  return (
    <div className="block p-6 my-12 mx-auto max-w-sm bg-[#fff] rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
      <form onSubmit={onSubmitHandler}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          />
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
              required
            />
          </div>
          <label
            htmlFor="remember"
            className="ml-2 text-sm font-medium text-gray-900"
          >
            Remember me
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Home;
