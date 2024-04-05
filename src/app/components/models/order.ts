export class Order {
  id: string;
  name: string;
  lastName: string;
  age: number;
  sexType: string;
  clientId: string;
  payment: string; // complete - parcial - none
  paymentType: string; // credit card - cash - other
  comments: string;
  status: string;

  constructor(obj?: any) {
    this.id = obj && obj._id || null;
    this.name = obj && obj.name || null;
    this.lastName = obj && obj.lastName || null;
    this.age = obj && obj.age || null;
    this.sexType = obj && obj.sexType || null;
    this.clientId = obj && obj.clientId || null;
    this.payment = obj && obj.payment || null;
    this.paymentType = obj && obj.paymentType || null;
    this.comments = obj && obj.comments || null;
    this.status = obj && obj.status || null;
  }
}