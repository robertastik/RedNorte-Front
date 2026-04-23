import type { PageLoad } from './$types';
import { citasApi } from '$lib/api/citas.api';
import type { CitaMedica } from '$lib/types/citas';

export const load: PageLoad = async () => {
    try {
        // En un entorno de SSR, el fetch interno es inyectado automático, 
        // pero aquí estamos delegando a nuestro client.
        // Dado que usamos SvelteKit en default config, getCitas puede tirar el fetch normal o lo wrapeado
        const citas = await citasApi.getAll();
        return {
            citas
        };
    } catch (error) {
        console.error('Error fetching citas', error);
        // Retornamos array vacío para que no rompa el dashboard y se pueda mostrar Empty State
        return {
            citas: [] as CitaMedica[]
        };
    }
};
