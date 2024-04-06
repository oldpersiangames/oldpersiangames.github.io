<script setup>
const localePath = useLocalePath();
const { data: games } = await useAPI("/api/games");
//
</script>

<template>
  <NuxtLink
    v-for="game in games.data"
    :key="game.slug"
    :to="localePath('/games/' + game.slug)"
    class="h-full"
    ><nuxt-img
      v-if="game.featured_image"
      class="h-full w-10"
      width="40"
      :src="game.featured_image"
    />
  </NuxtLink>
</template>
