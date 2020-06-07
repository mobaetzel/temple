<template>
  <b-card>
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">
        {{ title }}
      </h5>
      <small>{{ date }}</small>
    </div>

    <p class="mb-1">
      {{ abstract }}
    </p>

    <div class="d-flex w-100 justify-content-between mt-4">
      <small>
        <b-link :href="source_link" target="_blank">{{ source }}</b-link>
      </small>
      <small v-if="download_link != null">
        <b-link :href="download_link" target="_blank">Download</b-link>
      </small>
    </div>
  </b-card>
</template>

<script>
  export default {
    name: "activity-card",
    props: {
      title: String,
      date: String,
      abstract: String,
      source_link: String,
      source: String,
      download_link: String,
    }
  }
</script>

<style scoped>

</style>
