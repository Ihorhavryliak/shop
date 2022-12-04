import { instance } from "./api"

export const authAPI = {
  login (username = "mor_2314", password = "83r5^_") {
    return (
      instance.post<LoginType>('auth/login', {username, password} ).then(res =>  res.data )
    )
  },

}

type LoginType ={
  token: string
}