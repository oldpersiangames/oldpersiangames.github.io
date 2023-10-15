<script setup>
import { filesize } from "filesize";
const { locale } = useI18n();
const localePath = useLocalePath();

const route = useRoute();

const { data: game } = await useFetch(
  "https://backend.oldpersiangames.org/api/games/websiteShow/" + route.params.slug
  , {
    transform: (game) => {
      game.tgfiles = game.tgfiles.map(({ file_id, ...keepAttrs }) => keepAttrs)
      game.contributes = game.contributes.reduce((group, contribute) => {
        group[contribute.user.name] = group[contribute.user.name] ?? [];
        group[contribute.user.name].push(contribute.contribute);
        return group;
      }, {})
      return game
    }
  });

if (!game.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true })
}

const title = computed(() => {
  if (!game.value) return "";
  if (locale.value == 'en') {
    return game.value.title_en ?? game.value.collection_title_en ? 'Download ' + game.value.collection_title_en : 'Download '
      +
      game.value.games[0].title_en[0] + (game.value.games[0].dubbed ? ' (Persian Dubbed)' : '') + (game.value.games[0].iranian ? ' (Iranian Game)' : '') +
      (game.value.games[0].dubbed ? ' | ' + (game.value.publishers.length ? game.value.publishers.map(x => x.title_en[0]).join(' & ') : '') : '')
  }
  return game.value.title_fa ?? game.value.collection_title_fa ? 'دانلود ' + game.value.collection_title_fa : 'دانلود '
    +
    (game.value.games[0].dubbed ? 'نسخه دوبله فارسی ' : '') + 'بازی ' +
    (game.value.games[0].iranian ? 'ایرانی ' : '') + game.value.games[0].title_fa[0] +
    (game.value.games[0].dubbed ? ' | ' + game.value.games[0].title_en[0] + (game.value.publishers.length ? ' - ' + game.value.publishers.map(x => x.title_fa[0]).join(' و ') : '') : '')
});


</script>

