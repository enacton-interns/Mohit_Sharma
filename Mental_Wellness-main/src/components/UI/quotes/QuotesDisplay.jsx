import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getQuote } from "../../../api/quotes.api";
import { useSelector } from "react-redux";
import clsx from "clsx";

const QuotesDisplay = () => {
  const theme = useSelector((state) => state.theme.theme);
  const isLight = theme === "light";

  const {
    data: quote,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["quote"],
    queryFn: getQuote,
    refetchInterval: 60000,
    placeholderData: keepPreviousData,
    staleTime: 59000,
  });

  if (isLoading) {
    return (
      <p
        className={clsx(
          "text-center text-sm sm:text-base",
          isLight ? "text-gray-500" : "text-gray-300"
        )}
      >
        Loading quote...
      </p>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 px-4">
        <p className="text-sm sm:text-base">Failed to load quote.</p>
        <p
          className={clsx(
            "text-xs sm:text-sm mt-1",
            isLight ? "text-gray-500" : "text-gray-400"
          )}
        >
          {error.message}
        </p>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "px-4 sm:px-6 py-4 sm:py-6 mt-6 sm:mt-8 rounded-2xl shadow-lg max-w-2xl mx-auto transition duration-300 ease-in-out",
        isLight
          ? "bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100"
          : "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600"
      )}
    >
      <blockquote
        className={clsx(
          "lg:text-xl sm:text-md italic",
          isLight ? "text-gray-800" : "text-white"
        )}
      >
        “{quote.quote}”
      </blockquote>
      <p
        className={clsx(
          "mt-4 text-right text-base sm:text-lg font-semibold",
          isLight ? "text-gray-700" : "text-gray-300"
        )}
      >
        — {quote.author}
      </p>
    </div>
  );
};

export default QuotesDisplay;
