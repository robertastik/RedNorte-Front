<script lang="ts">
    import { page } from '$app/state';
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
        <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-semibold text-slate-600">
                A
            </div>
            <div class="flex flex-col">
                <span class="text-sm font-medium text-slate-900">Admin Hospital</span>
                <span class="text-xs text-gray-500">Recepción General</span>
            </div>
        </div>
    </div>
</aside>
