export default function TodoCardSkeleton() {
  return (
    <div className="flex flex-col bg-cardground border rounded shadow-md shadow-gray-700 p-4 gap-5 animate-pulse min-w-52">
      <div className="flex flex-row flex-wrap-reverse items-center justify-between gap-3">
        <div className="h-4 w-10 bg-gray-300 dark:bg-gray-600 rounded" />

        <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded" />
      </div>

      <div className="h-5 w-full bg-gray-300 dark:bg-gray-600 rounded" />

      <div className="h-5 w-3/4 bg-gray-300 dark:bg-gray-600 rounded" />
    </div>
  );
}
