export function usecurrencify(amount) {
  let positiveOrNegative = "";
  if (amount > 0) positiveOrNegative = "+";
  else if (amount < 0) positiveOrNegative = "-";

  const positiveAmount = Math.abs(amount);
  const amountFormatted = positiveAmount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${positiveOrNegative} ${amountFormatted}`;
}
