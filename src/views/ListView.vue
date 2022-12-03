<script setup>
import {ref, computed, onMounted} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import ImageCmp from "@/components/ImageCmp.vue";
import {KOSIK_LS_KEY} from "@/constants/constants";

const router = useRouter();
const store = useStore();

let timer = ref(null);
let loadingData = ref(false);
let error = ref("");

const searchVal = ref("");
const searchResults = computed(() => store.getters.getSearchData);

const searchTimeOut = () => {
  if (timer.value) {
    clearTimeout(timer.value);
    timer.value = null;
  }

  timer.value = setTimeout(() => {
    loadingData.value = true;

    store.dispatch("searchTrends", searchVal.value).then(() => {
      error.value = "";
    }).catch((e) => {
      error.value = e;
    }).finally(() => {
      loadingData.value = false;
    });
  }, 200);
};

const goToImageDetail = (id) => {
  router.push({path: `detail/${id}`});
};

const getSearchValueFromLS = () => {
  if (localStorage.getItem(KOSIK_LS_KEY) && JSON.parse(localStorage.getItem(KOSIK_LS_KEY)).searchParams) {
    const lsData = JSON.parse(localStorage.getItem(KOSIK_LS_KEY));
    searchVal.value = lsData.searchParams;
  }
};
onMounted(() => {
  getSearchValueFromLS();
});
</script>

<template>
    <h1 class="mb-3">Trends list search</h1>
    <input type="text"
           v-model="searchVal"
           @keyup="searchTimeOut"
           autofocus/>
    <p v-if="loadingData && !error">Loading data...</p>
    <p v-if="error" class="error-msg">{{ error }}</p>
    <div v-if="!error && !loadingData" class="gallery-wrapper mt-5">
      <ImageCmp
          v-for="(item, index) in searchResults"
          @click="goToImageDetail(item.id)"
          :key="index"
          :image-data="item"
          class="clickable"
      />
    </div>
</template>

<style>
.gallery-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.clickable {
  cursor: pointer;
}

.error-msg {
  color: red;
}
</style>
