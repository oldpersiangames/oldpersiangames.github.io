<script setup>
import { filesize } from "filesize";
const { locale } = useI18n();
const localePath = useLocalePath();
const img = useImage();

const route = useRoute();

const { data: item } = await useAPI("/api/items/" + route.params.slug, {
  transform: (item) => {
    item.tgfiles = item.tgfiles.map(({ file_id, ...keepAttrs }) => keepAttrs);
    item.contributes = item.contributes.reduce((group, contribute) => {
      group[contribute.user.name] = group[contribute.user.name] ?? [];
      group[contribute.user.name].push(contribute.contribute);
      return group;
    }, {});
    return item;
  },
});

if (!item.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
    fatal: true,
  });
}

const title = computed(() => item.value["title_" + locale.value]);

if (item.value.featured_image)
  defineOgImage({
    url: img(item.value.featured_image),
  });

useSeoMeta({
  title: title.value,
  description: title.value,
});
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader
        :title="title"
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
                  label: $t('miscellaneous'),
                  to: localePath('/misc'),
                  icon: 'i-heroicons-chart-pie',
                },
                {
                  label: title,
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
                v-if="item.selling"
                :description="$t('gameSelling')"
                color="violet"
              />
              <UAlert
                v-if="!item.ia_id && !item.selling"
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
                :ui="{ th: { base: 'text-center rtl:text-center' } }"
                :rows="item.files || item.tgfiles"
                :columns="[
                  {
                    key: 'file_name',
                    label: $t('fileName'),
                  },
                  {
                    key: 'file_size',
                    label: $t('fileSize'),
                  },

                  ...(!item.files
                    ? [
                        {
                          key: 'date',
                          label: $t('uploadedAt'),
                        },
                      ]
                    : []),

                  ...(!!item.ia_id
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
                      item.ia_id,
                    )}/${encodeURIComponent(row.file_name)}`"
                    target="_blank"
                    icon="i-heroicons-inbox-arrow-down"
                    variant="ghost"
                  />
                </template>
              </UTable>
              <UAlert v-if="item.ia_id" color="primary" variant="soft">
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
                v-if="item['notes_' + locale]"
                color="primary"
                variant="soft"
              >
                <template #description>
                  <div v-html="item['notes_' + locale]"></div>
                </template>
              </UAlert>

              <UAlert
                icon="i-heroicons-exclamation-triangle"
                v-if="
                  item['defects_' + locale] && item['defects_' + locale].length
                "
                color="primary"
                variant="soft"
                :title="$t('defectsIntro')"
              >
                <template #description>
                  <ul
                    class="mt-2 list-inside list-disc text-xs marker:text-red-600"
                  >
                    <li v-for="defect in item['defects_' + locale]">
                      {{ defect }}
                    </li>
                  </ul>
                </template>
              </UAlert>
            </UCard>

            <div
              v-html="
                (locale == 'en'
                  ? item.content_en ?? item.content_fa
                  : item.content_fa) ?? ''
              "
            ></div>
          </div>

          <hr />

          <div>
            <h3>
              {{ $t("pictures") }}
            </h3>
            <div
              class="not-prose flex flex-wrap justify-center gap-2 md:justify-start"
            >
              <a v-for="photo in item.photos" target="_blank" :href="img(photo)"
                ><NuxtImg class="h-full w-60" width="264" :src="photo"
              /></a>
            </div>
          </div>

          <div v-if="item.links.length">
            <h3>
              {{ $t("externalLinks") }}
            </h3>
            <ul>
              <li v-for="link in item.links">
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
                v-for="(contribute, username) in item.contributes"
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
                  :to="{
                    path: localePath('/contributors'),
                    hash: '#' + username,
                  }"
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
              v-if="item.featured_image"
              target="_blank"
              :href="img(item.featured_image)"
              ><NuxtImg class="mx-auto" width="264" :src="item.featured_image"
            /></a>
            <ul class="mt-4">
              <template
                v-for="detail in [
                  {
                    label: $t('primaryTitle'),
                    value: item['title_' + locale],
                  },
                  {
                    label: $t('secondaryTitle'),
                    value: item['title_' + (locale == 'en' ? 'fa' : 'en')],
                  },
                  {
                    label: $t('publisher'),
                    value: item.publishers
                      .map((x) => x['title_' + locale][0])
                      .join($t('joinCharacter')),
                  },
                  {
                    label: $t('releaseDate'),
                    value: item.release_dates
                      ?.map((e) =>
                        new Date(e).toLocaleDateString(
                          locale == 'en' ? 'en-CA' : locale,
                        ),
                      )
                      ?.join($t('joinCharacter')),
                  },

                  {
                    label: $t('relasedOn'),
                    value: item['released_on_' + locale]?.join(
                      $t('joinCharacter'),
                    ),
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
            </ul>
          </UAside>
        </template>
      </UPage>
    </UPage>
  </UContainer>
</template>
