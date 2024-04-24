<script setup lang="ts">
const localePath = useLocalePath();

useSeoMeta({
  title: "حمایت مالی",
  description: "حمایت مالی از Old Persian Games",
});
</script>
<template>
  <UContainer>
    <UPage>
      <UPageHeader
        title="حمایت مالی"
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
                  label: $t('donation'),
                  to: localePath('/donation'),
                  icon: 'i-heroicons-currency-dollar',
                },
              ]"
            />
          </UCard>
        </template>
      </UPageHeader>

      <UPageBody prose>
        <p>
          برای اینکه توسعه پروژه سرعت و کیفیت بیشتری بگیره، آپشن حمایت مالی رو
          اضافه کردیم. اگه فکر می‌کنید خدمات با ارزشی رو از اینجا دریافت
          می‌کنید، شما هم می‌تونید در تهیه این امکانات سهم داشته باشین:
        </p>
        <p>
          <a target="_blank" href="https://oldpersiangames.ir.page/"
            >پرداخت آنلاین از درگاه ریالی</a
          >
        </p>
        <p dir="ltr">
          <strong>Bitcoin:</strong>
        </p>
        <pre dir="ltr">bc1qhh7dehq6kh0jc06wdxs0pxdu4ntewxxtmvjmxk</pre>
        <p dir="ltr">
          <strong>Ethereum:</strong>
        </p>
        <pre dir="ltr">0xd0EbeCa9bf5F2CA908CdBB0ccdCA4efD44454ED6</pre>
        <p dir="ltr">
          <strong>Tether USD (BEP20):</strong>
        </p>
        <pre dir="ltr">0xd0EbeCa9bf5F2CA908CdBB0ccdCA4efD44454ED6</pre>
        <p>
          کمک می‌کنید نسخه‌ی مدرن OPG رو بهبود ببخشیم و امکانات بیشتری مثل
          مشارکت پویا، آپدیت سریع‌تر، آرشیو کتاب، مجلات، و دیسک‌های همراه اون‌ها
          رو در اختیارتون بذاریم؛ و آثار بیشتری برای آرشیو تهیه کنیم.
        </p>
        <p>لیست حمایت‌های مالی انجام شده:</p>

        <UTable
          class="not-prose"
          :columns="[
            { key: 'name', label: 'نام' },
            { key: 'amount', label: 'مبلغ' },
          ]"
          :rows="[
            {
              name: 'ناشناس',
              amount: '0.001 BTC (معادل ۲ میلیون و ۶۰۰ هزار تومان)',
            },
            { name: 'سعید صفی خانی', amount: '۵۰ هزار تومان' },
            { name: 'مصطفی', amount: '۱۰۰ هزار تومان' },
            { name: 'پارسا ابراهیمی', amount: '۱۰۰ هزار تومان' },
            { name: 'آرمین شریفی', amount: '۵۰ هزار تومان' },
            { name: 'Ahmad', amount: '۱۰ هزار تومان' },
            { name: 'امیررضا مهر علی پور', amount: '۱۰۰ هزار تومان' },
            { name: 'hadijpm', amount: '۱۰۰ هزار تومان' },
            { name: 'آرین رخزاد', amount: '۵۰ هزار تومان' },
            { name: 'سینا', amount: '۱۰۰ هزار تومان' },
            {
              name: 'به پیش برید ای oldpersiangames',
              amount: '۱۰۰ هزار تومان',
            },
            {
              name: 'مهدی',
              amount: '$38.42 (معادل یک میلیون و هشتصد هزار تومان)',
            },

            { name: 'رضا شالباف', amount: 'یک میلیون تومان' },
            { name: 'ماکان فراهانی', amount: '۵۰ هزار تومان' },
            { name: 'پیمان', amount: '۱۰۰ هزار تومان' },
            { name: 'کانال آپارات صنعت گیمینگ برپا', amount: '۳۴ هزار تومان' },
            { name: 'سعید صفی خانی', amount: '۲۵ هزار تومان' },
            { name: 'مهدی خردمند', amount: '۱۰۰ هزار تومان' },
          ]"
        />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
