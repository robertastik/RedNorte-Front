import { apiFetch } from './client';
import type { LoginRequest, LoginResponse } from '../types/auth';

const BASE_PATH = '/auth';

export const authApi = {
    /**
     * Iniciar sesión en el portal obteniendo el JWT
     */
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        // Asumiendo que el endpoint de Spring Boot es /api/v1/auth/login
        return apiFetch<LoginResponse>(`${BASE_PATH}/login`, {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
    },

    /**
     * Verificar si el token sigue siendo válido
     */
    me: async (): Promise<LoginResponse['usuario']> => {
        return apiFetch<LoginResponse['usuario']>(`${BASE_PATH}/me`, {
            method: 'GET'
        });
    }
};
