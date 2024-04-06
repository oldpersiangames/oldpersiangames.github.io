<script setup>
const localePath = useLocalePath();

useSeoMeta({
  title: "آرشیو طبقه‌بندی نشده OPG",
  description: "آرشیو طبقه‌بندی نشده OPG",
});
</script>
<template>
  <UContainer>
    <UPage>
      <UPageHeader
        title="آرشیو طبقه‌بندی نشده OPG"
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
                  label: 'آرشیو طبقه‌بندی نشده',
                  to: localePath('/uncategorized'),
                  icon: 'i-heroicons-link',
                },
              ]"
            />
          </UCard>
        </template>
      </UPageHeader>

      <UPageBody prose>
        <p>
          فایل آثار و بازی‌هایی رو در اختیار داریم که هنوز وضعیتشون رو از نظر
          سلامت و اینکه دقیقا چی هستن بررسی کامل نکردیم تا در قسمت مربوط به خودش
          منتشر کنیم.
        </p>
        <p>
          برای اینکه شما معطل نشین، همه‌ی فایل‌های بررسی نشده رو در کانال
          تلگرامی
          <a
            dir="ltr"
            class="text-primary-600 font-light no-underline hover:underline"
            target="_blank"
            href="https://t.me/OPGAA"
            >@OPGAA</a
          >
          قرار می‌دیم و بعد از بررسی و جمع‌آوری اطلاعات نهایی، از اونجا حذف و در
          قسمت درستش منتشر می‌کنیم.
        </p>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
