<script setup>
const localePath = useLocalePath();
</script>
<template>
  <Head>
    <Title>لینک های مرتبط</Title>
    <Meta
      name="description"
      content="لینک های مربوط به بازی های ویدئویی فارسی"
    />
  </Head>
  <h1
    class="mt-4 text-center text-xl font-bold leading-none tracking-tight text-gray-900 dark:text-white"
  >
    لینک های مرتبط
  </h1>
  <div
    class="mt-4 pb-24 prose prose-primary dark:prose-invert mx-auto font-light"
    dir="rtl"
  >
    <p>
      در اینجا لیستی از پیوندهای مربوط به بازی‌های فارسی رو جمع‌آوری می‌کنیم.
    </p>

    <div>
      <h3>لینک باکس ها</h3>
      <ul>
        <li>
          <NuxtLink
            class="text-primary-600 no-underline font-light hover:underline"
            :to="localePath('/links/')"
            >OPG Links</NuxtLink
          >: لیست پیوندهای مربوط به بازی‌های فارسی
        </li>
        <li>
          <a
            class="text-primary-600 no-underline font-light hover:underline"
            target="_blank"
            href="https://reza1147.github.io/GamesPersianPatches/"
            >Persian Video Games Patches</a
          >: لیستی کامل از زیرنویس‌های فارسی بازی‌ها
        </li>
      </ul>
    </div>

    <div>
      <h3>فعالین در زمینه بایگانی بازی‌ها + اضافات</h3>
      <ul>
        <li>
          <NuxtLink
            class="text-primary-600 no-underline font-light hover:underline"
            :to="localePath('/')"
            >Old Persian Games</NuxtLink
          >: مجموعه‌ای که برای حفاظت از بازی‌های ویدئویی فارسی و ملحقاتشون
          فعالیت می‌کنه
        </li>
        <li>
          <a
            class="text-primary-600 no-underline font-light hover:underline"
            href="https://t.me/game_lost_mobile"
            target="_blank"
            >Game lost mobile</a
          >: کانالی که در زمینه آرشیو بازی‌های اندرویدی ایرانی فعالیت می‌کنه
        </li>
        <li>
          <a
            class="text-primary-600 no-underline font-light hover:underline"
            href="https://t.me/Bazi_Farsi"
            target="_blank"
            >بازی فارسی</a
          >: کانالی که در زمینه آرشیو مجلات دیجیتال فارسی بازی‌ها فعالیت می‌کنه
        </li>
        <li>
          <a
            class="text-primary-600 no-underline font-light hover:underline"
            href="https://t.me/Dooble_Bazi"
            target="_blank"
            >دوبله بازی</a
          >: کانالی که بازی های دوبله رو بصورت پچ قرار می‌ده
        </li>
        <li>
          <a
            class="text-primary-600 no-underline font-light hover:underline"
            href="https://paroosgame.com/"
            target="_blank"
            >پاروس گیم</a
          >: فروشگاهی از آرشیو بازی‌های فارسی
        </li>
        <li>
          <a
            class="text-primary-600 no-underline font-light hover:underline"
            href="https://paroosgame.com/"
            target="_blank"
            >PS4 JAILBREAK</a
          >: کانالی که بعضی از زیرنویس‌ها رو برای PS4 پورت می‌کنه
        </li>
      </ul>
    </div>

    <div>
      <h3>فعالین در زمینه فارسی‌سازی بازی‌ها</h3>
      <ul>
        <li>
          <a
            class="text-primary-600 no-underline font-light hover:underline"
            href="https://fansub.ir/"
            target="_blank"
            >فن ساب</a
          >
          (زیرنویس)
        </li>

        <li>
          <a
            class="text-primary-600 no-underline font-light hover:underline"
            href="https://gamesub.in/"
            target="_blank"
            >گیم ساب</a
          >
          (زیرنویس)
        </li>
        <li>
          <a
            class="text-primary-600 no-underline font-light hover:underline"
            href="https://farsisaz.com/"
            target="_blank"
            >فارسی ساز</a
          >
          (زیرنویس)
        </li>
        <li>
          <a
            class="text-primary-600 no-underline font-light hover:underline"
            href="https://persianlingo.ir/"
            target="_blank"
            >پرشین لینگو</a
          >
          (زیرنویس)
        </li>
        <li>
          <a
            class="text-primary-600 no-underline font-light hover:underline"
            href="https://par30games.net/"
            target="_blank"
            >پارسی گیم</a
          >
          (زیرنویس)
        </li>
        <li>
          <a
            class="text-primary-600 no-underline font-light hover:underline"
            href="https://teamfa.net/"
            target="_blank"
            >تیم فا</a
          >
          (زیرنویس)
        </li>
        <li>
          <a
            class="text-primary-600 no-underline font-light hover:underline"
            href="https://subran.org/"
            target="_blank"
            >ساب ران</a
          >
          (زیرنویس)
        </li>
        <li>
          <a
            class="text-primary-600 no-underline font-light hover:underline"
            href="https://t.me/venus_dubbed"
            target="_blank"
            >ونوس</a
          >
          (زیرنویس)
        </li>
        <li>
          <a
            class="text-primary-600 no-underline font-light hover:underline"
            href="https://t.me/iranisub_ir"
            target="_blank"
            >ایرانی ساب</a
          >
          (زیرنویس)
        </li>
        <li>
          <a
            class="text-primary-600 no-underline font-light hover:underline"
            href="https://www.darinoos.net/"
            target="_blank"
            >دارینوس</a
          >
          (دوبله)
        </li>
        <li>
          <a
            class="text-primary-600 no-underline font-light hover:underline"
            href="https://www.gamedooble.com/"
            target="_blank"
            >گیم دوبله</a
          >
          (دوبله)
        </li>

        <li>
          <a
            class="text-primary-600 no-underline font-light hover:underline"
            href="https://www.instagram.com/unique_onez/"
            target="_blank"
            >گروه دوبلاژ یونیک وانز</a
          >
          (دوبله)
        </li>
        <li>
          <a
            class="text-primary-600 no-underline font-light hover:underline"
            href="https://parsipes.ir/"
            target="_blank"
            >پارسی PES</a
          >
          (دوبله)
        </li>
      </ul>
    </div>

    <div>
      <h3>استورها</h3>
      <ul>
        <li>
          <a
            class="text-primary-600 no-underline font-light hover:underline"
            href="https://hayoola.com/"
            target="_blank"
            >هیولا</a
          >: استور خرید بازی‌های ایرانی بصورت دیجیتالی
        </li>
        <li>
          <a
            class="text-primary-600 no-underline font-light hover:underline"
            href="https://gameup.ir/"
            target="_blank"
            >گیم آپ</a
          >: استور خرید بازی‌های ایرانی بصورت دیجیتالی
        </li>
      </ul>
    </div>
  </div>
</template>
