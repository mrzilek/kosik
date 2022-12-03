<script setup>
import { RouterLink } from "vue-router";

const menuItems = [
  { label: "Home page", url: "/" },
  { label: "List terms conditions", url: "/terms" },
  { label: "Trends list", url: "/list" },
];
</script>

<template>
  <div id="navMenu" class="nav-menu mb-5">
    <div class="container">
      <RouterLink
        v-for="(menuItem, index) in menuItems"
        :key="index"
        :to="menuItem.url"
        class="nav-item d-inline-block"
        :aria-label="menuItem.label">
        {{ menuItem.label }}
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav-menu {
  border-bottom: 1px solid #c4c4c4;

  .nav-item {
    text-decoration: none;
    padding: 20px 20px;

    &.router-link-active {
      background: #c4c4c4;
    }
  }
}
</style>
