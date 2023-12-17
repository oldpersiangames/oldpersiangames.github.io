<script setup>
const localePath = useLocalePath();
</script>
<template>
  <div
    class="mt-4 pb-24 prose prose-primary dark:prose-invert max-w-none font-light"
    dir="rtl"
  >
    <ul>
      <ContentList path="/blog" v-slot="{ list }">
        <li v-for="post in list" :key="post._path">
          <NuxtLink :to="localePath(post._path)">{{ post.title }}</NuxtLink>
        </li>
      </ContentList>
    </ul>
  </div>
</template>
