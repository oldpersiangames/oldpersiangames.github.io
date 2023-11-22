<script setup></script>
<template>
  <ContentDoc v-slot="{ doc }">
    <article>
      <h1
        class="mt-4 text-center text-xl font-bold leading-none tracking-tight text-gray-900 dark:text-white"
      >
        {{ doc.title }}
      </h1>
      <div class="text-center font-extralight text-sm mt-2">
        نوشته شده در: <span dir="ltr">{{ doc.publishedAt }}</span>
      </div>
      <div
        class="mt-4 prose prose-primary dark:prose-invert mx-auto font-light"
        dir="rtl"
      >
        <ContentRenderer :value="doc" />
      </div>
    </article>
  </ContentDoc>
</template>
