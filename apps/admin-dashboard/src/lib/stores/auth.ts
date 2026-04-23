import { writable } from 'svelte/store';
import type { Usuario } from '../types/auth';
import { browser } from '$app/environment';

interface AuthState {
    user: Usuario | null;
    token: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false
};

// Cargar estado inicial desde el navegador
if (browser) {
    const savedToken = localStorage.getItem('access_token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
        try {
            initialState.token = savedToken;
            initialState.user = JSON.parse(savedUser);
            initialState.isAuthenticated = true;
        } catch (e) {
            console.error('Error parseando usuario en storage', e);
        }
    }
}

function createAuthStore() {
    const { subscribe, set, update } = writable<AuthState>(initialState);

    return {
        subscribe,
        login: (token: string, user: Usuario) => {
            if (browser) {
                localStorage.setItem('access_token', token);
                localStorage.setItem('user', JSON.stringify(user));
            }
            set({ token, user, isAuthenticated: true });
        },
        logout: () => {
            if (browser) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('user');
            }
            set({ token: null, user: null, isAuthenticated: false });
        }
    };
}

export const auth = createAuthStore();
