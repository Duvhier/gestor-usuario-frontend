<template>
  <div class="app">
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <div class="logo-container">
            <img src="@/assets/logo.png" alt="Logo" class="logo" />
            <h1>Gestor de Usuarios</h1>
          </div>
        </div>
        <div class="navbar-menu">
          <router-link to="/roles" class="nav-link">
            <i class="fas fa-user-tag"></i>
            Agregar Rol
          </router-link>
          <router-link to="/usuarios" class="nav-link">
            <i class="fas fa-user-plus"></i>
            Agregar Usuario
          </router-link>
          <router-link to="/vista" class="nav-link">
            <i class="fas fa-list"></i>
            Vista General
          </router-link>
        </div>
      </div>
    </nav>
    <main class="main-content">
      <div class="container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<style>
/* Importaciones deben ir primero */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

/* Aplicar Montserrat como fuente principal */
* {
  font-family: 'Montserrat', sans-serif;
}

:root {
  --primary-color: #2c3e50;
  --secondary-color: #42b983;
  --text-color: #2c3e50;
  --border-radius: 4px;
  --box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background-color: var(--primary-color);
  padding: 1rem 0;
  box-shadow: var(--box-shadow);
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  height: 40px;
  width: auto;
}

.navbar-brand h1 {
  color: white;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.navbar-menu {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.router-link-active {
  background-color: var(--secondary-color);
}

.main-content {
  flex: 1;
  padding: 2rem 0;
  background-color: #f5f6fa;
}

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
</style>