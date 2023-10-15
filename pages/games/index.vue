<script setup>
import uFuzzy from "@leeoniya/ufuzzy"

const uf = new uFuzzy({
  unicode: true,
  interSplit: "[^\\p{L}\\d']+",
  intraSplit: "\\p{Ll}\\p{Lu}",
  intraBound: "\\p{L}\\d|\\d\\p{L}|\\p{Ll}\\p{Lu}",
  intraChars: "[\\p{L}\\d']",
  intraContr: "'\\p{L}{1,2}\\b",

  intraIns: 2,
});

const localePath = useLocalePath();
const { t, locale } = useI18n();
const platforms = [
  { id: 1, name: 'Windows' },
  { id: 2, name: 'PS2' },
  { id: 3, name: 'PS1' },
  { id: 4, name: 'Android' },
  { id: 5, name: 'Xbox 360' },
]
const types = [
  { id: 'dubbed', name: t('dubbed') },
  { id: 'iranian', name: t('iranian') },
  { id: 'modified', name: t('modified') },
]
const { pending: gamesPending, data: games } = await useLazyFetch(
  "https://backend.oldpersiangames.org/api/games/websiteIndex"
);

const { pending: companiesPending, data: companies } = await useLazyFetch(
  "https://backend.oldpersiangames.org/api/companies/websiteIndex"
);


const pageCount = ref(50);
const page = ref(process.client ? JSON.parse(sessionStorage.getItem("gamesPage")) ?? 1 : 1);

const defaultFilter = {
  q: "",
  selectedCompanies: [],
  selectedPlatforms: [],
  selectedTypes: [],
};
const filter = ref(
  process.client
    ? JSON.parse(sessionStorage.getItem("gamesFilter")) ?? defaultFilter
    : defaultFilter
);

const gamesSearchIndex = computed(() => {
  return games.value.map(r => r.games.map(m => m.title_fa.join('¦') + '¦' + m.title_en.join('¦')).join('¦'))
})

const filteredGames = computed(() => {
  if (!games.value) return [];
  let filterSource = games.value;
  if (filter.value.q) {
    let idxs = uf.search(gamesSearchIndex.value, filter.value.q, true);
    if (idxs)
      filterSource = idxs[0].map(i => games.value[i]);
  }
  return filterSource.filter(
    (item) =>
      (!filter.value.selectedPlatforms.length || item.platforms.some(el => filter.value.selectedPlatforms.map((e) => e.name).includes(el))) &&
      (!filter.value.selectedCompanies.length || item.publishers.map(x => x.id).some(el => filter.value.selectedCompanies.map((e) => e.id).includes(el))) &&
      (!filter.value.selectedTypes.length || filter.value.selectedTypes.map((e) => e.id).some(el => item.games.some(x => x[el])))
  );
});

const rows = computed(() => {
  if (!games.value) return [];
  return filteredGames.value.slice((page.value - 1) * pageCount.value, (page.value) * pageCount.value)
});


if (process.client) {
  watch(
    filter,
    (newFilter) => {
      page.value = 1;
      sessionStorage.setItem("gamesFilter", JSON.stringify(newFilter));
    },
    { deep: true }
  );
  watch(page, (newPage) => {
    sessionStorage.setItem("gamesPage", JSON.stringify(newPage));
  });
}

