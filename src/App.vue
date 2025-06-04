<template>
  <div class="app">
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <img src="./assets/logo.png" alt="Logo" class="logo" />
          <h1>Gestor de Usuarios</h1>
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
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

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
  gap: 1rem;
}

.logo {
  height: 100px;
  width: auto;
}

.navbar-brand h1 {
  color: white;
  margin: 0;
  font-size: 1.5rem;
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
</style>