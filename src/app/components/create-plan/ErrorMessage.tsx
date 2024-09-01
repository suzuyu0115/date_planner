interface ErrorProps {
  error: string | null;
}

export const ErrorMessage = ({ error }: ErrorProps) => (
  error && (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
      role="alert"
    >
      <strong className="font-bold">エラー:</strong>
      <span className="block sm:inline"> {error}</span>
    </div>
  )
);
