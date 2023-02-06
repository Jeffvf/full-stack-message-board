export interface User {
  id: number,
  firstName: string,
  lastName: string,
  username: string,
  password: string,
  member: boolean
  version: number,
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