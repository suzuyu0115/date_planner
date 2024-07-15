import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 to-purple-400 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          ページが見つかりません
        </h2>
        <p className="text-gray-600 mb-6">
          お探しのページは存在しないか、削除された可能性があります。
        </p>
        <Link
          href="/"
          className="bg-pink-500 text-white font-bold py-2 px-4 rounded hover:bg-pink-600 transition duration-300"
        >
          トップページに戻る
        </Link>
      </div>
    </div>
  );
}
