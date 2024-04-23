export class ClinicalStudy {
  id: string;
  code: string;
  name: string; 
  desc: string;
  valueReference: String
  cost: number;
  active: boolean;

  constructor(obj?: any) {
    this.id = obj && obj._id || null;
    this.code = obj && obj.code || null;
    this.name = obj && obj.name || null;
    this.desc = obj && obj.desc || null;
    this.valueReference = obj && obj.valueReference || null;
    this.cost = obj && obj.cost || null;
    this.active = obj && obj.active || null;
  }
}