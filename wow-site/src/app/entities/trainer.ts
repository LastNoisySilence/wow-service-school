import {Event} from "./event";
export class Trainer {
  constructor(
    public fullName: string = '',
    public photoUrl: string = '',
    public phoneNumber: string = '',
    public email: string = '',
    public siteUrl: string = '',
    public description: string = '',
    public _id?: string,
    public events?: Event[]
  ) {}
}