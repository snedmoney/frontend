const NoTransactions = () => {
  return (
    <div className="text-default-400 p-8 rounded-lg text-center h-[400px] flex flex-col justify-center items-center">
      <p className="text-xl font-semibold">No transactions found</p>
      <p className="mt-2">
        Try adjusting your filters or check back later for new transactions.
      </p>
    </div>
  );
};

export default NoTransactions;
