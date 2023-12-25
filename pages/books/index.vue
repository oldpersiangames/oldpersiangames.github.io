<script setup>
const localePath = useLocalePath();
</script>
<template>
  <Head>
    <Title>دانلود کتاب ها و مجلات</Title>
    <Meta name="description" content="دانلود کتاب ها و مجلات" />
  </Head>

  <h1
    class="mt-4 text-center text-xl font-bold leading-none tracking-tight text-gray-900 dark:text-white"
  >
    دانلود کتاب ها و مجلات
  </h1>
  <div
    class="mt-4 pb-24 prose prose-primary dark:prose-invert max-w-none font-light"
    dir="rtl"
  >
    <ul>
      <li>
        <NuxtLink
          class="text-primary-600 no-underline font-light hover:underline"
          :to="localePath('/books/lohekhaneh')"
          >دانلود کتاب ها و مجلات لوحه خانه</NuxtLink
        >
      </li>
    </ul>
    <h2>مشارکت</h2>

    <p>
      می‌تونین کتاب‌های مرتبط رو برامون بفرستین. یا اگه نسخه بهتری از کتاب‌های
      موجود دارین. روی دکمه‌ی مشارکت بالای سایت کلیک کنین.
    </p>
  </div>
</template>
