import { Teacher } from "../../teachers/models/teacher";

export interface Course {
  id: number,
  name: string,
  description: string,
  teacher: string,
  calendar: string,
  type: string,
  teachers?:Teacher[],

}
