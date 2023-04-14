<template>
<nav class="mt-3" aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item">
        <router-link to="/search">Author and Book Search</router-link>

    </li>
    <li class="breadcrumb-item">
        <router-link to="/search/genre">Genre Search</router-link>
    </li>
    <li class="breadcrumb-item">
        <router-link to="/search/review">Review Search</router-link>
    </li>
  </ol>
</nav>
</template>
<script>
export default {
    name: "searchBreadcrumb"
}
</script>
<style lang="">
    
</style>