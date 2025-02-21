import { Gender } from "@/libs/utils/enum";

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: Gender;
}
