export function CalculateTotals(transactions = []) {
  const { income, expense } = transactions.reduce(
    (acc, { amount, type }) => {
      const numAmount = Number(amount); // convert here
      if (type === "income") {
        acc.income += numAmount;
      } else if (type === "expense") {
        acc.expense += numAmount;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const total = income + expense;

  return { total, income, expense };
}
