<script setup>
defineProps({
  imageData: {
    type: Object,
    required: true,
  },
});
</script>

<template>
    <img :src="imageData.imageOptions.preview"
         :title="imageData.description"
         :height="imageData.imageOptions.dims[1]"
         :width="imageData.imageOptions.dims[0]"
    class="p-1"/>
</template>
