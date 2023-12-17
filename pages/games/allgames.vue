<script setup>
const localePath = useLocalePath();
const { data: games } = await useFetch(
  "https://backend.oldpersiangames.org/api/games/websiteIndex"
);
</script>

<template>
  <template v-for="game in games" :key="game.slug">
    <NuxtLink :to="localePath('/games/' + game.slug)" class="h-full"
      ><nuxt-img
        v-if="game.photo"
        class="h-full w-10"
        width="40"
        :src="'/gamePhotos/' + game.id + '/' + game.photo.id + '.jpg'"
      />
    </NuxtLink>
  </template>
</template>
