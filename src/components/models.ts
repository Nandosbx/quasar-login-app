export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  inserted_at: string;
}
