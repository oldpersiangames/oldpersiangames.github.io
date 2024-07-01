<script setup lang="ts">
const localePath = useLocalePath();

useSeoMeta({
  title: "لینک های مرتبط",
  description: "لینک های مربوط به بازی های ویدئویی فارسی",
});
</script>
<template>
  <UContainer>
    <UPage>
      <UPageHeader
        title="لینک های مرتبط"
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
                  label: 'لینک‌های مرتبط',
                  to: localePath('/links'),
                  icon: 'i-heroicons-link',
                },
              ]"
            />
          </UCard>
        </template>
      </UPageHeader>

      <UPageBody prose>
        <p>
          در اینجا لیستی از پیوندهای مربوط به بازی‌های فارسی رو جمع‌آوری
          می‌کنیم.
        </p>

        <div>
          <h3>لینک باکس ها</h3>
          <ul>
            <li>
              <NuxtLink :to="localePath('/links/')">OPG Links</NuxtLink>: لیست
              پیوندهای مربوط به بازی‌های فارسی
            </li>
            <li>
              <a
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
              <NuxtLink :to="localePath('/')">Old Persian Games</NuxtLink>:
              مجموعه‌ای که برای حفاظت از بازی‌های ویدئویی فارسی و ملحقاتشون
              فعالیت می‌کنه
            </li>
            <li>
              <a href="https://t.me/game_lost_mobile" target="_blank"
                >Game lost mobile</a
              >: کانالی که در زمینه آرشیو بازی‌های اندرویدی ایرانی فعالیت می‌کنه
            </li>
            <li>
              <a href="https://t.me/Bazi_Farsi" target="_blank">بازی فارسی</a>:
              کانالی که در زمینه آرشیو مجلات دیجیتال فارسی بازی‌ها فعالیت می‌کنه
            </li>
            <li>
              <a href="https://t.me/Dooble_Bazi" target="_blank">دوبله بازی</a>:
              کانالی که بازی های دوبله رو بصورت پچ قرار می‌ده
            </li>
            <li>
              <a href="https://paroosgame.com/" target="_blank">پاروس گیم</a>:
              فروشگاهی از آرشیو بازی‌های فارسی
            </li>
            <li>
              <a href="https://paroosgame.com/" target="_blank">PS4 JAILBREAK</a
              >: کانالی که بعضی از زیرنویس‌ها رو برای PS4 پورت می‌کنه
            </li>
          </ul>
        </div>

        <div>
          <h3>فعالین در زمینه فارسی‌سازی بازی‌ها</h3>
          <ul>
            <li>
              <a href="https://fansub.ir/" target="_blank">فن ساب</a>
              (زیرنویس)
            </li>

            <li>
              <a href="https://gamesub.in/" target="_blank">گیم ساب</a>
              (زیرنویس)
            </li>
            <li>
              <a href="https://farsisaz.com/" target="_blank">فارسی ساز</a>
              (زیرنویس)
            </li>
            <li>
              <a href="https://persianlingo.ir/" target="_blank">پرشین لینگو</a>
              (زیرنویس)
            </li>
            <li>
              <a href="https://par30games.net/" target="_blank">پارسی گیم</a>
              (زیرنویس)
            </li>
            <li>
              <a href="https://teamfa.net/" target="_blank">تیم فا</a>
              (زیرنویس)
            </li>
            <li>
              <a href="https://subran.org/" target="_blank">ساب ران</a>
              (زیرنویس)
            </li>
            <li>
              <a href="https://t.me/venus_dubbed" target="_blank">ونوس</a>
              (زیرنویس)
            </li>
            <li>
              <a href="https://t.me/iranisub_ir" target="_blank">ایرانی ساب</a>
              (زیرنویس)
            </li>
            <li>
              <a href="https://parsiteamsite.ir" target="_blank">پارسی تیم</a>
              (زیرنویس)
            </li>
            <li>
              <a href="https://www.darinoos.net/" target="_blank">دارینوس</a>
              (دوبله)
            </li>
            <li>
              <a href="https://www.gamedooble.com/" target="_blank"
                >گیم دوبله</a
              >
              (دوبله)
            </li>

            <li>
              <a href="https://www.instagram.com/unique_onez/" target="_blank"
                >گروه دوبلاژ یونیک وانز</a
              >
              (دوبله)
            </li>
            <li>
              <a href="https://parsipes.ir/" target="_blank">پارسی PES</a>
              (دوبله)
            </li>
          </ul>
        </div>

        <div>
          <h3>استورها</h3>
          <ul>
            <li>
              <a href="https://hayoola.com/" target="_blank">هیولا</a>: استور
              خرید بازی‌های ایرانی بصورت دیجیتالی
            </li>
            <li>
              <a href="https://gameup.ir/" target="_blank">گیم آپ</a>: استور
              خرید بازی‌های ایرانی بصورت دیجیتالی
            </li>
          </ul>
        </div>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
