<template>
  <div class="mb-4">
    <select 
      class="p-2 border rounded"
      @change="$emit('filter', $event.target.value)"
    >
      <option value="">All Categories</option>
      <option v-for="category in categories" 
              :key="category" 
              :value="category">
        {{ category }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  }
}
</script> 