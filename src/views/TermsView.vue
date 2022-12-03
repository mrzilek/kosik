<script setup>
import {computed} from "vue";
import {useStore} from "vuex";

const store = useStore();
const terms = computed(() => store.getters.getTermsData);
</script>

<template>
  <h1 class="mb-3">Terms conditions</h1>
  <ul>
    <li v-for="(termItem, termIndex) in terms" :key="termIndex">
      {{ termItem }}
    </li>
  </ul>
</template>
