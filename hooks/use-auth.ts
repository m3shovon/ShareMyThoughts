"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { apiClient } from "@/lib/api"

interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      apiClient.setToken(token)
      // Validate token by fetching current user
      apiClient
        .request("/auth/user/")
        .then((response) => {
          setUser(response.user)
        })
        .catch(() => {
          // Token is invalid, remove it
          localStorage.removeItem("token")
          apiClient.removeToken()
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = async (username: string, password: string) => {
    try {
      const response = await apiClient.login(username, password)
      apiClient.setToken(response.token)
      setUser(response.user)
    } catch (error: any) {
      throw new Error(error.error || "Login failed")
    }
  }

  const register = async (userData: any) => {
    try {
      const response = await apiClient.register(userData)
      apiClient.setToken(response.token)
      setUser(response.user)
    } catch (error: any) {
      throw new Error(error.error || "Registration failed")
    }
  }

  const logout = () => {
    apiClient.removeToken()
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
