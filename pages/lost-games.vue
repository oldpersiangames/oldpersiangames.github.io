<script setup>
const img = useImage();

const { data: lostGames } = await useFetch('/api/lost-games');

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
      به ادمین بازی‌های گمشده پیام بدین:
      <div dir="ltr">
        <a
          class="text-primary-600 font-medium hover:underline"
          href="https://t.me/Raykar1381"
          
          >@Raykar1381</a
        > (در تلگرام)
      </div>
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
      <UCard v-for="image in lostGames">
        <div class="flex flex-row items-start gap-2">
          <a target="_blank" :href="img(image.slice(6))" class="w-48"
            ><NuxtImg :src="'/'+image.slice(6)" class="my-0 h-48" loading="lazy"
          /></a>
          <span dir="ltr">{{ image.slice(22) }}</span>
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
