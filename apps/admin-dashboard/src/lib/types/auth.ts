export interface Usuario {
    id: string;
    nombre: string;
    rol: 'ADMIN' | 'RECEPCIONISTA' | 'MEDICO';
    email: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    usuario: Usuario;
}
