export type User = {
  id: number;
  name: string | null;
  email: string | null;
  balance?: number | null;
  income?: number | null;
  age?: number | null;
};

export type AlterUserPayload = Partial<User>;
