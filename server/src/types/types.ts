import { RowDataPacket } from "mysql2";

export interface UserDetails extends RowDataPacket {
  id: string;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  admin: boolean;
  phoneNumber: string;
  createdOn: Date;
  passwordChangedOn: Date | null;
}
