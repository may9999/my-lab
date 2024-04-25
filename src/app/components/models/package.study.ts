export class PackageStudy {
  id: string;
  code: string;
  name: string;
  studies: Array<string>; 
  desc: string;
  cost: number;
  active: boolean;

  constructor(obj?: any) {
    this.id = obj && obj._id || null;
    this.code = obj && obj.code || null;
    this.name = obj && obj.name || null;
    this.studies = obj && obj.studies || [];
    this.desc = obj && obj.desc || null;
    this.cost = obj && obj.cost || null;
    this.active = obj && obj.active || null;
  }
}