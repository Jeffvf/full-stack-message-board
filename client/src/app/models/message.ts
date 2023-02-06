import { User } from "./user"

export interface Message {
  _id: string,
  title: string,
  text: string,
  user?: User,
  createdAt: Date,
  updatedAt: Date,
  version: number
}