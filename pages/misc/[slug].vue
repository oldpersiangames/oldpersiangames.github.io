<script setup>
import { filesize } from "filesize";
const { locale } = useI18n();
const localePath = useLocalePath();
const img = useImage();

const route = useRoute();

const { data: item } = await useFetch(
  "http://localhost:8000/api/items/websiteShow/" + route.params.slug,
  {
    transform: (item) => {
      item.tgfiles = item.tgfiles.map(({ file_id, ...keepAttrs }) => keepAttrs);
      item.contributes = item.contributes.reduce((group, contribute) => {
        group[contribute.user.name] = group[contribute.user.name] ?? [];
        group[contribute.user.name].push(contribute.contribute);
        return group;
      }, {});
      return item;
    },
  }
);

if (!item.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
    fatal: true,
  });
}

const title = computed(() => {
  if (!item.value) return "";
  if (locale.value == "en") {
    return item.value.title_en;
  }
  return item.value.title_fa;
});

if (item.value.photos)
  useSeoMeta({
    ogImage: img(
      "/item-photos/" +
        item.value.id.toString() +
        "/" +
        item.value.photos[0].id.toString() +
        ".jpg"
    ),
    "twitter:image:src": img(
      "/item-photos/" +
        item.value.id.toString() +
        "/" +
        item.value.photos[0].id.toString() +
        ".jpg"
    ),
  });
</script>

