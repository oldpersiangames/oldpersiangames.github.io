<script setup></script>

<template>
  <ULandingHero
    :title="$t('welcome')"
    orientation="horizontal"
    :ui="{
      title: 'sm:text-4xl',
    }"
  >
    <template #description>
      <span
        v-html="
          $t('intro', {
            sitename:
              '<strong class=\'font-medium\' style=\'text-shadow: #e73cff 0px 0px 20px;\'><span class=\'text-primary-600\'>Old</span> <span class=\'text-red-600\'>Persian</span> <span class=\'text-orange-500 dark:text-yellow-400\'>Games</span></strong>',
          })
        "
      ></span>
    </template>
    <template #default>
      <div
        class="order-first mx-auto w-full max-w-80 px-3 lg:order-none lg:ltr:ml-auto lg:ltr:mr-0 lg:rtl:ml-0 lg:rtl:mr-auto"
      >
        <svg viewBox="0 0 756.73141 823.04122" class="fill-current">
          <use xlink:href="/img/logo.svg#g3577"></use>
        </svg>
      </div>
    </template>
  </ULandingHero>
  <UContainer>
    <div
      class="prose prose-primary dark:prose-invert max-w-none text-xs text-gray-500 dark:text-gray-400"
    >
      <div>
        {{ $t("copyrightDetails") }}
      </div>
      <div class="mt-1">
        {{ $t("dmca") }}:
        <a href="mailto:oldpersiangames@gmail.com">oldpersiangames@gmail.com</a>
      </div>
    </div>
  </UContainer>
</template>
