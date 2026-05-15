import { useState, useEffect } from 'react';

export type WorkOrder = {
  id: string;
  orderId: string;
  date: string;
  type: string;
  amount: number;
  reason: string;
  status: 'pending' | 'completed';
};

class WorkOrderStore extends EventTarget {
  private orders: WorkOrder[] = [
    {
      id: 'WO-1001',
      orderId: 'ORD-1001',
      date: '2024-05-14',
      type: 'refund_deposit',
      amount: 5000,
      reason: '返还多收定金',
      status: 'pending'
    }
  ];

  get() {
    return this.orders;
  }

  add(order: Omit<WorkOrder, 'id' | 'status' | 'date'>) {
    const today = new Date();
    const newOrder: WorkOrder = {
      ...order,
      id: `WO-${Date.now().toString().slice(-4)}`,
      date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`,
      status: 'pending'
    };
    this.orders = [newOrder, ...this.orders];
    this.dispatchEvent(new Event('change'));
  }

  complete(id: string) {
    this.orders = this.orders.map(o => o.id === id ? { ...o, status: 'completed' } : o);
    this.dispatchEvent(new Event('change'));
  }
}

export const workOrderStore = new WorkOrderStore();

export function useWorkOrders() {
  const [orders, setOrders] = useState<WorkOrder[]>(workOrderStore.get());

  useEffect(() => {
    const handler = () => {
      setOrders(workOrderStore.get());
    };
    workOrderStore.addEventListener('change', handler);
    return () => workOrderStore.removeEventListener('change', handler);
  }, []);

  return orders;
}
