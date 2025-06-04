<template>
  <div class="vista-general">
    <div class="page-header">
      <h2>Vista General</h2>
      <p class="subtitle">Gestión de usuarios y roles del sistema</p>
    </div>

    <div class="secciones">
      <div class="seccion">
        <div class="seccion-header">
          <h3><i class="fas fa-users"></i> Usuarios</h3>
          <router-link to="/usuarios" class="btn btn-primary">
            <i class="fas fa-plus"></i> Nuevo Usuario
          </router-link>
        </div>
        <div class="card">
          <div v-if="loading.users" class="loading">
            <i class="fas fa-spinner fa-spin"></i> Cargando usuarios...
          </div>
          <div v-else-if="users.length === 0" class="no-data">
            <i class="fas fa-users-slash"></i>
            <p>No hay usuarios registrados</p>
          </div>
          <div v-else class="tabla-container">
            <table class="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Identificación</th>
                  <th>Correo</th>
                  <th>Rol</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user._id">
                  <td>{{ user.name }}</td>
                  <td>{{ user.lastname }}</td>
                  <td>{{ user.identification }}</td>
                  <td>{{ user.email }}</td>
                  <td>
                    <span class="badge">{{ user.role }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="seccion">
        <div class="seccion-header">
          <h3><i class="fas fa-user-tag"></i> Roles</h3>
          <router-link to="/roles" class="btn btn-primary">
            <i class="fas fa-plus"></i> Nuevo Rol
          </router-link>
        </div>
        <div class="card">
          <div v-if="loading.roles" class="loading">
            <i class="fas fa-spinner fa-spin"></i> Cargando roles...
          </div>
          <div v-else-if="roles.length === 0" class="no-data">
            <i class="fas fa-tags"></i>
            <p>No hay roles registrados</p>
          </div>
          <div v-else class="tabla-container">
            <table class="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Permisos</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="rol in roles" :key="rol._id">
                  <td>{{ rol.name }}</td>
                  <td>{{ rol.description }}</td>
                  <td>
                    <span class="badge badge-success">
                      {{ rol.permissions.join(', ') }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div v-if="mensaje" :class="['alert', `alert-${mensaje.tipo}`]">
      {{ mensaje.texto }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { API_ENDPOINTS } from '../config';

export default {
  name: 'VistaGeneral',
  data() {
    return {
      users: [],
      roles: [],
      loading: {
        users: false,
        roles: false
      },
      mensaje: null
    }
  },
  async created() {
    await Promise.all([
      this.cargarUsuarios(),
      this.cargarRoles()
    ]);
  },
  methods: {
    async cargarUsuarios() {
      this.loading.users = true;
      try {
        const response = await axios.get(API_ENDPOINTS.USERS);
        this.users = response.data;
      } catch (error) {
        let mensajeError = 'Error al cargar los usuarios';
        
        if (error.code === 'ERR_NETWORK') {
          mensajeError = 'No se pudo conectar con el servidor. Por favor, verifica que el servidor esté corriendo.';
        } else if (error.response) {
          mensajeError = error.response.data?.message || mensajeError;
        }
        
        this.mostrarMensaje(mensajeError, 'error');
        console.error('Error al cargar usuarios:', error);
      } finally {
        this.loading.users = false;
      }
    },
    async cargarRoles() {
      this.loading.roles = true;
      try {
        const response = await axios.get(API_ENDPOINTS.ROLES);
        this.roles = response.data;
      } catch (error) {
        let mensajeError = 'Error al cargar los roles';
        
        if (error.code === 'ERR_NETWORK') {
          mensajeError = 'No se pudo conectar con el servidor. Por favor, verifica que el servidor esté corriendo.';
        } else if (error.response) {
          mensajeError = error.response.data?.message || mensajeError;
        }
        
        this.mostrarMensaje(mensajeError, 'error');
        console.error('Error al cargar roles:', error);
      } finally {
        this.loading.roles = false;
      }
    },
    mostrarMensaje(texto, tipo) {
      this.mensaje = { texto, tipo };
      setTimeout(() => {
        this.mensaje = null;
      }, 5000);
    }
  }
}
</script>

<style scoped>
.vista-general {
  padding: 1rem 0;
}

.page-header {
  margin-bottom: 2rem;
  text-align: center;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
}

.secciones {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.seccion {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
}

.seccion-header {
  padding: 1.5rem;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.seccion-header h3 {
  color: white;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card {
  padding: 0;
  margin: 0;
  box-shadow: none;
}

.tabla-container {
  overflow-x: auto;
  padding: 1rem;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: var(--light-color);
  color: var(--dark-color);
}

.badge-success {
  background-color: var(--success-color);
  color: white;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 2rem;
  color: var(--primary-color);
}

.no-data {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.no-data i {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #ccc;
}

.alert {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: var(--border-radius);
  text-align: center;
}

.alert-exito {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.alert-error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>