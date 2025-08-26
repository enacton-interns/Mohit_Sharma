export interface CreateProviderDto {
  name: string;
  email: string;
  contact: string;
  available?: boolean; // defaults to true
  skillNames?: string[]; // e.g. ['plumbing', 'cleaning']
}

export interface UpdateProviderDto {
  name?: string;
  email?: string;
  contact?: string;
  available?: boolean;
  skillNames?: string[]; // full replacement of skills
}
