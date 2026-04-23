import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';
// Importamos auth. Podríamos suscribirnos, pero usar el initial load del localstorage vale.

export const ssr = false; // Desactivamos SSR para todas las rutas hijas del Dashboard (SPA mode)

export const load = async () => {
    if (browser) {
        const token = localStorage.getItem('access_token');
        
        if (!token) {
            console.warn('Usuario no autenticado. Redirigiendo al login...');
            // Lanza el redirect de sveltekit hacia /login
            throw redirect(302, '/login');
        }
    }
    
    return {};
};
