<script setup>
const localePath = useLocalePath();
</script>
<template>
    <Head>
        <Title>درباره</Title>
        <Meta name="description" content="درباره Old Persian Games" />
    </Head>
    <h1 class="mt-4 text-center text-xl font-bold leading-none tracking-tight text-gray-900 dark:text-white">درباره ما</h1>
    <div class="mt-4 pb-24 prose prose-primary dark:prose-invert max-w-none font-light" dir="rtl">
        <p>سایت <strong class='font-medium' style='text-shadow: #e73cff 0px 0px 20px;'><span
                    class='text-primary-600'>Old</span> <span class='text-red-600'>Persian</span> <span
                    class='text-orange-500 dark:text-yellow-400'>Games</span></strong> در ۱۳۹۹/۰۱/۲۰ برای جمع‌آوری بازی‌های
            ویدئویی فارسی بدست <NuxtLink dir="ltr" :to="{ path: localePath('/contributors') + '/', hash: '#alihardan' }"
                class="text-primary-600 no-underline font-light hover:underline">@alihardan</NuxtLink> تأسیس شد.</p>

        <p><strong>تشکر ویژه از:</strong></p>
        <ul>
            <li>
                <NuxtLink dir="ltr" :to="{ path: localePath('/contributors') + '/', hash: '#AG_e_e_kA' }"
                    class="text-primary-600 no-underline font-light hover:underline">@AG_e_e_kA</NuxtLink>: بخاطر قبول
                مسئولیت مدیریت OPG در شرایط بحرانی و جلوگیری از تعطیل شدن پروژه.
            </li>
            <li>
                <NuxtLink dir="ltr" :to="{ path: localePath('/contributors') + '/', hash: '#MJSAYR' }"
                    class="text-primary-600 no-underline font-light hover:underline">@MJSAYR</NuxtLink>: بخاطر ایجاد گروه
                تلگرامی صمیمی اشتراک‌گذاری بازی‌های فارسی که موجب تولد ایده
                OPG شد.
            </li>

            <li>همه‌ی کسانی که به هر نحوی دلگرمی دادن. شاید خودشون متوجه نباشن ولی برای ما کمک بزرگی بود. :-)</li>

            <li>همه‌ی <SiteLink :to="localePath('/contributors/')"
                    class="text-primary-600 no-underline font-light hover:underline">
                    مشارکت‌کنندگان</SiteLink>. </li>
        </ul>
    </div>
</template>