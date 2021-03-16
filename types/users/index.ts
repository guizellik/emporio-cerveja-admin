export interface UserData {
  email: string,
  password: string,
  id: number,
  name: string
  role: string
}

export interface LoginPayload {
  email: string,
  password: string,
}

export interface RegisterUserPayload {
  email: string,
  password: string,
  name: string,
  role: string
}

