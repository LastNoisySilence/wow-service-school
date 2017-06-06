export class Event {
  constructor(
    public title: string = '', public categoryId: string = '',
    public imagePath: string = '', public type: string = '',
    public date: Date = new Date(), public duration: string = '',
    public cost: string = '', public place: string = '',
    public audience: string = '', public goal: string = '',
    public schedule: string = '', public additionalInfo: string = '',
    public _id?: string
  ) {}
}