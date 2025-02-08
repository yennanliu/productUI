<template>
  <div class="compare">
    <h1>Compare Products</h1>
    <div class="compare-container">
      <div class="product-selectors">
        <div class="product-select">
          <select v-model="product1" @change="updateComparison">
            <option value="">Select Product 1</option>
            <option v-for="product in products" :key="'1-'+product.id" :value="product">
              {{ product.name }}
            </option>
          </select>
        </div>
        <div class="product-select">
          <select v-model="product2" @change="updateComparison">
            <option value="">Select Product 2</option>
            <option v-for="product in products" :key="'2-'+product.id" :value="product">
              {{ product.name }}
            </option>
          </select>
        </div>
      </div>

      <div v-if="product1 && product2" class="comparison-table">
        <table>
          <tr>
            <th>Feature</th>
            <th>{{ product1.name }}</th>
            <th>{{ product2.name }}</th>
          </tr>
          <tr>
            <td>Price</td>
            <td>${{ product1.price }}</td>
            <td>${{ product2.price }}</td>
          </tr>
          <tr>
            <td>Category</td>
            <td>{{ product1.category }}</td>
            <td>{{ product2.category }}</td>
          </tr>
          <tr>
            <td>Features</td>
            <td>
              <ul>
                <li v-for="(feature, index) in product1.features" :key="'1-'+index">
                  {{ feature }}
                </li>
              </ul>
            </td>
            <td>
              <ul>
                <li v-for="(feature, index) in product2.features" :key="'2-'+index">
                  {{ feature }}
                </li>
              </ul>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import productData from '@/assets/data/products.json'

export default {
  name: 'CompareView',
  data() {
    return {
      products: productData.products,
      product1: null,
      product2: null
    }
  },
  methods: {
    updateComparison() {
      // Future enhancement: save comparison to localStorage
    }
  }
}
</script>

<style scoped>
.compare {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.product-selectors {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px 0;
}

select {
  width: 100%;
  padding: 10px;
  border: 1px solid #42b883;
  border-radius: 4px;
}

.comparison-table {
  margin-top: 30px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 15px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #42b883;
  color: white;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 5px 0;
}

@media (max-width: 768px) {
  .product-selectors {
    grid-template-columns: 1fr;
  }
}
</style> 