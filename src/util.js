export default function formatCurrency(num) {
  return 'R$' + Number(num.toFixed(2)).toLocaleString() + ' ';
}
