<script setup>
import { RouterView } from "vue-router";
import { onMounted } from "vue";

import NavMenu from "./components/NavMenuCmp.vue";
import { useStore } from "vuex";
import {KOSIK_LS_KEY} from "@/constants/constants";

const store = useStore();
const getTermsData = () => store.dispatch("getTermsData");
const setDataFromLS = () => {
  const lsData = JSON.parse(localStorage.getItem(KOSIK_LS_KEY));

  if (lsData && lsData.data) {
    store.commit("setSearchResults", lsData.data);
  }
};

onMounted(() => {
  setDataFromLS();
  getTermsData();
});
</script>

<template>
  <header>
    <NavMenu />
  </header>
  <main>
    <div class="container">
      <RouterView />
    </div>
  </main>
</template>
