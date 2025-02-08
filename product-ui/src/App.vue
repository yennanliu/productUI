<template>
  <div id="app">
    <!-- Simple Header -->
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
          <router-link to="/about">About</router-link>
          <router-link to="/faq">FAQ</router-link>
          <router-link to="/admin">Admin</router-link>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main>
      <router-view/>
    </main>

    <!-- Simple Footer -->
    <footer class="footer">
      <div class="footer-content">
        <p>&copy; 2024 TechMart. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
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

/* Responsive Design */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 15px;
  }

  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
  }

  main {
    padding: 20px;
  }
}
</style>
