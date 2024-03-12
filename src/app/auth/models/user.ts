export class User {
  id: string;
  email: string;
  active: boolean;
  lastName: string;
  name: string;
  passReset: boolean;
  role: string;

  constructor(obj?: any) {
    this.id = obj && obj._id || null;
    this.email = obj && obj.email || null;
    this.active = obj && obj.active || null;
    this.lastName = obj && obj.lastName || null;
    this.name = obj && obj.name || null;
    this.passReset = obj && obj.passReset || null;
    this.role = obj && obj.role || null;
  }
}