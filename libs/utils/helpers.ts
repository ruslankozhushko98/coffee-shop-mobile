export const getCashFormat = (cash: string | number): string => `$${Number(cash).toFixed(2)}`;
