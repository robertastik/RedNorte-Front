<script lang="ts">
    import { page } from '$app/state';
    
    // Un header simple, ideal para notificaciones, búsqueda rápida o un breadcrumb
    // let { userProfile } = $props();
</script>

<header class="h-16 px-6 bg-white border-b border-gray-200 flex items-center justify-between sticky top-0 z-10 w-full shrink-0">
    <div class="flex items-center flex-1">
        <h1 class="text-xl font-semibold text-slate-800 hidden md:block">Centro de Control</h1>
        <!-- Botón menú hamburguesa en mobile (dummy por ahora) -->
        <button class="md:hidden text-gray-500 hover:text-gray-700">
            ☰
        </button>
    </div>

    <!-- Acciones Header (Ej: Notificaciones o Perfil) -->
    <div class="flex items-center gap-4">
        <div class="relative">
            <button class="text-gray-400 hover:text-slate-600 focus:outline-none">
                🔔
            </button>
        </div>
        
        <div class="border-l pl-4 border-gray-200 hidden md:flex flex-col text-right">
            <span class="text-xs text-gray-500 font-medium">{new Date().toLocaleDateString()}</span>
            <span class="text-sm font-semibold text-slate-700">Turno Mañana</span>
        </div>
    </div>
</header>
