export interface UserResponse {
    data?: User
}

export interface User {
    _id?: string
    firstname?: string
    lastname?: string
    email?: string
    userStatus?: string
    userRole?: string
    isActive?: boolean
    image?: string
    created_at?: string
    login_at?: string
    logout_at?: string
}

export interface LoginBody {
    email: string;
    password: string;
}