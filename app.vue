<script setup lang="ts">
const i18nHead = useLocaleHead({
  addSeoAttributes: true,
  addDirAttribute: true,
});

useHead({
  htmlAttrs: () => i18nHead.value.htmlAttrs,
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])],
});

defineOgImage({
  url: "/img/logo.png",
});
// useSeoMeta({
//   ogImage: "/img/logo.png",
//   "twitter:image:src": "https://oldpersiangames.org/img/logo.png",
//   twitterImageWidth: 800,
//   twitterImageHeight: 800,
//   ogImageWidth: 800,
//   ogImageHeight: 800,
// });
</script>
<template>
  <div>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UNotifications />
    <UModals />
  </div>
</template>
