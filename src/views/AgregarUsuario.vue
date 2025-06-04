<template>
    <div class="agregar-usuario">
        <h2>Agregar Usuario</h2>
        <form @submit.prevent="agregarUsuario">
            <div class="form-group">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" v-model="usuario.nombre" required>
            </div>
            <div class="form-group">
                <label for="apellido">Apellido:</label>
                <input type="text" id="apellido" v-model="usuario.apellido" required>
            </div>
            <div class="form-group">
                <label for="identificacion">Identificación:</label>
                <input type="text" id="identificacion" v-model="usuario.identificacion" required>
            </div>
            <div class="form-group">
                <label for="email">Correo electrónico:</label>
                <input type="email" id="email" v-model="usuario.email" required>
            </div>
            <div class="form-group">
                <label for="rol">Rol:</label>
                <select id="rol" v-model="usuario.rol" required>
                    <option value="">Seleccione un rol</option>
                    <option v-for="rol in roles" :key="rol.id" :value="rol.name">
                        {{ rol.name }}
                    </option>
                </select>
            </div>
            <button type="submit" :disabled="loading">
                {{ loading ? 'Agregando...' : 'Agregar Usuario' }}
            </button>
        </form>
        <div v-if="mensaje" :class="['mensaje', mensaje.tipo]">
            {{ mensaje.texto }}
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { API_ENDPOINTS } from '../config';

export default {
    name: 'AgregarUsuario',
    data() {
        return {
            usuario: {
                nombre: '',
                apellido: '',
                identificacion: '',
                email: '',
                rol: ''
            },
            roles: [],
            loading: false,
            mensaje: null
        }
    },
    async created() {
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
            console.error('Error completo:', error);
        }
    },
    methods: {
        async agregarUsuario() {
            this.loading = true;
            this.mensaje = null;
            
            try {
                await axios.post(API_ENDPOINTS.USERS, {
                    nombre: this.usuario.nombre,
                    apellido: this.usuario.apellido,
                    identificacion: this.usuario.identificacion,
                    email: this.usuario.email,
                    rol: this.usuario.rol
                });

                this.mostrarMensaje('Usuario agregado exitosamente', 'exito');
                this.limpiarFormulario();
            } catch (error) {
                let mensajeError = 'Error al agregar el usuario';
                
                if (error.code === 'ERR_NETWORK') {
                    mensajeError = 'No se pudo conectar con el servidor. Por favor, verifica que el servidor esté corriendo.';
                } else if (error.response) {
                    mensajeError = error.response.data?.message || mensajeError;
                }
                
                this.mostrarMensaje(mensajeError, 'error');
                console.error('Error completo:', error);
            } finally {
                this.loading = false;
            }
        },
        mostrarMensaje(texto, tipo) {
            this.mensaje = { texto, tipo };
            setTimeout(() => {
                this.mensaje = null;
            }, 5000);
        },
        limpiarFormulario() {
            this.usuario = {
                nombre: '',
                apellido: '',
                identificacion: '',
                email: '',
                rol: ''
            };
        }
    }
}
</script>

<style scoped>
.agregar-usuario {
    padding: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input,
select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

button:hover:not(:disabled) {
    background-color: #45a049;
}

.mensaje {
    margin-top: 20px;
    padding: 10px;
    border-radius: 4px;
    text-align: center;
}

.mensaje.exito {
    background-color: #dff0d8;
    color: #3c763d;
    border: 1px solid #d6e9c6;
}

.mensaje.error {
    background-color: #f2dede;
    color: #a94442;
    border: 1px solid #ebccd1;
}
</style>