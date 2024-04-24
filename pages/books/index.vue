<script setup>
const localePath = useLocalePath();
const { t } = useI18n();
useSeoMeta({
  title: t("books"),
  description: t("books"),
});
</script>
<template>
  <UContainer>
    <UPage>
      <UPageHeader
        :title="$t('books')"
        :ui="{
          wrapper: 'border-0 pb-0',
          container: 'lg:justify-center',
          title: 'text-2xl sm:text-2xl',
        }"
      >
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
                  label: $t('books'),
                  to: localePath('/books'),
                  icon: 'i-heroicons-book-open',
                },
              ]"
            />
          </UCard>
        </template>
      </UPageHeader>

      <UPageBody prose>
        <ul>
          <li>
            <NuxtLink :to="localePath('/books/lohekhaneh')"
              >دانلود کتاب ها و مجلات لوحه خانه</NuxtLink
            >
          </li>
        </ul>
        <h2>مشارکت</h2>

        <p>
          می‌تونین کتاب‌های مرتبط رو برامون بفرستین. یا اگه نسخه بهتری از
          کتاب‌های موجود دارین. روی دکمه‌ی مشارکت بالای سایت کلیک کنین.
        </p>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
