<script setup>
const localePath = useLocalePath();
const { data: items } = await useAPI("/api/items");
</script>

<template>
  <template v-for="item in items" :key="item.slug">
    <NuxtLink :to="localePath('/misc/' + item.slug)" class="h-full"
      ><nuxt-img
        v-if="item.featured_image"
        class="h-full w-10"
        width="40"
        :src="item.featured_image"
      />
    </NuxtLink>
  </template>
</template>
