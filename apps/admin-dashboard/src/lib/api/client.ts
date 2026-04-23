// La URL base usualmente vendría de variables de entorno, por ejemplo $env/dynamic/public
const API_BASE_URL = 'http://localhost:8080/api/v1';

export class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

/**
 * Función centralizada para realizar peticiones HTTP al Backend en Spring Boot (La "fuente de la verdad").
 * Maneja tokens JWT de autorización, configuración CORS y parseo de errores.
 */
export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Obtener JWT del localStorage (si estamos en navegador) o store global
    let token = '';
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('access_token') || '';
    }

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...((options.headers as Record<string, string>) || {})
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (!response.ok) {
        let errorMessage = 'Error desconocido o el servidor no responde correctamente';
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch (_) {
            errorMessage = response.statusText;
        }
        throw new ApiError(response.status, errorMessage);
    }

    // Para peticiones como DELETE que podrían no retornar Content
    if (response.status === 204) {
        return {} as T;
    }

    return await response.json() as T;
}
