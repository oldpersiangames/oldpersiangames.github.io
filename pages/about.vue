<script setup>
const localePath = useLocalePath();

useSeoMeta({
  title: "درباره",
  description: "درباره Old Persian Games",
});
</script>
<template>
  <UContainer>
    <UPage>
      <UPageHeader
        title="درباره"
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
                  label: $t('about'),
                  to: localePath('/about'),
                  icon: 'i-heroicons-document-text',
                },
              ]"
            />
          </UCard>
        </template>
      </UPageHeader>

      <UPageBody prose>
        <p>
          سایت
          <strong class="font-medium" style="text-shadow: #e73cff 0px 0px 20px"
            ><span class="text-primary-600">Old</span>
            <span class="text-red-600"> Persian</span>
            <span class="text-orange-500 dark:text-yellow-400">
              Games</span
            ></strong
          >
          در ۱۳۹۹/۰۱/۲۰ برای جمع‌آوری بازی‌های ویدئویی فارسی بدست
          <NuxtLink
            dir="ltr"
            :to="{ path: localePath('/contributors'), hash: '#alihardan' }"
            >@alihardan</NuxtLink
          >
          تأسیس شد.
        </p>

        <p><strong>تشکر ویژه از:</strong></p>
        <ul>
          <li>
            <NuxtLink
              dir="ltr"
              :to="{ path: localePath('/contributors'), hash: '#AG_e_e_kA' }"
              >@AG_e_e_kA</NuxtLink
            >: بخاطر قبول مسئولیت مدیریت OPG در شرایط بحرانی و جلوگیری از تعطیل
            شدن پروژه.
          </li>
          <li>
            <NuxtLink
              dir="ltr"
              :to="{ path: localePath('/contributors'), hash: '#MJSAYR' }"
              >@MJSAYR</NuxtLink
            >: بخاطر ایجاد گروه تلگرامی صمیمی اشتراک‌گذاری بازی‌های فارسی که
            موجب تولد ایده OPG شد.
          </li>

          <li>
            همه‌ی کسانی که به هر نحوی دلگرمی دادن. شاید خودشون متوجه نباشن ولی
            برای ما کمک بزرگی بود. :-)
          </li>

          <li>
            همه‌ی
            <NuxtLink :to="localePath('/contributors/')">
              مشارکت‌کنندگان</NuxtLink
            >.
          </li>
        </ul>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
