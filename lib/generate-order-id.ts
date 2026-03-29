export function generateOrderId() {
  const random = Math.floor(100000 + Math.random() * 900000); // 6 dígitos
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = String(now.getFullYear()).slice(-2);

  return `LENSHUB-${random}-${day}-${month}-${year}`;
}