import { User } from '@prisma/client';

export class IUser implements User {
  id: number;
  email: string;
  name: string;
  birth_date: Date;
  document: string;
  accepted_terms: boolean;
  password: string;
}