<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="title" />
  </Head>

  <h1
    class="mt-4 text-center text-xl font-bold leading-none tracking-tight text-gray-900 dark:text-white"
  >
    {{ title }}
  </h1>
  <div class="mt-8 flex flex-col md:flex-row-reverse gap-6">
    <div
      class="w-full md:w-96 max-w-full px-6 py-4 shadow-md rounded-lg bg-white dark:bg-gray-800"
    >
      <a
        v-if="item.photos"
        target="_blank"
        :href="
          img(
            '/item-photos/' +
              item.id.toString() +
              '/' +
              item.photos[0].id.toString() +
              '.jpg'
          )
        "
        ><nuxt-img
          class="mx-auto"
          width="264"
          :src="
            '/item-photos/' +
            item.id.toString() +
            '/' +
            item.photos[0].id.toString() +
            '.jpg'
          "
      /></a>
      <ul class="text-xs mt-4">
        <li class="flex items-center gap-2">
          <strong class="py-1 whitespace-nowrap">{{
            $t("primaryTitle")
          }}</strong>
          <div class="flex-1 h-px bg-gray-300 dark:bg-neutral-700"></div>
          <span class="text-gray-500 dark:text-gray-400">
            {{ item["title_" + locale] }}
          </span>
        </li>
        <li class="flex items-center mt-2 gap-2">
          <strong class="py-1 whitespace-nowrap">{{
            $t("secondaryTitle")
          }}</strong>
          <div class="flex-1 h-px bg-gray-300 dark:bg-neutral-700"></div>
          <span
            class="text-gray-500 dark:text-gray-400"
            style="direction: ltr; text-align: left"
            >{{ item["title_" + (locale == "en" ? "fa" : "en")] }}</span
          >
        </li>
        <li
          v-if="item?.publishers?.length"
          class="flex items-center mt-2 gap-2"
        >
          <strong class="py-1 whitespace-nowrap">{{ $t("publisher") }}</strong>
          <div class="flex-1 h-px bg-gray-300 dark:bg-neutral-700"></div>
          <span class="text-gray-500 dark:text-gray-400">{{
            item.publishers
              .map((x) => x["title_" + locale][0])
              .join($t("joinCharacter"))
          }}</span>
        </li>
        <li
          v-if="item?.release_dates?.length"
          class="flex items-center mt-2 gap-2"
        >
          <strong class="py-1 whitespace-nowrap">{{
            $t("releaseDate")
          }}</strong>
          <div class="flex-1 h-px bg-gray-300 dark:bg-neutral-700"></div>
          <span class="text-gray-500 dark:text-gray-400">{{
            item.release_dates
              .map((e) =>
                new Date(e).toLocaleDateString(
                  locale == "en" ? "en-CA" : locale
                )
              )
              .join($t("joinCharacter"))
          }}</span>
        </li>
        <li
          v-if="item['released_on_' + locale]?.length"
          class="flex items-center mt-2 gap-2"
        >
          <strong class="py-1 whitespace-nowrap">{{ $t("relasedOn") }}</strong>
          <div class="flex-1 h-px bg-gray-300 dark:bg-neutral-700"></div>
          <span class="text-gray-500 dark:text-gray-400">{{
            item["released_on_" + locale].join($t("joinCharacter"))
          }}</span>
        </li>
      </ul>
    </div>
    <div class="flex-1">
      <div
        class="overflow-hidden shadow-md rounded-lg bg-white dark:bg-gray-800"
      >
        <table
          class="w-full text-xs text-center text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr v-if="item.selling">
              <th class="bg-indigo-500 text-white p-4" colspan="4">
                {{ $t("gameSelling") }}
              </th>
            </tr>
            <tr v-if="!item.ia_id && !item.selling">
              <th
                class="bg-indigo-500 text-white p-4"
                colspan="4"
                v-html="
                  $t('downloadOnlyFromTG', {
                    tgchannel:
                      '<a href=\'https://t.me/OldPersianGames\' class=\'text-yellow-400\'>@OldPersianGames</a>',
                  })
                "
              ></th>
            </tr>
            <tr>
              <th scope="col" class="px-2 py-3">
                {{ $t("fileName") }}
              </th>
              <th scope="col" class="px-2 py-3">
                {{ $t("fileSize") }}
              </th>
              <th scope="col" class="px-2 py-3" v-if="!item.files">
                {{ $t("uploadedAt") }}
              </th>
              <th scope="col" class="py-3" v-if="item.ia_id"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(file, index) in item.files || item.tgfiles"
              :key="index"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                class="px-2 py-4 font-medium text-gray-900 break-all dark:text-white"
              >
                {{ file.file_name }}
              </th>
              <td class="px-2 py-4" dir="ltr">
                {{ filesize(file.file_size) }}
              </td>
              <td class="px-2 py-4" v-if="!item.files" dir="ltr">
                {{ file.date }}
              </td>
              <td class="px-2 py-4" v-if="item.ia_id">
                <a
                  :href="`https://archive.org/download/${encodeURIComponent(
                    item.ia_id
                  )}/${encodeURIComponent(file.file_name)}`"
                  target="_blank"
                  class="font-medium text-primary-600 dark:text-primary-500 hover:underline"
                >
                  <UIcon
                    class="w-6 h-6 text-primary-600"
                    name="i-heroicons-inbox-arrow-down"
                  />
                </a>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr v-if="item.ia_id">
              <td
                class="bg-white shadow dark:bg-gray-800 text-left text-xs px-6 py-4"
                colspan="4"
              >
                {{ $t("tgIntroUnderFiles") }}
                <a
                  href="https://t.me/OldPersianGames"
                  class="text-red-600 font-bold"
                  dir="ltr"
                  >@OldPersianGames</a
                >
              </td>
            </tr>
            <tr v-if="item.notes_fa">
              <th
                class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 font-light"
                dir="rtl"
                colspan="4"
              >
                ⚠️ {{ item.notes_fa }}
              </th>
            </tr>
            <tr
              v-if="
                item['defects_' + locale] && item['defects_' + locale].length
              "
            >
              <th
                class="text-left p-4 mb-4 text-sm rounded-lg bg-yellow-50 dark:bg-gray-800 font-light"
                colspan="4"
              >
                <p class="dark:text-yellow-300 text-yellow-800">
                  ⚠️ {{ $t("defectsIntro") }}
                </p>
                <ul
                  class="list-disc mt-2 list-inside marker:text-red-600 text-xs"
                >
                  <li v-for="defect in item['defects_' + locale]">
                    {{ defect }}
                  </li>
                </ul>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div
        class="mt-4 prose prose-primary dark:prose-invert max-w-none"
        v-html="
          (locale == 'en'
            ? item.content_en ?? item.content_fa
            : item.content_fa) ?? ''
        "
      ></div>
    </div>
  </div>
  <hr class="h-px my-8 bg-gray-300 border-0 dark:bg-gray-700" />
  <h3
    class="text-lg font-bold mt-8 mb-4 leading-none tracking-tight text-gray-900 dark:text-white"
  >
    {{ $t("pictures") }}
    <span class="block w-14 h-0.5 bg-primary-600 mt-2"></span>
  </h3>
  <div class="flex gap-2 flex-wrap justify-center md:justify-start">
    <a
      v-for="photo in item.photos"
      target="_blank"
      :href="img('/item-photos/' + item.id + '/' + photo.id + '.jpg')"
      ><nuxt-img
        class="h-full w-60"
        width="264"
        :src="'/item-photos/' + item.id + '/' + photo.id + '.jpg'"
    /></a>
  </div>
  <template v-if="item.links.length">
    <h3
      class="text-lg font-bold my-4 leading-none tracking-tight text-gray-900 dark:text-white"
    >
      {{ $t("externalLinks") }}
      <span class="block w-14 h-0.5 bg-primary-600 mt-2"></span>
    </h3>
    <ul>
      <li v-for="link in item.links">
        <a
          :href="link.url"
          target="_blank"
          class="font-light text-sm text-primary-600 dark:text-primary-500 hover:underline"
          >{{ link.title_fa }}</a
        >
      </li>
    </ul>
  </template>
  <h3
    class="text-lg font-bold my-4 leading-none tracking-tight text-gray-900 dark:text-white"
  >
    {{ $t("contributors") }}
    <span class="block w-14 h-0.5 bg-primary-600 mt-2"></span>
  </h3>
  <div class="flex flex-wrap items-center gap-2 text-sm">
    <div
      v-for="(contribute, username) in item.contributes"
      class="py-2 px-4 shadow-md sm:rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-400 rounded-xl"
    >
      <NuxtLink
        :to="{ path: localePath('/contributors'), hash: '#' + username }"
        class="text-primary-600 hover:underline font-medium"
        dir="ltr"
        >@{{ username }}</NuxtLink
      >
      {{ contribute.join($t("joinCharacter")) }}
    </div>
  </div>
</template>
