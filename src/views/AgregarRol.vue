<template>
    <div class="agregar-rol">
        <h2>Agregar Rol</h2>
        <form @submit.prevent="agregarRol">
            <div class="form-group">
                <label for="nombre">Nombre del Rol:</label>
                <input type="text" id="nombre" v-model="rol.nombre" required>
            </div>
            <div class="form-group">
                <label for="descripcion">Descripción:</label>
                <input type="text" id="descripcion" v-model="rol.descripcion" required>
            </div>
            <button type="submit" :disabled="loading">
                {{ loading ? 'Agregando...' : 'Agregar Rol' }}
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
    name: 'AgregarRol',
    data() {
        return {
            rol: {
                nombre: '',
                descripcion: ''
            },
            loading: false,
            mensaje: null
        }
    },
    methods: {
        async agregarRol() {
            this.loading = true;
            this.mensaje = null;
            
            try {
                await axios.post(API_ENDPOINTS.ROLES, {
                    name: this.rol.nombre,
                    description: this.rol.descripcion,
                    permissions: ['all'] // Por defecto, todos los roles tienen acceso total
                });

                this.mostrarMensaje('Rol agregado exitosamente', 'exito');
                this.limpiarFormulario();
            } catch (error) {
                let mensajeError = 'Error al agregar el rol';
                
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
            this.rol = {
                nombre: '',
                descripcion: ''
            };
        }
    }
}
</script>

<style scoped>
.agregar-rol {
    padding: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input {
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