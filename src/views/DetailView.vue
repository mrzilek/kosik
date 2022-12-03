<script setup>
import {useStore} from "vuex";
import {computed} from "vue";
import ImageCmp from "@/components/ImageCmp.vue";

const props = defineProps({
  routerImageId: {
    type: String,
    required: true,
  },
});
const store = useStore();
const trendsData = computed(() => store.getters.getSearchData);

const getImageData = computed(() => trendsData.value.filter((item) => item.id === props.routerImageId)[0]);
</script>

<template>
  <h1 class="mb-3">Details</h1>
  <div class="detail-box-wrapper d-flex" v-if="getImageData">
    <div class="detail-box me-5">
      <ul>
        <li><strong>Description</strong>: {{ getImageData.description }}</li>
        <li><strong>ID</strong>: {{ getImageData.id }}</li>
        <li><strong>Dimensions</strong>: {{ getImageData.imageOptions.dims[0] }}x{{ getImageData.imageOptions.dims[1] }}
        </li>
        <li><strong>Created</strong>: {{ new Date(getImageData.created).toDateString() }}</li>
      </ul>
      <div class="buttons">
        <RouterLink to="/list" class="button back-buton">Go back to list</RouterLink>
        <a :href="getImageData.itemUrl" target="_blank" class="button web-button">Go to Tenor</a>
      </div>
    </div>
    <div>
      <ImageCmp :image-data="getImageData"/>
    </div>
  </div>
  <template v-else>
    <p> No data found.</p>
    <RouterLink to="/list">Go back to list</RouterLink>
  </template>
</template>

<style lang="scss" scoped>
.buttons a {
  margin: 0 10px;
}
</style>
