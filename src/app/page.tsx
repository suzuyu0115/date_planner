import { Dancing_Script } from 'next/font/google';
import { CreatePlanButton } from './components/CeratePlanButton';

const dancingScript = Dancing_Script({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 to-purple-400 flex flex-col justify-center items-center text-white px-4">
      <div className="text-center">
        <h1 className={`text-7xl sm:text-8xl md:text-9xl font-bold mb-6 ${dancingScript.className}`}>
          Date Planner
        </h1>
        <p className="text-xl sm:text-2xl mb-8">AIがあなたの完璧なデートを計画します</p>

        <CreatePlanButton />
      </div>
      <footer className="mt-16 text-sm opacity-75">
        © 2024 Date Planner. All rights reserved.
      </footer>
    </div>
  );
}
