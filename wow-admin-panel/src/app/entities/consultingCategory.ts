export class ConsultingCategory {
  constructor(
    public title: string = '',
    public listOfConsultingIds: string[] = [],
    public secondaryKey: string = '',
    public _id?: string
  ) {}
}