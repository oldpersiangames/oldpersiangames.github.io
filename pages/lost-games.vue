<template>Temporary Disabled</template>
<!-- <script setup>
const localePath = useLocalePath();
const img = useImage();

const { data: lostGames } = await useAPI("/api/lost-games");
useSeoMeta({
  title: "لیست بازی های فارسی گمشده",
  description: "لیست بازی های فارسی گمشده",
});
const storageUrl =
  (process.dev
    ? "http://localhost:8000"
    : "https://backend.oldpersiangames.org") + "/storage";
</script>
<template>
  <UContainer>
    <UPage>
      <UPageHeader
        title="لیست بازی های فارسی گمشده"
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
                  label: 'بازی‌های گمشده',
                  to: localePath('/lost-games'),
                  icon: 'i-heroicons-clipboard-document-list',
                },
              ]"
            />
          </UCard>
        </template>
      </UPageHeader>
      <UPageBody prose>
        <p>
          اینجا لیست بازی‌های فارسی (دوبله و ایرانی) که آرشیو نشدن (گمشده‌ها)
          قرار میگیره. این لیست می‌تونه به شدت ناقص باشه، اگه اثر دیگه‌ای
          می‌شناسین لطفاً به ادمین بازی‌های گمشده پیام بدین:

          <a dir="ltr" href="https://t.me/AR_1381">@AR_1381</a> (در تلگرام)
        </p>

        <div
          class="not-prose grid grid-cols-1 gap-4 text-center md:grid-cols-2"
        >
          <UCard v-for="image in lostGames">
            <div class="flex flex-row items-start gap-2">
              <a
                target="_blank"
                :href="img(storageUrl + '/lost-games/' + image)"
                ><NuxtImg
                  :src="storageUrl + '/lost-games/' + image"
                  height="192"
                  loading="lazy"
              /></a>
              <span dir="ltr">{{ image }}</span>
            </div>
          </UCard>
        </div>
      </UPageBody>
    </UPage>
  </UContainer>
</template> -->
