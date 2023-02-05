import { User } from "./user"

export interface Message {
  id: string,
  title: string,
  text: string,
  user?: User,
  createdAt: Date,
  updatedAt: Date,
  version: number
}