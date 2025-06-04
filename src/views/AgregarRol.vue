<template>
    <div class="agregar-rol">
        <h2>Agregar Nuevo Rol</h2>
        <form @submit.prevent="agregarRol" class="rol-form">
            <div class="form-group">
                <label for="nombre">Nombre del Rol:</label>
                <input type="text" id="nombre" v-model="rol.name" required class="form-control">
            </div>

            <div class="form-group">
                <label for="descripcion">Descripción:</label>
                <input type="text" id="descripcion" v-model="rol.description" required class="form-control">
            </div>

            <div class="form-group">
                <label>Permisos:</label>
                <div class="permisos-grid">
                    <div v-for="perm in permisosDisponibles" :key="perm" class="permiso-item">
                        <div class="permiso-header">
                            <label class="checkbox-label">
                                <input type="checkbox" :value="perm" v-model="rol.permissions">
                                <span>{{ perm }}</span>
                            </label>
                            <span class="tooltip">{{ permisosInfo[perm] }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-actions">
                <button type="submit" class="btn-submit">Guardar Rol</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import { API_ENDPOINTS } from '../config'

export default {
    name: 'AgregarRol',
    data() {
        return {
            rol: {
                name: '',
                description: '',
                permissions: []
            },
            permisosDisponibles: [
                "All",
                "Manage_users",
                "View_reports",
                "Edit_content",
                "Moderate_content",
                "Restrict_users",
                "Create_content",
                "Publish_content",
                "View_content",
                "Create_comments",
                "Purchase",
                "View_public_content",
                "View_products",
                "Make_orders",
                "View_order_history"
            ],
            permisosInfo: {
                All: "Acceso completo al sistema",
                Manage_users: "Permite gestionar usuarios",
                View_reports: "Permite ver reportes",
                Edit_content: "Permite editar contenido",
                Moderate_content: "Permite moderar contenido de usuarios",
                Restrict_users: "Puede restringir acceso de usuarios",
                Create_content: "Permite crear contenido nuevo",
                Publish_content: "Puede publicar contenido",
                View_content: "Puede ver contenido completo",
                Create_comments: "Puede comentar contenido",
                Purchase: "Puede realizar compras",
                View_public_content: "Solo puede ver contenido público",
                View_products: "Puede ver productos disponibles",
                Make_orders: "Puede realizar pedidos",
                View_order_history: "Puede ver historial de compras"
            },
            loading: false,
            mensaje: null
        }
    },
    methods: {
        async agregarRol() {
            this.loading = true
            this.mensaje = null

            try {
                const response = await axios.post(API_ENDPOINTS.ROLES, this.rol);
                console.log('Rol agregado:', response.data);
                this.rol = {
                    name: '',
                    description: '',
                    permissions: []
                };
                this.mensaje = {
                    tipo: 'exito',
                    texto: 'Rol agregado exitosamente.'
                }
            } catch (error) {
                console.error('Error al agregar el rol:', error);
                this.mensaje = {
                    tipo: 'error',
                    texto: 'Error al agregar el rol. Intenta nuevamente.'
                }
            } finally {
                this.loading = false
            }
        }
    }
}
</script>

<style scoped>
.agregar-rol {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
    color: var(--text-color);
    margin-bottom: 2rem;
    font-weight: 600;
}

.rol-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

label {
    font-weight: 500;
    color: var(--text-color);
}

.form-control {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: var(--border-radius);
    font-size: 1rem;
    transition: var(--transition);
}

.form-control:focus {
    border-color: var(--secondary-color);
    outline: none;
    box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.1);
}

.permisos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
}

.permiso-item {
    background: #f8f9fa;
    border-radius: var(--border-radius);
    padding: 1rem;
    border: 1px solid #eee;
    position: relative;
}

.permiso-header {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    padding: 0.5rem;
    background: white;
    border-radius: var(--border-radius);
    transition: var(--transition);
    flex: 1;
}

.checkbox-label:hover {
    background: #f1f2f6;
}

.checkbox-label input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
}

.tooltip {
    visibility: hidden;
    background-color: #333;
    color: #fff;
    text-align: left;
    border-radius: 6px;
    padding: 8px 12px;
    position: absolute;
    z-index: 1;
    bottom: 100%;
    left: 0;
    margin-bottom: 5px;
    opacity: 0;
    transition: opacity 0.3s;
    width: 250px;
    font-size: 0.875rem;
    line-height: 1.4;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.permiso-item:hover .tooltip {
    visibility: visible;
    opacity: 1;
}

.form-actions {
    margin-top: 1rem;
}

.btn-submit {
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: var(--border-radius);
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    font-weight: 500;
    transition: var(--transition);
    width: 100%;
}

.btn-submit:hover {
    background: #34495e;
}

@media (max-width: 768px) {
    .agregar-rol {
        padding: 1rem;
    }

    .permisos-grid {
        grid-template-columns: 1fr;
    }
}
</style>