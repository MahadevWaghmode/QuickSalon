export const paymentsData = [
  {
    id: 1,
    customer: 'Rahul Sharma',
    amount: '₹1,200',
    method: 'UPI',
    status: 'Paid',
    date: '12 Sep 2025',
  },
  {
    id: 2,
    customer: 'Amit Patil',
    amount: '₹800',
    method: 'Card',
    status: 'Pending',
    date: '12 Sep 2025',
  },
  {
    id: 3,
    customer: 'Neha Verma',
    amount: '₹1,500',
    method: 'Cash',
    status: 'Failed',
    date: '11 Sep 2025',
  },
]

export const statusColor = {
  Paid: 'success',
  Pending: 'warning',
  Failed: 'error',
}
