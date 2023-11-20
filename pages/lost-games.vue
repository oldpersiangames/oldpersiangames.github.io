<script setup>
const img = useImage();

const images = useState("counter", () => {
  const fs = require("fs");
  const files = fs.readdirSync("./public/img/lost-games").reverse();
  return files;
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

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
      <div v-for="image in images">
        <a target="_blank" :href="img('/img/lost-games/' + image)"
          ><NuxtImg
            :src="'/img/lost-games/' + image"
            class="my-0 mx-auto h-96"
            loading="lazy"
        /></a>

        <span dir="ltr">{{ image }}</span>
      </div>
    </div>
    <table>
      <tr>
        <td></td>
      </tr>
    </table>
  </div>
</template>
