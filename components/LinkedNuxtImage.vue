<script setup>
const img = useImage();
defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <a target="_blank" :href="img($attrs.src)"
    ><NuxtImg :src="$attrs.src" :class="$attrs.class" loading="lazy"
  /></a>
</template>
