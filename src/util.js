export default function formatCurrency(num) {
  return (
    Number(num.toFixed(2)).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }) + ' '
  );
}
