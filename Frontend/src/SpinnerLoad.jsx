function SpinnerLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        type="button"
        className="bg-gray-700 h-max w-max rounded-lg text-white font-bold hover:bg-red-300 hover:cursor-not-allowed duration-[500ms,800ms]"
        disabled
      >
        <div className="flex items-center justify-center m-[10px]">
          <div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-gray-500 border-4"></div>
          <div className="ml-2"> Processing... </div>
        </div>
      </button>
    </div>
  );
}

export default SpinnerLoader;
