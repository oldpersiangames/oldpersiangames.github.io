<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();

useSeoMeta({
  title: t("games"),
  description: "List of all Persian video games",
});
</script>
<template>
  <UContainer class="py-8">
    <UCard
      class="mb-4 overflow-hidden text-ellipsis whitespace-nowrap"
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
            label: $t('games'),
            to: localePath('/games'),
            icon: 'i-iconoir-gamepad',
          },
        ]"
      />
    </UCard>
    <GamesList />
  </UContainer>
</template>
