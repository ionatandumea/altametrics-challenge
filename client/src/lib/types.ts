export type Invoice = {
  id: string;
  vendorName: string;
  amount: number;
  dueDate: Date;
  userId: number;
  description: string;
  paid: boolean;
};

