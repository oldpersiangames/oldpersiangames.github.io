<script setup>
const localePath = useLocalePath();
const { data: items } = await useFetch(
  "https://backend.oldpersiangames.org/api/items/websiteIndex"
);
</script>

<template>
  <template v-for="item in items" :key="item.slug">
    <NuxtLink :to="localePath('/misc/' + item.slug)" class="h-full"
      ><nuxt-img
        v-if="item.photo"
        class="h-full w-10"
        width="40"
        :src="'/item-photos/' + item.id + '/' + item.photo.id + '.jpg'"
      />
    </NuxtLink>
  </template>
</template>
