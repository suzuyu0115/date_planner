import Link from 'next/link';
import { Dancing_Script } from 'next/font/google';

const dancingScript = Dancing_Script({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 to-purple-400 flex flex-col justify-center items-center text-white px-4">
      <div className="text-center">
        <h1 className={`text-7xl sm:text-8xl md:text-9xl font-bold mb-6 ${dancingScript.className}`}>
          Date Planner
        </h1>
        <p className="text-xl sm:text-2xl mb-8">AIがあなたの完璧なデートを計画します</p>
        <Link
          href="/create-plan"
          className="
            relative
            inline-block
            bg-white text-pink-500 font-bold py-3 px-6 rounded-full text-xl
            shadow-lg
            overflow-hidden
            transition-all duration-300 ease-out
            transform hover:-translate-y-1 hover:shadow-xl
            active:translate-y-0 active:shadow-md
            focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50
            group
          "
        >
          <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
            プランを作成する
          </span>
          <span
            className="
            absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500
            transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-95
            transition-transform duration-300 ease-out origin-left
          "
          ></span>
        </Link>
      </div>
      <footer className="mt-16 text-sm opacity-75">
        © 2024 Date Planner. All rights reserved.
      </footer>
    </div>
  );
}
