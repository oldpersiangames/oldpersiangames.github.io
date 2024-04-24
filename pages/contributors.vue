<script setup lang="ts">
const { t } = useI18n();
const shuffle = <T,>(array: readonly T[]): T[] => {
  return array
    .map((a) => ({ rand: Math.random(), value: a }))
    .sort((a, b) => a.rand - b.rand)
    .map((a) => a.value);
};
const { data: users } = await useAPI("/api/users", {
  default: () => [],
  transform: (users) => {
    return shuffle(
      users.map((user) => ({
        name: user.name,
        telegram: user.telegram,
        contributes: user.contributes.reduce((group, contribute) => {
          group[contribute.contribute] = group[contribute.contribute] ?? {
            count: 0,
          };
          if (contribute.contributable_type)
            group[contribute.contribute].count++;
          return group;
        }, {}),
      })),
    );
  },
});
useSeoMeta({
  title: t("contributors"),
  description: "لیست مشارکت کنندگان Old Persian Games",
});
</script>
<template>
  <UContainer>
    <UPage>
      <UPageHeader
        :ui="{
          wrapper: 'border-0 pb-0',
          container: 'lg:justify-center',
          title: 'text-2xl sm:text-2xl',
        }"
      >
        <template #title>
          {{ $t("contributors") }}
          <small class="text-xs text-gray-500 dark:text-gray-400"
            >(ترتیب تصادفی)</small
          >
        </template>
        <template #headline>
          <UCard
            class="mb-4 min-w-0 flex-1"
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
                  label: $t('contributors'),
                  to: localePath('/contributors'),
                  icon: 'i-heroicons-clipboard-document-list',
                },
              ]"
            />
          </UCard>
        </template>
      </UPageHeader>
      <UPageBody prose>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <UCard
            :id="user.name.replace(/ /g, '-')"
            class="scroll-mt-[var(--header-height)] text-sm"
            v-for="(user, index) in users"
            :Key="index"
            :ui="{
              body: {
                base: '',
                background: '',
                padding: 'px-4 py-2 sm:py-2',
              },
            }"
          >
            <template #header>
              <div class="flex items-center gap-2">
                <h2 class="my-0">
                  {{ user.name }}
                </h2>
                <small v-if="user.telegram" class="text-xs"
                  ><NuxtLink
                    :href="'https://t.me/' + user.telegram"
                    target="_blank"
                    >[تلگرام]</NuxtLink
                  ></small
                >
              </div>
            </template>
            <ul>
              <li v-for="(contribute, key) in user.contributes">
                {{ key }}{{ contribute.count ? ": " + contribute.count : "" }}
              </li>
            </ul>
          </UCard>
        </div>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
