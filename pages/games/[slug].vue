<script setup>
import { filesize } from "filesize";
const { locale } = useI18n();
const localePath = useLocalePath();
const img = useImage();

const route = useRoute();

const { data: game } = await useAPI("/api/games/" + route.params.slug, {
  transform: (game) => {
    game.tgfiles = game.tgfiles.map(({ file_id, ...keepAttrs }) => keepAttrs);
    game.contributes = game.contributes.reduce((group, contribute) => {
      group[contribute.user.name] = group[contribute.user.name] ?? [];
      group[contribute.user.name].push(contribute.contribute);
      return group;
    }, {});
    return game;
  },
});

if (!game.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
    fatal: true,
  });
}

function pageTitleGenerator(game) {
  if (locale.value == "en") {
    return game.title_en
      ? "Download " + game.title_en
      : "Download " +
          game.games[0].title_en[0] +
          (game.games[0].dubbed ? " (Persian Dubbed)" : "") +
          (game.games[0].iranian ? " (Iranian Game)" : "") +
          (game.games[0].dubbed
            ? " | " +
              (game.publishers.length
                ? game.publishers.map((x) => x.title_en[0]).join(" & ")
                : "")
            : "");
  }
  return game.title_fa
    ? "دانلود " + game.title_fa
    : "دانلود " +
        (game.games[0].dubbed ? "نسخه دوبله فارسی " : "") +
        "بازی " +
        (game.games[0].iranian ? "ایرانی " : "") +
        game.games[0].title_fa[0] +
        (game.games[0].dubbed
          ? " | " +
            game.games[0].title_en[0] +
            (game.publishers.length
              ? " - " + game.publishers.map((x) => x.title_fa[0]).join(" و ")
              : "")
          : "");
}

const pageTitle = computed(() => pageTitleGenerator(game.value));

if (game.value.featured_image)
  defineOgImage({
    url: img(game.value.featured_image),
  });

