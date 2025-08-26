export interface CreateUserDto {
  uid: string;
  name: string; // required
  email: string; // required, unique
  password: string;
  contact?: string; // optional
  address?: string; // optional
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  contact?: string;
  address?: string;
}
