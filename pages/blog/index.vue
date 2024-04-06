<script setup>
const localePath = useLocalePath();
const { t } = useI18n();
useSeoMeta({
  title: t("blog"),
  description: t("blog"),
});
</script>
<template>
  <UContainer>
    <UPage>
      <UPageHeader
        :title="$t('blog')"
        :ui="{
          wrapper: 'border-0 pb-0',
          container: 'lg:justify-center',
          title: 'text-2xl sm:text-2xl',
        }"
      >
        <template #headline>
          <UCard
            class="mb-4 flex-1"
            :ui="{
              body: {
                padding: 'px-3 py-3 sm:p-3',
              },
            }"
          >
            <UBreadcrumb
              :links="[
                {
                  label: $t('home'),
                  to: localePath('/'),
                  icon: 'i-heroicons-home',
                },
                {
                  label: $t('blog'),
                  to: localePath('/blog'),
                  icon: 'i-heroicons-document-text',
                },
              ]"
            />
          </UCard>
        </template>
      </UPageHeader>

      <UPageBody prose>
        <ul>
          <ContentList path="/blog" v-slot="{ list }">
            <li v-for="post in list" :key="post._path">
              <NuxtLink :to="localePath(post._path)">{{ post.title }}</NuxtLink>
            </li>
          </ContentList>
        </ul>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
