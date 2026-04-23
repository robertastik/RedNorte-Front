import { apiFetch } from './client';
import type { CitaMedica, Consulta, Cirugia, Diagnostico } from '../types/citas';

const BASE_PATH = '/citas';

export const citasApi = {
    /**
     * Obtener el listado general de todas las citas paginadas.
     */
    getAll: async (): Promise<CitaMedica[]> => {
        return apiFetch<CitaMedica[]>(BASE_PATH, { method: 'GET' });
    },

    /**
     * Crear una Cita de tipo Consulta
     */
    crearConsulta: async (data: Consulta): Promise<Consulta> => {
        return apiFetch<Consulta>(`${BASE_PATH}/consulta`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    /**
     * Crear una Cita de tipo Cirugía
     */
    crearCirugia: async (data: Cirugia): Promise<Cirugia> => {
        return apiFetch<Cirugia>(`${BASE_PATH}/cirugia`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    /**
     * Crear una Cita de tipo Diagnóstico
     */
    crearDiagnostico: async (data: Diagnostico): Promise<Diagnostico> => {
        return apiFetch<Diagnostico>(`${BASE_PATH}/diagnostico`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
};
