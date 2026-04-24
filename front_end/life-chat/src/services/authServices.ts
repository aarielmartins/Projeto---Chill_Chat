import api from './api'

export interface RegisterData {
  username: string
  email: string
  password: string
  confirm_password: string
}

export interface LoginData {
  email: string
  password: string
}

export interface TokenResponse {
  access: string
  refresh: string
}

export interface Profile {
  id: number
  username: string
  bio: string
  status: string
  avatar: string | null
}

export interface User {
  id: number
  username: string
  email: string
  profile: Profile
}

export interface RegisterResponse {
  access: string
  refresh: string
  user: User
}

export const registerUser = (data: RegisterData) => {
  return api.post<RegisterResponse>('/register/', data)
}

export const loginUser = (data: LoginData) => {
  return api.post<TokenResponse>('/login/', data)
}
