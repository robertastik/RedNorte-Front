<script lang="ts">
    import { page } from '$app/state';
    import { auth } from '$lib/stores/auth';
    import { get } from 'svelte/store';
    
    // Estado reactivo para los datos del usuario logueado
    let userStore = $state(get(auth));
    
    $effect(() => {
        const unsubscribe = auth.subscribe(val => {
            userStore = val;
        });
        return unsubscribe;
    });
</script>

<aside class="w-64 h-screen bg-white border-r border-gray-200 flex flex-col hidden md:flex">
    <!-- Logo o Brand -->
    <div class="h-16 flex items-center px-6 border-b border-gray-200">
        <span class="text-xl font-bold text-slate-800">🏥 RedNorte Admin</span>
    </div>

    <!-- Navegación -->
    <nav class="flex-1 overflow-y-auto py-4">
        <ul class="space-y-1 px-3">
            <li>
                <a 
                    // eslint-disable-next-line svelte/no-navigation-without-resolve
                    href="/dashboard"
                    class="flex items-center px-3 py-2 text-sm font-medium rounded-md {page.url.pathname === '/dashboard' ? 'bg-slate-100 text-slate-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}"
                >
                    Dashboard General
                </a>
            </li>
            <li>
                <a 
                    href="/citas"
                    class="flex items-center px-3 py-2 text-sm font-medium rounded-md {page.url.pathname.startsWith('/citas') ? 'bg-slate-100 text-slate-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}"
                >
                    Gestión de Citas
                </a>
            </li>
            <!-- Elementos futuros -->
            <li>
                <a 
                    href="/pacientes"
                    class="flex items-center px-3 py-2 text-sm font-medium rounded-md {page.url.pathname.startsWith('/pacientes') ? 'bg-slate-100 text-slate-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}"
                >
                    Pacientes
                </a>
            </li>
        </ul>
    </nav>

    <!-- Footer Sidebar / Current User -->
    <div class="p-4 border-t border-gray-200">
        <div class="flex items-center justify-between w-full">
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-semibold text-slate-600 shrink-0">
                    {userStore.user?.nombre?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div class="flex flex-col truncate w-32">
                    <span class="text-sm font-medium text-slate-900 truncate" title={userStore.user?.nombre || 'Usuario'}>{userStore.user?.nombre || 'Administrador'}</span>
                    <span class="text-xs text-gray-500 capitalize">{userStore.user?.rol?.toLowerCase() || 'Staff'}</span>
                </div>
            </div>
            
            <button 
                onclick={() => { auth.logout(); window.location.href = '/login'; }}
                class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition"
                title="Cerrar sesión"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            </button>
        </div>
    </div>
</aside>
