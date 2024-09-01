import Link from 'next/link';

export const CreatePlanButton = () => (
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
);
