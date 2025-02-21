import { User } from '@/models';

export type SignInDto = {
  email: string;
  password: string;
};

export type SignUpDto = Omit<User, 'id'> & {
  password: string;
};

export type AuthResponse = {
  accessToken: string;
  user: User;
};
