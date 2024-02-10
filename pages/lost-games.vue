<script setup>
const img = useImage();

const images = useState("lostGames", () => {
  const files = import.meta.glob("/public/img/lost-games/*", {
    import: "default",
    as: "url",
    eager: true,
  });

  return Object.keys(files)
    .reverse()
    .map((f) => f.slice(7));
});
</script>
<template>
  <Head>
    <Title>لیست بازی های فارسی گمشده</Title>
    <Meta name="description" content="لیست بازی های فارسی گمشده" />
  </Head>

  <div
    class="mt-4 pb-24 prose prose-primary dark:prose-invert max-w-none font-light"
    dir="rtl"
  >
    <p>
      اینجا لیست بازی‌های فارسی (دوبله و ایرانی) که آرشیو نشدن (گمشده‌ها) قرار
      میگیره. این لیست می‌تونه به شدت ناقص باشه، اگه اثر دیگه‌ای می‌شناسین لطفاً
      خبر بدین:
      <a
        class="text-primary-600 font-medium hover:underline"
        href="https://t.me/alihardan"
        dir="ltr"
        >@alihardan</a
      >
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
      <UCard v-for="image in images">
        <div class="flex flex-row items-start gap-2">
          <a target="_blank" :href="img(image)" class="w-48"
            ><NuxtImg :src="image" class="my-0 h-48" loading="lazy"
          /></a>
          <span dir="ltr">{{ image.slice(16) }}</span>
        </div>
      </UCard>
    </div>
    <table>
      <tr>
        <td></td>
      </tr>
    </table>
  </div>
</template>
