const API_BASE_URL = "http://localhost:8888/api"

class ApiClient {
  private token: string | null = null

  constructor() {
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("token")
    }
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token)
    }
  }

  removeToken() {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
    }
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    }

    if (this.token) {
      headers["Authorization"] = `Token ${this.token}`
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  private async uploadRequest(endpoint: string, formData: FormData) {
    const url = `${API_BASE_URL}${endpoint}`
    const headers: HeadersInit = {}

    if (this.token) {
      headers.Authorization = `Token ${this.token}`
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  // Auth
  async login(username: string, password: string) {
    return this.request("/auth/login/", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    })
  }

  async register(userData: {
    username: string
    email: string
    password: string
    first_name?: string
    last_name?: string
  }) {
    return this.request("/auth/register/", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  // Posts
  async getPosts() {
    return this.request("/posts/")
  }

  async getUserPosts(userId: number) {
    return this.request(`/users/${userId}/posts/`)
  }

  async createPost(content: string, image?: File) {
    const formData = new FormData()
    formData.append("content", content)

    if (image) {
      formData.append("image", image)
      formData.append("post_type", "mixed")
    } else {
      formData.append("post_type", "text")
    }

    return this.uploadRequest("/posts/", formData)
  }

  async likePost(postId: number) {
    return this.request(`/posts/${postId}/like/`, {
      method: "POST",
    })
  }

  async sharePost(postId: number) {
    return this.request(`/posts/${postId}/share/`, {
      method: "POST",
    })
  }

  async getComments(postId: number) {
    return this.request(`/posts/${postId}/comments/`)
  }

  async createComment(postId: number, content: string) {
    return this.request(`/posts/${postId}/comments/`, {
      method: "POST",
      body: JSON.stringify({ content }),
    })
  }

  // Profile
  async getUserProfile(userId: number) {
    return this.request(`/users/${userId}/profile/`)
  }

  async updateProfile(profileData: any) {
    return this.request("/profile/", {
      method: "PATCH",
      body: JSON.stringify(profileData),
    })
  }

  // Recent posts for sidebar
  async getRecentPosts() {
    return this.request("/posts/recent/")
  }
}

export const apiClient = new ApiClient()