</script>
<template>
  <Head>
    <Title>Games</Title>
    <Meta name="description" content="List of all Persian video games" />
  </Head>
  <div v-if="gamesPending || companiesPending">
    Loading ...
  </div>
  <div v-else class="shadow-md rounded-lg bg-white dark:bg-gray-800">

    <div class="py-4 px-4 flex-col md:flex-row flex items-stretch md:items-start flex-wrap gap-x-2 gap-y-2">

      <UInput v-model="filter.q" :placeholder="$t('search')" icon="i-heroicons-magnifying-glass-20-solid" color="white"
        :ui="{ icon: { trailing: { pointer: '' } } }">
        <template #trailing>
          <UButton v-show="filter.q !== ''" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid" :padded="false"
            @click="filter.q = ''" />
        </template>
      </UInput>


      <USelectMenu v-model="filter.selectedTypes" :options="types" by="id" option-attribute="name" class="flex-1"
        multiple>
        <template #label>
          <span v-if="filter.selectedTypes.length" class="truncate">{{ filter.selectedTypes.map(e => e.name).join(', ')
          }}</span>
          <span v-else>{{ $t('allTypes') }}</span>
        </template>
      </USelectMenu>


      <USelectMenu v-model="filter.selectedPlatforms" :options="platforms" by="id" option-attribute="name" class="flex-1"
        multiple>
        <template #label>
          <span v-if="filter.selectedPlatforms.length" class="truncate">{{ filter.selectedPlatforms.map(e =>
            e.name).join(', ')
          }}</span>
          <span v-else>{{ $t('allPlatforms') }}</span>
        </template>
      </USelectMenu>

      <USelectMenu v-model="filter.selectedCompanies"
        :options="companies.map((e) => { return { id: e.id, label: e['title_' + locale][0] } })" by="id"
        option-attribute="label" class="flex-1" searchable multiple :placeholder="$t('selectPublisher')"
        :searchable-placeholder="$t('selectPublisher')">
        <template #label>
          <span v-if="filter.selectedCompanies.length" class="truncate">{{ filter.selectedCompanies.map(e =>
            e.label).join(', ')
          }}</span>
          <span v-else>{{ $t('allPublishers') }}</span>
        </template>
      </USelectMenu>

    </div>

    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">{{ $t('primaryTitle') }}</th>
          <th scope="col" class="px-6 py-3 hidden md:table-cell">{{ $t('secondaryTitle') }}</th>
          <th scope="col" class="px-6 py-3 hidden md:table-cell">{{ $t('publisher') }}</th>
          <th scope="col" class="py-3"></th>
        </tr>
      </thead>
      <tbody>
        <template v-for="game in rows" :key="game.slug">
          <tr
            class="bg-white border-b h-full dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" v-if="game" class="px-6 py-4 font-medium  flex items-top gap-2  h-full">
              <SiteLink :to="localePath('/games/' + game.slug)" class="h-full"><nuxt-img v-if="game.photo"
                  class="h-full w-10" width="40" :src="'/gamePhotos/' +
                    game.id +
                    '/' +
                    game.photo.id +
                    '.jpg'
                    " />
              </SiteLink>
              <div class="flex flex-col justify-between gap-3  h-full">
                <div class="text-gray-900 dark:text-white">
                  <SiteLink :to="localePath('/games/' + game.slug)" class="h-full">{{
                    game['collection_title_' + locale] ??
                    game.games[0][$t('title_' + locale)][0] }}</SiteLink>
                </div>
                <div v-if="game.release_dates?.length" class="text-xs">{{ $t('releaseDate') }}: {{ (new
                  Date(game.release_dates[0])).toLocaleDateString(locale == 'en' ? 'en-CA' : locale) }}</div>
              </div>
            </th>
            <td class="px-6 py-4 h-full hidden md:table-cell">
              <div class="flex  flex-col justify-between gap-3 h-full">
                <div class="text-gray-900 dark:text-white">{{ game['collection_title_' + (locale == 'en' ? 'fa' : 'en')]
                  ??
                  game.games[0]['title_' + (locale == 'en' ? 'fa' : 'en')][0] }}
                </div>
                <div class="text-xs flex gap-2">
                  <span v-for="platform in game.platforms" class="flex gap-1">
                    <template v-if="platform == 'Windows'">
                      <UIcon name="i-logos-microsoft-windows-icon" />
                    </template>
                    <template v-if="platform == 'PS2'">
                      <!-- <UIcon name="i-logos-microsoft-windows-icon" /> -->
                    </template>
                    <template v-if="platform == 'PS1'">
                      <!-- <UIcon name="i-logos-microsoft-windows-icon" /> -->
                    </template>
                    {{ platform }}
                  </span>
                </div>
              </div>

            </td>

            <td class="px-6 py-4 hidden md:table-cell">
              <div class="flex  flex-col justify-between gap-3 h-full">
                <div class="text-gray-900 dark:text-white">{{ game.publishers.map((e) =>
                  e['title_' + locale]).join($t('joinCharacter')) }}</div>
                <div class="text-xs" v-if="game.producers.length">
                  {{ $t('producer') }}: {{ game.producers.map((e) => e['title_' + locale]).join($t('joinCharacter'))
                  }}
                </div>
              </div>
            </td>
            <td class="py-4 px-6 text-center">
              <SiteLink :to="localePath('/games/' + game.slug)" class="text-primary-600 hover:underline">
                <UIcon class="h-6 w-6 rounded-full" name="i-heroicons-inbox-arrow-down" />
              </SiteLink>
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <div class="flex flex-col md:flex-row gap-4 justify-between px-4 py-4 items-center"
      :style="locale == 'fa' ? 'font-feature-settings: \'ss01\'' : ''">
      <UPagination v-model="page" :page-count="pageCount" :total="filteredGames.length" />
      <div class="text-sm text-gray-500 dark:text-gray-400">{{ $t('underTable', {
        from: (page - 1) * pageCount + 1, to:
          Math.min(page * pageCount, filteredGames.length), total: filteredGames.length
      }) }}</div>
    </div>
    <div class="flex justify-center">

    </div>
  </div>
</template>
