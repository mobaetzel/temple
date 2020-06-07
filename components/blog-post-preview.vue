<template>
  <nuxt-link class="blog-post-preview-card" :to="link">
    <b-card class="text-dark"
            :title="title"
            :img-src="header"
            :img-alt="title"
            img-top>
      <b-card-text>
        {{ abstract.substr(0, 128) }}{{abstract.length > 128 ? '...' : ''}}
      </b-card-text>
      <template v-slot:footer>
        <small class="published-timestamp">{{ published }}</small>
      </template>
    </b-card>
  </nuxt-link>
</template>

<script>
  export default {
    name: "blog-post-preview",
    props: {
      header: String,
      title: String,
      abstract: String,
      link: String,
      published: String,
    }
  }
</script>

<style scoped>
  .blog-post-preview-card:hover {
    text-decoration: none !important;
  }
.published-timestamp {
  display: block;
  text-align: right;
}
</style>
