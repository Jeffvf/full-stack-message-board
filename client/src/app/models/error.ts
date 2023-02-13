export interface ServerError{
  location: string,
  msg: string,
  param: string,
  value?: string
}