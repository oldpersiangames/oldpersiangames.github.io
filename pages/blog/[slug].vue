<script setup>
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();

const route = useRoute();
const { data: post } = await useAsyncData(switchLocalePath("fa"), () =>
  queryContent(switchLocalePath("fa")).findOne(),
);

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Post not found",
    fatal: true,
  });
}

useSeoMeta({
  title: post.value.title,
  description: post.value.description,
});
</script>
<template>
  <UContainer>
    <UPage>
      <UPageHeader
        :title="post.title"
        :ui="{
          wrapper: 'border-0 pb-0',
          container: 'lg:justify-center',
          title: 'text-2xl sm:text-2xl',
          headline: 'flex flex-col gap-y-8 items-stretch mb-0',
        }"
      >
        <template #headline>
          <UCard
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
                {
                  label: post.title,
                  to: route.path,
                  icon: 'i-heroicons-document-text',
                },
              ]"
            />
          </UCard>

          <div class="flex items-center justify-center">
            <span class="text-gray-500 dark:text-gray-400"
              ><time>{{
                new Date(post.date).toLocaleDateString("en-CA")
              }}</time></span
            >
          </div>
        </template>
      </UPageHeader>

      <UPageBody prose>
        <article>
          <ContentRenderer :value="post" />
        </article>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
