import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 to-purple-400 flex flex-col justify-center items-center text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">Dating Planner</h1>
        <p className="text-2xl mb-8">AIがあなたの完璧なデートを計画します</p>
        <Link
          href="/create-plan"
          className="bg-white text-pink-500 font-bold py-3 px-6 rounded-full text-xl hover:bg-pink-100 transition duration-300"
        >
          プランを作成する
        </Link>
      </div>
      <footer className="mt-16 text-sm opacity-75">
        © 2024 Dating Planner. All rights reserved.
      </footer>
    </div>
  );
}
