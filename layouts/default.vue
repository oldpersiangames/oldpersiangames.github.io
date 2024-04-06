<script setup lang="ts">
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const localePath = useLocalePath();

// Bottom Dialog
const bottomDialogClosed = ref(false);
const showBottomDialog = ref(false);
const lastScrollY = ref(0);
if (process.client) {
  window.addEventListener("scroll", () => {
    const r = window.scrollY || document.documentElement.scrollTop;
    (showBottomDialog.value = r < lastScrollY.value),
      (lastScrollY.value = r <= 0 ? 0 : r);
  });
}
</script>

<template>
  <div>
    <UHeader
      :links="[
        {
          label: $t('home'),
          to: localePath('/'),
        },
        {
          label: $t('games'),
          to: localePath('/games'),
        },
        {
          label: $t('books'),
          to: localePath('/books'),
        },
        {
          label: $t('miscellaneous'),
          to: localePath('/misc'),
        },
        {
          label: $t('lostGames'),
          to: localePath('/lost-games'),
        },
        {
          label: $t('uncategorizedArchive'),
          to: localePath('/uncategorized'),
        },
        {
          label: $t('blog'),
          to: localePath('/blog'),
        },
        {
          label: $t('donation'),
          to: localePath('/donation'),
        },
      ]"
      :ui="{ left: 'lg:flex-initial flex items-center gap-1.5' }"
    >
      <template #logo>
        <div class="w-14 px-3">
          <svg viewBox="0 0 756.73141 823.04122" class="w-full fill-current">
            <use xlink:href="/img/logo.svg#g3577"></use>
          </svg>
        </div>
      </template>

      <template #right>
        <UButton
          to="https://t.me/OldPersianGames"
          target="_blank"
          icon="i-simple-icons-telegram"
          aria-label="Telegram"
          color="sky"
          variant="ghost"
        />
        <UColorModeButton />
        <UDropdown
          mode="hover"
          :items="[
            locales.map((e) => ({
              label: e.name,
              icon: {
                fa: 'i-emojione-flag-for-iran',
                en: 'i-emojione-flag-for-united-states',
              }[e.code],
              to: switchLocalePath(e.code),
            })),
          ]"
        >
          <UButton
            variant="soft"
            size="md"
            :label="locales.find((x) => x.code === locale)!.name"
            :icon="
              {
                fa: 'i-emojione-flag-for-iran',
                en: 'i-emojione-flag-for-united-states',
              }[locales.find((x) => x.code === locale)!.code]
            "
            dynamic
          />
        </UDropdown>
        <UButton :label="$t('contribute')" color="primary" to="/contribute" />
      </template>
    </UHeader>

    <UMain>
      <slot />
    </UMain>

    <div
      v-if="
        bottomDialogClosed == false &&
        locale == 'fa' &&
        $route.path !== localePath('/') &&
        $route.path !== localePath('/contribute')
      "
      :class="[
        'via-primary-300 dark:via-primary-300 fixed bottom-0 z-50 w-full bg-gradient-to-r from-gray-200 to-gray-200 transition duration-200 ease-in-out dark:from-gray-800 dark:to-gray-800',
        { 'translate-y-full': !showBottomDialog },
      ]"
    >
      <div
        class="mt-px flex w-full flex-col items-center justify-center gap-3 bg-white py-5 text-center md:flex-row dark:bg-gray-900"
      >
        <UButton
          icon="i-heroicons-x-mark"
          variant="soft"
          @click="bottomDialogClosed = true"
        />
        <p class="text-sm">
          آرشیو این وبگاه از فایل‌های ارسالی بازدیدکنندگان جمع‌آوری شده است.
        </p>
        <UButton :to="localePath('/contribute')">
          شما هم می‌توانید کمک کنید
        </UButton>
      </div>
    </div>

    <UFooter
      dir="ltr"
      :links="[
        {
          label: 'About',
          to: localePath('/about'),
        },
        {
          label: 'Contributors',
          to: localePath('/contributors'),
        },
        {
          label: 'Links',
          to: localePath('/links'),
        },
      ]"
    >
      <template #left>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Founded with <span class="text-rose-600">❤️</span> by
          <NuxtLink
            :to="localePath('/contributors') + '#alihardan'"
            class="text-primary-600 font-medium hover:underline"
            >Ali Hardan</NuxtLink
          >
        </p>
      </template>

      <template #right>
        <UButton
          to="https://github.com/oldpersiangames/oldpersiangames.github.io"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="gray"
          variant="ghost"
        />
        <UButton
          to="https://t.me/OldPersianGames"
          target="_blank"
          icon="i-simple-icons-telegram"
          aria-label="Telegram"
          color="sky"
          variant="ghost"
        />
      </template>
    </UFooter>
  </div>
</template>