useSeoMeta({
  title: pageTitle.value,
  description: pageTitle.value,
});
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader
        :title="pageTitle"
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
                  label: $t('games'),
                  to: localePath('/games'),
                  icon: 'i-iconoir-gamepad',
                },
                {
                  label: pageTitle,
                  to: route.path,
                },
              ]"
            />
          </UCard>
        </template>
      </UPageHeader>
      <UPage
        :ui="{
          wrapper: 'lg:grid-cols-12',
          center: {
            base: 'lg:col-span-9',
          },
          right: 'lg:col-span-3',
        }"
      >
        <UPageBody class="text-sm" prose>
          <div>
            <UCard
              class="not-prose"
              :ui="{
                body: {
                  padding: '',
                },
              }"
            >
              <UAlert
                v-if="game.selling"
                :description="$t('gameSelling')"
                color="violet"
              />

              <UAlert
                v-if="
                  game.producers.find((e) => e.id == 11) ||
                  game.producers.find((e) => e.id == 12)
                "
                color="violet"
              >
                <template #description>
                  برای رعایت حق تولیدکننده اصلی این اثر (شرکت‌های
                  <span class="font-bold">پارس گیم</span> و
                  <span class="font-bold">سایبر</span>) لینک‌های دانلود از دسترس
                  خارج شده‌اند. برای تهیه قانونی بازی به پیج اینستای تهیه‌کننده
                  مراجعه کنید:
                  <a
                    class="font-bold text-amber-200 underline dark:text-amber-900"
                    href="https://www.instagram.com/saeid.gholami27/"
                    target="_blank"
                    dir="ltr"
                    >@saeid.gholami27</a
                  >
                </template>
              </UAlert>

              <UAlert
                v-if="game.publishers.find((e) => e.id == 75) || game.slug=='the-lost-land-barareh-vijehpardazpars'"
                color="violet"
              >
                <template #description>
                  فایل این اثر برای رعایت حقوق تولیدکننده و ناشر اصلی از دسترس
                  خارج شده است. پوزش می‌طلبیم.
                </template>
              </UAlert>
              <UAlert
                v-if="!game.ia_id && !game.selling"
                color="primary"
                variant="soft"
              >
                <template #description>
                  <div
                    v-html="
                      $t('downloadOnlyFromTG', {
                        tgchannel:
                          '<a href=\'https://t.me/OldPersianGames\' class=\'text-primary-600 font-medium\'>@OldPersianGames</a>',
                      })
                    "
                  ></div>
                </template>
              </UAlert>
              <UTable
                class="text-center"
                :ui="{
                  th: { base: 'text-center rtl:text-center' },
                  td: { size: 'text-xs' },
                }"
                :rows="game.files || game.tgfiles"
                :columns="[
                  {
                    key: 'file_name',
                    label: $t('fileName'),
                  },
                  {
                    key: 'file_size',
                    label: $t('fileSize'),
                  },

                  ...(!game.files
                    ? [
                        {
                          key: 'date',
                          label: $t('uploadedAt'),
                        },
                      ]
                    : []),

                  ...(!!game.ia_id &&
                  !(
                    game.producers.find((e) => e.id == 11) ||
                    game.producers.find((e) => e.id == 12) ||
                    game.producers.find((e) => e.id == 75) ||
                    game.slug=='the-lost-land-barareh-vijehpardazpars'
                  )
                    ? [
                        {
                          key: 'actions',
                        },
                      ]
                    : []),
                ]"
              >
                <template #file_name-data="{ getRowData }">
                  <span
                    dir="ltr"
                    class="font-medium text-gray-700 dark:text-gray-300"
                    >{{ getRowData() }}</span
                  >
                </template>
                <template #file_size-data="{ getRowData }">
                  <span dir="ltr">{{ filesize(getRowData()) }}</span>
                </template>
                <template #date-data="{ getRowData }">
                  <span dir="ltr">{{ getRowData() }}</span>
                </template>
                <template #actions-data="{ row }">
                  <UButton
                    :to="`https://archive.org/download/${encodeURIComponent(
                      game.ia_id,
                    )}/${encodeURIComponent(row.file_name)}`"
                    target="_blank"
                    icon="i-heroicons-inbox-arrow-down"
                    variant="ghost"
                  />
                </template>
              </UTable>
              <UAlert
                v-if="
                  !!game.ia_id &&
                  !(
                    game.producers.find((e) => e.id == 11) ||
                    game.producers.find((e) => e.id == 12) ||
                    game.producers.find((e) => e.id == 75) ||
                    game.slug=='the-lost-land-barareh-vijehpardazpars'
                  )
                "
                color="primary"
                variant="soft"
              >
                <template #description>
                  {{ $t("tgIntroUnderFiles") }}
                  <a
                    href="https://t.me/OldPersianGames"
                    class="text-primary-600 font-medium"
                    dir="ltr"
                    >@OldPersianGames</a
                  >
                </template>
              </UAlert>
              <UAlert
                icon="i-heroicons-exclamation-triangle"
                v-if="game['notes_' + locale]"
                color="primary"
                variant="soft"
              >
                <template #description>
                  <div v-html="game['notes_' + locale]"></div>
                </template>
              </UAlert>

              <UAlert
                icon="i-heroicons-exclamation-triangle"
                v-if="game.publishers.some((e) => e.id == 15)"
                color="red"
                variant="soft"
              >
                <template #description>
                  <p>
                    این بازی از شرکت سریرگیم است. بسیاری از کاربران سایت با
                    مشکلاتی در هنگام نصب بازی‌های سریر مواجه شده‌اند. شاید این
                    راهنما کمک کند:
                  </p>
                  <blockquote style="font-style: italic">
                    راهی برای کپی فایل‌های بازی سریر بدون استفاده از فایل ستاپ
                    وجود داره:
                    <br />
                    داخل دیسک اول فایلی به نام Setup.cab وجود داره. این فایل رو
                    با WinRAR باز کنید. از شما پسورد میخواد؛ پسوردش اینه:
                    <br />
                    Sarir_CO_1
                    <br />
                    واضحه که باید اکسترکت کنیدش (در یکی از پوشه‌های مورد نظر
                    سیستم خودتون). بعد توی دیسک دوم، فایل Setup2.cab رو هم کنار
                    فایل‌های اکسترکت شده‌ی قبلی اکسترکت کنید (رمزش همونه).
                    <br />
                    بازی آمادس. (در محل اکسترکت شده)
                  </blockquote>
                </template>
              </UAlert>

              <UAlert
                icon="i-heroicons-exclamation-triangle"
                v-if="game['notes_' + locale]"
                color="primary"
                variant="soft"
              >
                <template #description>
                  <div v-html="game['notes_' + locale]"></div>
                </template>
              </UAlert>

              <UAlert
                icon="i-heroicons-exclamation-triangle"
                v-if="
                  game['defects_' + locale] && game['defects_' + locale].length
                "
                color="primary"
                variant="soft"
                :title="$t('defectsIntro')"
              >
                <template #description>
                  <ul
                    class="mt-2 list-inside list-disc text-xs marker:text-red-600"
                  >
                    <li v-for="defect in game['defects_' + locale]">
                      {{ defect }}
                    </li>
                  </ul>
                </template>
              </UAlert>
            </UCard>

            <div
              v-html="
                (locale == 'en'
                  ? game.content_en ?? game.content_fa
                  : game.content_fa) ?? ''
              "
            ></div>
          </div>

          <hr />

          <div v-if="game.related.length">
            <h3>
              {{ $t("otherReleases") }}
            </h3>
            <ul>
              <li v-for="related in game.related">
                <NuxtLink :to="localePath('/games/' + related.slug)">{{
                  pageTitleGenerator(related)
                }}</NuxtLink>
              </li>
            </ul>
          </div>

          <div>
            <h3>
              {{ $t("pictures") }}
            </h3>
            <div
              class="not-prose flex flex-wrap justify-center gap-2 md:justify-start"
            >
              <a v-for="photo in game.photos" target="_blank" :href="img(photo)"
                ><NuxtImg class="h-full w-60" width="264" :src="photo"
              /></a>
            </div>
          </div>

          <div v-if="game.links.length">
            <h3>
              {{ $t("externalLinks") }}
            </h3>
            <ul>
              <li v-for="link in game.links">
                <a :href="link.url" target="_blank">{{ link.title_fa }}</a>
              </li>
            </ul>
          </div>

          <div>
            <h3>
              {{ $t("contributors") }}
            </h3>
            <div class="flex flex-wrap items-center gap-2">
              <UBadge
                v-for="(contribute, username) in game.contributes"
                color="primary"
                variant="soft"
                size="md"
                :ui="{
                  base: 'inline-flex items-center gap-2',
                  size: {
                    md: 'px-4 py-2',
                  },
                }"
              >
                <NuxtLink
                  :to="localePath('/contributors') + '#' + username"
                  dir="ltr"
                  >@{{ username }}</NuxtLink
                >
                {{ contribute.join($t("joinCharacter")) }}</UBadge
              >
            </div>
          </div>
        </UPageBody>

        <template #right>
          <UAside
            :ui="{
              wrapper: 'block',
            }"
            class="text-xs"
          >
            <a
              v-if="game.featured_image"
              target="_blank"
              :href="img(game.featured_image)"
              ><NuxtImg class="mx-auto" width="264" :src="game.featured_image"
            /></a>
            <ul class="mt-4">
              <template
                v-for="detail in [
                  {
                    label: $t('primaryTitle'),
                    value:
                      game['title_' + locale] ??
                      game.games[0]['title_' + locale].join(
                        $t('joinCharacter'),
                      ),
                  },
                  {
                    label: $t('secondaryTitle'),
                    value:
                      game['title_' + (locale == 'en' ? 'fa' : 'en')] ??
                      game.games[0][
                        'title_' + (locale == 'en' ? 'fa' : 'en')
                      ].join(locale == 'en' ? '، ' : ', '),
                  },
                  {
                    label: $t('producer'),
                    value: game.producers
                      .map((x) => x['title_' + locale][0])
                      .join($t('joinCharacter')),
                  },
                  {
                    label: $t('publisher'),
                    value: game.publishers
                      .map((x) => x['title_' + locale][0])
                      .join($t('joinCharacter')),
                  },
                  {
                    label: $t('releaseDate'),
                    value: game.release_dates
                      ?.map((e) =>
                        new Date(e).toLocaleDateString(
                          locale == 'en' ? 'en-CA' : locale,
                        ),
                      )
                      ?.join($t('joinCharacter')),
                  },

                  {
                    label: $t('relasedOn'),
                    value: game['released_on_' + locale]?.join(
                      $t('joinCharacter'),
                    ),
                  },
                  {
                    label: $t('platform'),
                    value: game.platforms.join(', '),
                  },
                ]"
              >
                <li v-if="detail.value" class="mt-2 flex items-center gap-2">
                  <strong class="whitespace-nowrap py-1">{{
                    detail.label
                  }}</strong>
                  <div
                    class="h-px flex-1 bg-gray-300 dark:bg-neutral-700"
                  ></div>
                  <div
                    class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {{ detail.value }}
                  </div>
                </li>
              </template>

              <li
                class="mt-4 rounded bg-gray-100 px-2 py-2 text-right dark:bg-gray-800"
                dir="rtl"
              >
                <strong
                  class="text-medium rounded-xl text-gray-800 dark:text-gray-100"
                  >شامل:</strong
                >
                <div class="text-gray-500 dark:text-gray-400">
                  <ul class="mt-2 max-w-md list-inside list-disc space-y-1">
                    <li v-for="g in game.games">
                      {{ g.title_fa.join("، ") }}
                      <template v-if="g.dubbed">(دوبله شده به فارسی)</template>
                      <template v-if="g.iranian">(بازی ایرانی)</template>
                      <template v-if="g.modified">(مادسازی شده)</template>
                      <template v-if="g.subtitle"
                        >(دارای زیرنویس فارسی)</template
                      >
                    </li>
                  </ul>
                </div>
              </li>
              <li
                class="mt-4 rounded bg-gray-100 px-2 py-2 text-left dark:bg-gray-800"
                dir="ltr"
              >
                <strong
                  class="text-medium rounded-xl text-gray-800 dark:text-gray-100"
                  >Includes:</strong
                >
                <div class="text-gray-500 dark:text-gray-400">
                  <ul class="mt-2 max-w-md list-inside list-disc space-y-1">
                    <li v-for="g in game.games">
                      {{ g.title_en.join(", ") }}
                      <template v-if="g.dubbed">(Persian Dubbed)</template>
                      <template v-if="g.iranian">(Iranian Game)</template>
                      <template v-if="g.modified">(Modified)</template>
                      <template v-if="g.subtitle"
                        >(دارای زیرنویس فارسی)</template
                      >
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </UAside>
        </template>
      </UPage>
    </UPage>
  </UContainer>
</template>
