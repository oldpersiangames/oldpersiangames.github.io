<script setup>
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const localePath = useLocalePath();
const i18nHead = useLocaleHead({
  addSeoAttributes: true,
  addDirAttribute: true,
});

useHead({
  htmlAttrs: i18nHead.value.htmlAttrs,
  link: [
    ...(i18nHead.value.link.filter((link) => link.rel != "canonical") || []),
  ],
  meta: [...(i18nHead.value.meta || [])],
});

watch(
  () => i18nHead.value.htmlAttrs,
  () => {
    useHead({
      htmlAttrs: i18nHead.value.htmlAttrs,
    });
  }
);

const showMenu = ref(false);
const showBottomDialog = ref(false);
const lastScrollY = ref(0);
if (process.client) {
  window.addEventListener("scroll", () => {
    const r = window.scrollY || document.documentElement.scrollTop;
    (showBottomDialog.value = r < lastScrollY.value),
      (lastScrollY.value = r <= 0 ? 0 : r);
  });
}

const route = useRoute();
watch(
  () => route.fullPath,
  () => {
    showMenu.value = false;
    showBottomDialog.value = false;
  }
);
</script>

<template>
  <header>
    <nav
      class="border-b border-gray-200 bg-white px-4 py-2 shadow-lg dark:border-gray-700 dark:bg-gray-800"
    >
      <div class="container relative mx-auto flex flex-wrap items-center">
        <div class="flex flex-1 justify-center md:flex-initial">
          <NuxtLink :to="localePath('/')">
            <svg
              viewBox="0 0 756.73141 823.04122"
              class="w-10 fill-[#252422] dark:fill-purple-500"
            >
              <use xlink:href="/img/logo.svg#g3577"></use>
            </svg>
          </NuxtLink>
        </div>
        <button
          @click="showMenu = !showMenu"
          type="button"
          class="absolute left-0 top-0 ml-1 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:static md:hidden"
          aria-controls="mobile-menu-language-select"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="h-6 w-6"
            fill="currentColor"
            aria-hidden="true"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>

        <div
          :class="[
            'w-full items-center justify-between md:ml-6 md:flex md:w-auto',
            { hidden: !showMenu },
          ]"
          ref="menu"
          id="mobile-menu-language-select"
        >
          <ul
            class="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:gap-6 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-800"
          >
            <li>
              <NuxtLink
                :to="localePath('/')"
                class="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-red-600 md:dark:hover:bg-transparent md:dark:hover:text-red-500"
                aria-current="page"
                >{{ $t("home") }}</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                :to="localePath('/games/')"
                class="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-red-600 md:dark:hover:bg-transparent md:dark:hover:text-red-500"
              >
                {{ $t("games") }}</NuxtLink
              >
            </li>

            <li>
              <NuxtLink
                :to="localePath('/books/')"
                class="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-red-600 md:dark:hover:bg-transparent md:dark:hover:text-red-500"
              >
                {{ $t("books") }}</NuxtLink
              >
            </li>

            <li>
              <NuxtLink
                :to="localePath('/misc/')"
                class="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-red-600 md:dark:hover:bg-transparent md:dark:hover:text-red-500"
              >
                {{ $t("miscellaneous") }}</NuxtLink
              >
            </li>

            <li>
              <NuxtLink
                :to="localePath('/lost-games/')"
                class="bg-red-600 text-white block rounded px-3 py-2 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white md:py-0 md:hover:bg-transparent md:hover:text-red-600 md:dark:hover:bg-transparent md:dark:hover:text-red-500"
              >
                {{ $t("lostGames") }}</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                :to="localePath('/uncategorized/')"
                class="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-red-600 md:dark:hover:bg-transparent md:dark:hover:text-red-500"
              >
                {{ $t("uncategorizedArchive") }}</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                :to="localePath('/blog/')"
                class="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-red-600 md:dark:hover:bg-transparent md:dark:hover:text-red-500"
              >
                {{ $t("blog") }}</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                :to="localePath('/donation/')"
                class="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-red-600 md:dark:hover:bg-transparent md:dark:hover:text-red-500"
              >
                {{ $t("donation") }}</NuxtLink
              >
            </li>
          </ul>
          <div class="mt-2 flex justify-between">
            <UDropdown
              class="inline-block text-left md:hidden"
              :ui="{ item: { padding: 'px-2 py-2' } }"
              :items="[
                locales.map((e) => {
                  return {
                    label: e.name,
                    icon: e.icon,
                    to: switchLocalePath(e.code),
                  };
                }),
              ]"
              mode="hover"
              :popper="{ placement: 'bottom-start' }"
            >
              <UButton
                variant="soft"
                size="md"
                :label="locales.find((x) => x.code === locale).name"
                :icon="locales.find((x) => x.code === locale).icon"
              />
            </UDropdown>

            <UButton size="md" class="md:hidden" :to="localePath('/contribute')"
              >{{ $t("contribute") }}
            </UButton>
          </div>
        </div>

        <div
          class="absolute right-0 top-0 flex items-center md:static md:ml-auto"
        >
          <a
            href="https://t.me/OldPersianGames"
            target="_blank"
            :title="$t('joinTG')"
            class="hover:animate-spin m-1.5"
          >
            <UIcon name="i-logos-telegram" class="block w-6 h-6" />
          </a>

          <UButton
            :icon="
              $colorMode.value === 'dark'
                ? 'i-heroicons-moon-20-solid'
                : 'i-heroicons-sun-20-solid'
            "
            color="gray"
            variant="ghost"
            aria-label="Theme"
            @click="
              $colorMode.preference =
                $colorMode.value === 'dark' ? 'light' : 'dark'
            "
          />

          <UDropdown
            class="md:inline-block hidden"
            :ui="{ item: { padding: 'px-2 py-2' } }"
            :items="[
              locales.map((e) => {
                return {
                  label: e.name,
                  icon:
                    e.code == 'fa'
                      ? 'i-emojione-flag-for-iran'
                      : 'i-emojione-flag-for-united-states',
                  to: switchLocalePath(e.code),
                };
              }),
            ]"
            mode="hover"
            :popper="{ placement: 'bottom-start' }"
          >
            <UButton
              variant="soft"
              size="md"
              :label="locales.find((x) => x.code === locale).name"
              :icon="locales.find((x) => x.code === locale).icon"
            />
          </UDropdown>
          <UButton
            size="md"
            class="hidden md:block"
            :to="localePath('/contribute')"
            >{{ $t("contribute") }}
          </UButton>
        </div>
      </div>
    </nav>
  </header>
  <main class="container mx-auto p-4 flex-1">
    <slot />
  </main>
  <div
    data-v-0a3a27a4=""
    :class="[
      'fixed z-50 bottom-0 w-full transition duration-200 ease-in-out',
      { 'translate-y-full': !showBottomDialog },
    ]"
    style="
      background: radial-gradient(
        50% 132.7% at 50% 60%,
        #232323 17.7177%,
        #bbbaba30 63.6637%
      );
    "
  >
    <div
      class="mt-px flex flex-col md:flex-row justify-center items-center w-full bg-white dark:bg-neutral-900 py-5 gap-3 text-center"
    >
      <p class="dark:text-mint text-sm font-medium">
        آرشیو این وبگاه از فایل‌های ارسالی بازدیدکنندگان جمع‌آوری شده است.
      </p>
      <UButton size="md" :to="localePath('/contribute')">
        شما هم می‌توانید کمک کنید
      </UButton>
    </div>
  </div>
  <footer
    class="border-t border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
    dir="ltr"
  >
    <div
      class="mx-auto w-full container px-2 py-2 flex justify-between items-center"
    >
      <div class="text-zinc-500 text-xs min-w-0">
        <p class="font-light">
          Founded with <span class="text-rose-600">❤️</span> by
          <NuxtLink
            :to="{
              path: localePath('/contributors'),
              hash: '#alihardan',
            }"
            class="text-primary-600 font-medium hover:underline"
            >Ali Hardan</NuxtLink
          >
          |
          <NuxtLink
            :to="localePath('/contributors/')"
            class="text-primary-600 font-medium hover:underline"
          >
            Contributors
          </NuxtLink>
          |
          <NuxtLink
            :to="localePath('/about/')"
            class="text-primary-600 font-medium hover:underline"
          >
            About
          </NuxtLink>
          |
          <NuxtLink
            :to="localePath('/links/')"
            class="text-primary-600 font-medium hover:underline"
          >
            Links
          </NuxtLink>
        </p>
        <p class="font-light whitespace-nowrap text-ellipsis overflow-hidden">
          <span class="font-medium">&#x3c;&#x2f;&#x3e;</span> on
          <a
            class="text-primary-600 font-medium hover:underline"
            target="_blank"
            href="https://github.com/oldpersiangames/oldpersiangames.github.io/"
            >GitHub</a
          >
          | DMCA Takedown:
          <a
            class="text-primary-600 font-medium hover:underline"
            href="mailto:oldpersiangames@gmail.com"
            >oldpersiangames@gmail.com</a
          >
        </p>
      </div>
      <a
        href="https://t.me/OldPersianGames"
        target="_blank"
        :title="$t('joinTG')"
        class="hover:animate-spin"
      >
        <UIcon name="i-logos-telegram" class="block w-6 h-6" />
      </a>
    </div>
  </footer>
</template>
<style>
/* body {
  transition: background-color 0.3s;
} */
#__nuxt {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

body {
  @apply antialiased font-sans text-gray-700 dark:text-gray-200 bg-zinc-100 dark:bg-gray-900;
}
</style>
