<template>
  <div id="app">
    <!-- Left Sidebar -->
    <div class="sidebar" :class="{ 'sidebar-open': isSidebarOpen }">
      <div class="sidebar-header">
        <div class="logo-small" @click="$router.push('/')">
          <span>TM</span>
        </div>
        <button class="toggle-button" @click="toggleSidebar">
          <i class="fas" :class="isSidebarOpen ? 'fa-times' : 'fa-bars'"></i>
        </button>
      </div>
      
      <nav class="sidebar-nav">
        <router-link to="/" class="nav-item">
          <i class="fas fa-home"></i>
          <span>Home</span>
        </router-link>
        <router-link to="/productList" class="nav-item">
          <i class="fas fa-box"></i>
          <span>Products</span>
        </router-link>
        <router-link to="/search" class="nav-item">
          <i class="fas fa-search"></i>
          <span>Search</span>
        </router-link>
        <router-link to="/compare" class="nav-item">
          <i class="fas fa-exchange-alt"></i>
          <span>Compare</span>
        </router-link>
        <router-link to="/admin" class="nav-item">
          <i class="fas fa-user-shield"></i>
          <span>Admin</span>
        </router-link>
        <router-link to="/about" class="nav-item">
          <i class="fas fa-info-circle"></i>
          <span>About</span>
        </router-link>
        <router-link to="/faq" class="nav-item">
          <i class="fas fa-question-circle"></i>
          <span>FAQ</span>
        </router-link>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="main-container" :class="{ 'sidebar-open': isSidebarOpen }">
      <header class="header">
        <div class="header-content">
          <div class="logo" @click="$router.push('/')">
            <span>TechMart</span>
          </div>
          <nav class="nav-links">
            <router-link to="/">Home</router-link>
            <router-link to="/productList">Products</router-link>
            <router-link to="/search">Search</router-link>
            <router-link to="/compare">Compare</router-link>
            <router-link to="/admin">Admin</router-link>
            <router-link to="/about">About</router-link>
            <router-link to="/faq">FAQ</router-link>
          </nav>
        </div>
      </header>

      <main>
        <router-view/>
      </main>

      <footer class="footer">
        <div class="footer-content">
          <p>&copy; 2024 TechMart. All rights reserved.</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isSidebarOpen: true
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header Styles */
.header {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5em;
  font-weight: bold;
  color: #42b883;
  cursor: pointer;
}

.nav-links {
  display: flex;
  gap: 30px;
}

.nav-links a {
  color: #2c3e50;
  text-decoration: none;
  font-weight: 500;
  padding: 5px 0;
  position: relative;
}

.nav-links a:after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #42b883;
  transform: scaleX(0);
  transition: transform 0.3s;
}

.nav-links a:hover:after,
.nav-links a.router-link-active:after {
  transform: scaleX(1);
}

/* Main Content */
main {
  flex: 1;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  padding: 40px 20px;
}

/* Footer Styles */
.footer {
  background-color: white;
  padding: 20px;
  text-align: center;
  box-shadow: 0 -2px 4px rgba(0,0,0,0.1);
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  color: #2c3e50;
}

/* Sidebar Styles */
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  background-color: white;
  width: 250px;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  z-index: 1000;
}

.sidebar.sidebar-open {
  transform: translateX(0);
}

.sidebar:not(.sidebar-open) {
  transform: translateX(-200px);
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.logo-small {
  font-size: 1.5em;
  font-weight: bold;
  color: #42b883;
  cursor: pointer;
}

.toggle-button {
  background: none;
  border: none;
  font-size: 1.2em;
  color: #2c3e50;
  cursor: pointer;
  padding: 5px;
}

.sidebar-nav {
  padding: 20px 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: #2c3e50;
  text-decoration: none;
  transition: background-color 0.3s;
  gap: 15px;
}

.nav-item i {
  width: 20px;
  text-align: center;
}

.nav-item:hover {
  background-color: #f5f5f5;
}

.nav-item.router-link-active {
  background-color: #42b883;
  color: white;
}

/* Main Container Styles */
.main-container {
  margin-left: 250px;
  transition: margin-left 0.3s ease;
}

.main-container:not(.sidebar-open) {
  margin-left: 50px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }
  
  .sidebar.sidebar-open {
    transform: translateX(0);
  }
  
  .main-container {
    margin-left: 0 !important;
  }
  
  .header-content {
    padding: 0 20px;
  }
}
</style>
