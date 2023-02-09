export interface User {
  _id: string,
  firstName: string,
  lastName: string,
  username: string,
  password: string,
}

export interface UserCredentials {
  username: string,
  password: string
}

export interface AuthUser {
  token: string,
  user: User,
  errors?: string
}

export interface UserRegister {
  firstName: string,
  lastName: string,
  username: string,
  password: string,
  confirmPassword: string,
}