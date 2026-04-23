export type PrioridadCita = 1 | 2 | 3 | 4 | 5; // Ejemplo: 1 (Baja) a 5 (Alta)

export interface CitaBase {
    id?: string;
    pacienteId: string;
    motivo: string;
    prioridad: PrioridadCita;
    fechaCreacion?: string;
    estado?: "PENDIENTE" | "CONFIRMADA" | "CANCELADA" | "COMPLETADA";
}

export interface Consulta extends CitaBase {
    especialidad: string;
    modalidad: "PRESENCIAL" | "TELEMEDICINA";
}

export interface Cirugia extends CitaBase {
    tipoProcedimiento: string;
    requiereHospitalizacion: boolean;
}

export interface Diagnostico extends CitaBase {
    tipoExamen: string;
    indicacionesPrevias: string;
}

// Tipo de unión para peticiones generalizadas si es necesario
export type CitaMedica = Consulta | Cirugia | Diagnostico;
