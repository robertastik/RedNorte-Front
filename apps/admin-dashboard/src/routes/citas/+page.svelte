<script lang="ts">
    import type { PageData } from './$types';
    import { onMount } from 'svelte';

    let { data } = $props<{ data: PageData }>();

    // data.citas viene de carga inicial.
    let citas = $state(data.citas);
    let filterPrioridad = $state<number | null>(null);

    // Helpers para colorear estados y prioridades
    const getPrioridadColor = (p: number) => {
        if (p >= 4) return 'bg-red-100 text-red-700';
        if (p === 3) return 'bg-orange-100 text-orange-700';
        return 'bg-green-100 text-green-700';
    };

    const getEstadoColor = (estado?: string) => {
        switch (estado) {
            case 'PENDIENTE': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'CONFIRMADA': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'CANCELADA': return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'COMPLETADA': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            default: return 'bg-slate-100 text-slate-800';
        }
    };
    
    // UI mock datos de respaldo en caso de que la api falle
    const dummyCitas = [
        { id: '1', pacienteId: 'p-100', motivo: 'Dolor Abdominal', prioridad: 4, estado: 'PENDIENTE', modalidad: 'PRESENCIAL', especialidad: 'Medicina General' },
        { id: '2', pacienteId: 'p-101', motivo: 'Examen de Sangre', prioridad: 1, estado: 'CONFIRMADA', tipoExamen: 'Laboratorio' },
        { id: '3', pacienteId: 'p-102', motivo: 'Apendicectomía', prioridad: 5, estado: 'COMPLETADA', requiereHospitalizacion: true, tipoProcedimiento: 'Quirúrgico' },
    ];
    
    if (citas.length === 0) {
        citas = dummyCitas as any;
    }
</script>

<svelte:head>
    <title>Gestión de Citas - RedNorte Admin</title>
</svelte:head>

<div class="space-y-6">
    <!-- Header Page -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Listado de Citas</h1>
            <p class="text-sm text-slate-500">Panel centralizado para administrar consultas, diagnósticos y cirugías.</p>
        </div>
        
        <div class="flex items-center space-x-3">
            <button class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition">
                Filtrar
            </button>
            <button class="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition">
                + Nueva Cita
            </button>
        </div>
    </div>

    <!-- Data Table Card -->
    <div class="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-slate-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                            ID/Paciente
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                            Motivo
                        </th>
                        <th scope="col" class="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wide">
                            Prioridad
                        </th>
                        <th scope="col" class="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wide">
                            Estado
                        </th>
                        <th scope="col" class="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                    {#each citas as cita}
                        <tr class="hover:bg-slate-50/50 transition duration-150">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="ml-4">
                                        <div class="text-sm font-medium text-slate-900">{cita.pacienteId}</div>
                                        <div class="text-xs text-slate-500">Ref: {cita.id?.slice(0, 8) || 'N/A'}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-sm text-slate-900">{cita.motivo}</div>
                                <div class="text-xs text-slate-500 line-clamp-1">
                                    {#if 'especialidad' in cita} Consulta: {cita.especialidad} - {cita.modalidad} {/if}
                                    {#if 'tipoProcedimiento' in cita} Cirugía: {cita.tipoProcedimiento} {/if}
                                    {#if 'tipoExamen' in cita} Examen: {cita.tipoExamen} {/if}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-center">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {getPrioridadColor(cita.prioridad)}">
                                    Nivel {cita.prioridad}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-center">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border {getEstadoColor(cita.estado)}">
                                    {cita.estado || 'SIN ESTADO'}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button class="text-blue-600 hover:text-blue-900 mr-3">Ver</button>
                                <button class="text-gray-400 hover:text-red-600 transition">Eliminar</button>
                            </td>
                        </tr>
                    {/each}
                    
                    {#if citas.length === 0}
                        <tr>
                            <td colspan="5" class="px-6 py-10 text-center text-slate-500 text-sm">
                                No se encontraron citas recientes.
                            </td>
                        </tr>
                    {/if}
                </tbody>
            </table>
        </div>
        
        <!-- Pagination Dummy -->
        <div class="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between sm:px-6">
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p class="text-sm text-gray-700">
                        Mostrando <span class="font-medium">1</span> a <span class="font-medium">{citas.length}</span> de <span class="font-medium">{citas.length}</span> resultados
                    </p>
                </div>
                <div>
                    <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <span>Anterior</span>
                        </button>
                        <button class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <span>Siguiente</span>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</div>
