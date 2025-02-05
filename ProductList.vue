<template>
    <div>
      <FilterBar @filter="applyFilter" />
      <div class="grid grid-cols-3 gap-4">
        <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
      </div>
    </div>
  </template>
  
  <script>
  import ProductCard from "@/components/ProductCard.vue";
  import FilterBar from "@/components/FilterBar.vue";
  
  export default {
    components: { ProductCard, FilterBar },

    data() {
      return {
        products: [
             // add some new products   
             { id: 1, name: "Laptop", price: 1200, category: "Electronics" },
          { id: 2, name: "Shoes", price: 80, category: "Fashion" },
          { id: 3, name: "Phone", price: 800, category: "Electronics" },
          { id: 4, name: "Headphones", price: 150, category: "Electronics" },
          { id: 5, name: "T-shirt", price: 25, category: "Fashion" },
          { id: 6, name: "Watch", price: 300, category: "Accessories" },
          { id: 7, name: "Backpack", price: 60, category: "Accessories" },
          { id: 8, name: "Tablet", price: 500, category: "Electronics" },
          { id: 9, name: "Jeans", price: 70, category: "Fashion" }
        ],
        filteredProducts: [],
      };
    },
    methods: {
      applyFilter(category) {
        this.filteredProducts = this.filterProductsByCategory(category);
      },
      filterProductsByCategory(category) {
        return category 
          ? this.products.filter(product => product.category === category)
          : this.products;
      }
    },
    created() {
      this.applyFilter(); // Initialize with all products
    },
  };
  </script>
  
  