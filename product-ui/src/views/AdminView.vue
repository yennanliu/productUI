<template>
  <div class="admin-dashboard">
    <div class="admin-sidebar">
      <div class="admin-profile">
        <div class="profile-image">
          <i class="fas fa-user-circle"></i>
        </div>
        <div class="profile-info">
          <h3>Admin User</h3>
          <p>admin@techmart.com</p>
        </div>
      </div>
      
      <nav class="admin-nav">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          :class="{ active: currentTab === tab.id }"
          @click="currentTab = tab.id"
        >
          <i :class="tab.icon"></i>
          {{ tab.name }}
        </button>
      </nav>
    </div>

    <div class="admin-content">
      <!-- Dashboard Overview -->
      <div v-if="currentTab === 'dashboard'" class="dashboard-panel">
        <h2>Dashboard</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <h3>Total Products</h3>
            <p class="stat-number">{{ totalProducts }}</p>
          </div>
          <div class="stat-card">
            <h3>Categories</h3>
            <p class="stat-number">{{ categories.length }}</p>
          </div>
          <div class="stat-card">
            <h3>Active Users</h3>
            <p class="stat-number">245</p>
          </div>
        </div>
      </div>

      <!-- Profile Settings -->
      <div v-if="currentTab === 'profile'" class="profile-panel">
        <h2>Profile Settings</h2>
        <form @submit.prevent="updateProfile" class="settings-form">
          <div class="form-group">
            <label>Name</label>
            <input type="text" v-model="profile.name">
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" v-model="profile.email">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter new password">
          </div>
          <button type="submit" class="save-button">Save Changes</button>
        </form>
      </div>

      <!-- Product Management -->
      <div v-if="currentTab === 'products'" class="products-panel">
        <h2>Product Management</h2>
        <div class="product-controls">
          <button class="add-button">
            <i class="fas fa-plus"></i> Add New Product
          </button>
          <input 
            type="text" 
            placeholder="Search products..."
            v-model="productSearch"
          >
        </div>
        <div class="product-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in filteredProducts" :key="product.id">
                <td>{{ product.id }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.category }}</td>
                <td>${{ product.price }}</td>
                <td class="actions">
                  <button class="edit-btn">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="delete-btn">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productData from '@/assets/data/products.json'

export default {
  name: 'AdminView',
  data() {
    return {
      currentTab: 'dashboard',
      tabs: [
        { id: 'dashboard', name: 'Dashboard', icon: 'fas fa-tachometer-alt' },
        { id: 'profile', name: 'Profile', icon: 'fas fa-user' },
        { id: 'products', name: 'Products', icon: 'fas fa-box' }
      ],
      profile: {
        name: 'Admin User',
        email: 'admin@techmart.com'
      },
      products: productData.products,
      productSearch: ''
    }
  },
  computed: {
    totalProducts() {
      return this.products.length
    },
    categories() {
      return [...new Set(this.products.map(p => p.category))]
    },
    filteredProducts() {
      return this.products.filter(p => 
        p.name.toLowerCase().includes(this.productSearch.toLowerCase()) ||
        p.category.toLowerCase().includes(this.productSearch.toLowerCase())
      )
    }
  },
  methods: {
    updateProfile() {
      // Implement profile update logic
      alert('Profile updated successfully!')
    }
  }
}
</script>

<style scoped>
.admin-dashboard {
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: calc(100vh - 80px);
  background-color: #f8f9fa;
}

.admin-sidebar {
  background-color: white;
  padding: 30px 20px;
  border-right: 1px solid #eee;
}

.admin-profile {
  display: flex;
  align-items: center;
  gap: 15px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}

.profile-image i {
  font-size: 2.5em;
  color: #42b883;
}

.profile-info h3 {
  margin: 0;
  color: #2B3647;
}

.profile-info p {
  margin: 5px 0 0;
  color: #666;
  font-size: 0.9em;
}

.admin-nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.admin-nav button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 15px;
  border: none;
  background: none;
  color: #2B3647;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s;
  text-align: left;
  width: 100%;
}

.admin-nav button.active {
  background-color: #42b883;
  color: white;
}

.admin-content {
  padding: 30px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.stat-number {
  font-size: 2em;
  color: #42b883;
  font-weight: bold;
  margin-top: 10px;
}

.settings-form {
  max-width: 500px;
  margin-top: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #2B3647;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.save-button {
  background: #42b883;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
}

.product-controls {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  gap: 20px;
}

.add-button {
  background: #42b883;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.product-controls input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  width: 300px;
}

.product-table {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
}

.actions {
  display: flex;
  gap: 10px;
}

.edit-btn, .delete-btn {
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
}

.edit-btn {
  background-color: #42b883;
  color: white;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

@media (max-width: 768px) {
  .admin-dashboard {
    grid-template-columns: 1fr;
  }

  .admin-sidebar {
    display: none;
  }
}
</style> 