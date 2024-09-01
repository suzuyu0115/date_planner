import { LoadingProps } from '@/types'

export const Loading = ({ isLoading }: LoadingProps) => (
  isLoading && (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="text-center text-white">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-white border-solid mb-4"></div>
        <p className="text-2xl font-semibold">プランを作成中...</p>
        <p className="text-lg mt-2">しばらくお待ちください</p>
      </div>
    </div>
  )
);