<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="title" />
  </Head>

  <h1 class="mt-4 text-center text-xl font-bold leading-none tracking-tight text-gray-900 dark:text-white">{{
    title }}</h1>
  <div class="mt-8 flex flex-col md:flex-row-reverse gap-6">
    <div class="w-full md:w-96 max-w-full px-6 py-4 shadow-md rounded-lg bg-white dark:bg-gray-800">
      <nuxt-img v-if="game.photos" class="mx-auto" width="264"
        :src="'/gamePhotos/' + game.id.toString() + '/' + game.photos[0].id.toString() + '.jpg'" />
      <ul class="text-xs mt-4 ">
        <li class="flex items-center gap-2">
          <strong class="py-1  whitespace-nowrap">{{ $t('primaryTitle') }}</strong>
          <div class="flex-1 h-px bg-gray-300 dark:bg-neutral-700"></div>
          <span class="text-gray-500 dark:text-gray-400">
            {{ game["collection_title_" + locale] ?? game.games[0]['title_' + locale]
              .join($t('joinCharacter')) }}
          </span>
        </li>
        <li class="flex items-center mt-2 gap-2">
          <strong class="py-1  whitespace-nowrap">{{ $t('secondaryTitle') }}</strong>
          <div class="flex-1 h-px bg-gray-300 dark:bg-neutral-700"></div>
          <span class="text-gray-500 dark:text-gray-400" style="direction:ltr;text-align:left">{{
            game['collection_title_' + (locale == 'en' ? 'fa' : 'en')]
            ??
            game.games[0]['title_' + (locale == 'en' ? 'fa' : 'en')].join(locale == 'en' ? '، ' : ', ')
          }}</span>
        </li>
        <li v-if="game?.producers?.length" class="flex items-center mt-2 gap-2">
          <strong class="py-1  whitespace-nowrap">{{ $t('producer') }}</strong>
          <div class="flex-1 h-px bg-gray-300 dark:bg-neutral-700"></div>
          <span class="text-gray-500 dark:text-gray-400">{{ game.producers.map(x =>
            x["title_" + locale][0]).join($t('joinCharacter')) }}</span>
        </li>
        <li v-if="game?.publishers?.length" class="flex items-center mt-2 gap-2">
          <strong class="py-1  whitespace-nowrap">{{ $t('publisher') }}</strong>
          <div class="flex-1 h-px bg-gray-300 dark:bg-neutral-700"></div>
          <span class="text-gray-500 dark:text-gray-400">{{ game.publishers.map(x =>
            x["title_" + locale][0]).join($t('joinCharacter')) }}</span>
        </li>
        <li v-if="game?.release_dates?.length" class="flex items-center mt-2 gap-2">
          <strong class="py-1  whitespace-nowrap">{{ $t('releaseDate') }}</strong>
          <div class="flex-1 h-px bg-gray-300 dark:bg-neutral-700"></div>
          <span class="text-gray-500 dark:text-gray-400">{{ game.release_dates.map(e => (new
            Date(e)).toLocaleDateString(locale == 'en' ? 'en-CA' : locale)).join($t('joinCharacter')) }}</span>
        </li>
        <li v-if="game['released_on_' + locale]?.length" class="flex items-center mt-2 gap-2">
          <strong class="py-1  whitespace-nowrap">{{ $t('relasedOn') }}</strong>
          <div class="flex-1 h-px bg-gray-300 dark:bg-neutral-700"></div>
          <span class="text-gray-500 dark:text-gray-400">{{ game['released_on_' + locale].join($t('joinCharacter'))
          }}</span>
        </li>
        <li v-if="game?.platforms?.length" class="flex items-center mt-2 gap-2">
          <strong class="py-1  whitespace-nowrap">{{ $t('platform') }}</strong>
          <div class="flex-1 h-px bg-gray-300 dark:bg-neutral-700"></div>
          <span class="text-gray-500 dark:text-gray-400">{{ game.platforms.join(', ') }}</span>
        </li>
        <li class="bg-gray-100 dark:bg-gray-900 rounded mt-4 py-2 px-2" dir="rtl" style="text-align:right">
          <strong class="text-medium text-gray-800 dark:text-gray-100 rounded-xl">شامل:</strong>
          <div class="text-gray-500 dark:text-gray-400">
            <ul class="mt-2 max-w-md space-y-1  list-disc list-inside ">
              <li v-for="g in game.games">{{ g.title_fa.join('، ') }}
                <template v-if="g.dubbed">(دوبله شده به فارسی)</template>
                <template v-if="g.iranian">(بازی ایرانی)</template>
                <template v-if="g.modified">(مادسازی شده)</template>
                <template v-if="g.subtitle">(دارای زیرنویس فارسی)</template>
              </li>
            </ul>
          </div>
        </li>
        <li class="bg-gray-100 dark:bg-gray-900 rounded mt-4 py-2 px-2" dir="ltr" style="text-align:left">
          <strong class="text-medium text-gray-800 dark:text-gray-100 rounded-xl">Includes:</strong>
          <div class="text-gray-500 dark:text-gray-400">
            <ul class="mt-2 max-w-md space-y-1  list-disc list-inside ">
              <li v-for="g in game.games">{{ g.title_en.join(', ') }}
                <template v-if="g.dubbed">(Persian Dubbed)</template>
                <template v-if="g.iranian">(Iranian Game)</template>
                <template v-if="g.modified">(Modified)</template>
                <template v-if="g.subtitle">(دارای زیرنویس فارسی)</template>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div class="flex-1">
      <div class="overflow-hidden shadow-md rounded-lg bg-white dark:bg-gray-800">
        <table class="w-full text-xs text-center text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

            <tr v-if="game.slug === 'mountaineer-hi-vu'">
              <th class="bg-indigo-500 text-white p-4" colspan="4">فایل این اثر به درخواست سازنده از دسترس خارج شده است.
              </th>
            </tr>
            <tr v-else-if="game.selling">
              <th class="bg-indigo-500 text-white p-4" colspan="4">{{ $t('gameSelling') }}</th>
            </tr>
            <tr v-if="!game.selling && !game.ia_id">
              <th class="bg-indigo-500 text-white p-4" colspan="4"
                v-html="$t('downloadOnlyFromTG', { tgchannel: '<a href=\'https://t.me/OldPersianGames\' class=\'text-yellow-400\'>@OldPersianGames</a>' })">
              </th>
            </tr>
            <tr>
              <th scope="col" class="px-2 py-3">
                {{ $t('fileName') }}
              </th>
              <th scope="col" class="px-2 py-3">
                {{ $t('fileSize') }}
              </th>
              <th scope="col" class="px-2 py-3" v-if="!game.files">
                {{ $t('uploadedAt') }}
              </th>
              <th scope="col" class="py-3" v-if="!game.selling && game.ia_id">

              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="file, index in game.files || game.tgfiles" :key="index"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th scope="row" class="px-2 py-4 font-medium text-gray-900 break-all dark:text-white">
                {{ file.file_name }}
              </th>
              <td class="px-2 py-4" dir="ltr">
                {{ filesize(file.file_size) }}
              </td>
              <td class="px-2 py-4" v-if="!game.files" dir="ltr">
                {{ file.date }}
              </td>
              <td class="px-2 py-4" v-if="!game.selling && game.ia_id">
                <a :href="`https://archive.org/download/${encodeURIComponent(game.ia_id)}/${encodeURIComponent(file.file_name)}`"
                  target="_blank" class="font-medium text-primary-600 dark:text-primary-500 hover:underline">
                  <UIcon class="w-6 h-6 text-primary-600" name="i-heroicons-inbox-arrow-down" />
                </a>

              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr v-if="!game.selling">
              <td class="bg-white shadow dark:bg-gray-800 text-left text-xs px-6 py-4" colspan="4">{{
                $t('tgIntroUnderFiles') }} <a href="https://t.me/OldPersianGames" class="text-red-600 font-bold"
                  dir="ltr">@OldPersianGames</a></td>
            </tr>
            <tr v-if="game.notes_fa">
              <th
                class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 font-light"
                dir="rtl" colspan="4">⚠️ {{
                  game.notes_fa
                }}
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="mt-4 prose prose-primary dark:prose-invert"
        v-html="(locale == 'en' ? game.content_en ?? game.content_fa : game.content_fa) ?? ''"></div>
    </div>
  </div>
  <hr class="h-px my-8 bg-gray-300 border-0 dark:bg-gray-700">
  <h3 class="text-lg font-bold mt-8 mb-4 leading-none tracking-tight text-gray-900 dark:text-white">{{ $t('pictures') }}
    <span class="block w-14 h-0.5 bg-primary-600 mt-2"></span>
  </h3>
  <div class="flex gap-2 flex-wrap justify-center md:justify-start">
    <nuxt-img v-for="photo in game.photos" class="h-full w-60" width="264" :src="'/gamePhotos/' +
      game.id +
      '/' +
      photo.id +
      '.jpg'
      " />
  </div>
  <template v-if="game.links.length">
    <h3 class="text-lg font-bold my-4 leading-none tracking-tight text-gray-900 dark:text-white">{{ $t('externalLinks')
    }}
      <span class="block w-14 h-0.5 bg-primary-600 mt-2"></span>
    </h3>
    <ul>
      <li v-for="link in game.links"><a :href="link.url" target="_blank"
          class="font-light text-sm text-primary-600 dark:text-primary-500 hover:underline">{{ link.title_fa }}</a></li>
    </ul>
  </template>
  <h3 class="text-lg font-bold my-4 leading-none tracking-tight text-gray-900 dark:text-white">{{ $t('contributors') }}
    <span class="block w-14 h-0.5 bg-primary-600 mt-2"></span>
  </h3>
  <div class="flex flex-wrap items-center gap-2 text-sm">
    <div v-for="(contribute, username) in game.contributes"
      class="py-2 px-4 shadow-md sm:rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-400 rounded-xl ">
      <NuxtLink :to="{ path: localePath('/contributors') + '/', hash: '#' + username }"
        class="text-primary-600 hover:underline font-medium" dir="ltr">@{{ username }}</NuxtLink> {{
          contribute.join($t('joinCharacter')) }}
    </div>
  </div>
</template>
