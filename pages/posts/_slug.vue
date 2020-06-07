<template>
  <div>
    <div id="header-image" :style="`background-image: url('${post.attributes.header}')`"></div>
    <b-container class="page-content">
      <b-row>
        <b-col>
          <small>{{ post.attributes.published }}</small>
          <h1>{{ post.attributes.title }}</h1>
          <p>
            {{ post.attributes.abstract }}
          </p>
        </b-col>
      </b-row>
      <b-row class="mt-4 pt-4">
        <b-col>
          <h1>Inhalt</h1>
          <div class="content" v-html="post.html"></div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  export default {
    name: 'post',
    async asyncData({params}) {
      try {
        let post = await import(`~/posts/${params.slug}.md`);
        return {
          post
        }
      } catch (err) {
        return false
      }
    },
    head() {
      const title = this.post.attributes.title;
      const description = this.post.attributes.abstract;
      const header = `https://mocodes.de/${this.post.attributes.header}`;
      const url = `https://mocodes.de/posts/${this.$route.params.slug}`;

      return {
        title: `MoCodes - ${title}`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.post.attributes.abstract,
          },
          {hid: "og:type", property: "og:type", content: "website"},
          {hid: "og:url", property: "og:url", content: url},
          {hid: "og:title", property: "og:title", content: title},
          {hid: "og:description", property: "og:description", content: description},
          {hid: "og:image", property: "og:image", content: header},

          {hid: "twitter:card", name: "twitter:card", content: header},
          {hid: "twitter:domain", name: "twitter:domain", value: "mocodes.de"},
          {hid: "twitter:title", name: "twitter:title", value: title},
          {hid: "twitter:description", name: "twitter:description", value: description},
          {hid: "twitter:image", name: "twitter:image", content: header},
          {hid: "twitter:url", name: "twitter:url", value: url},
        ]
      }
    }
  }
</script>

<style scoped>
  #header-image {
    height: 75vh;
    width: 100%;
    background-size: cover;
    background-position: center;
  }
</style>

<style>
  .content img {
    max-width: 100%;
    margin: 2em auto;
    border-radius: 0.25em;
    display: block;
  }

  .content table {
    width: 100%;
    margin-bottom: 1em;
    background: #FAFAFA;
    border-radius: 0.25em;
    padding: 1em;
  }

  .content table thead {
    border-bottom: 1px solid lightgray;
  }

  .content table tbody td,
  .content table thead th {
    padding: 0.25em 0.5em;
  }

  .content pre {
    width: 100%;
    background: #FAFAFA;
    padding: 1em;
    border-radius: 0.25em;
  }

  .content .table-of-contents {
    margin-bottom: 5em;
  }

  .content h1 {
    font-size: 175%;
    margin-top: 3em;
    margin-bottom: 1em;
  }

  .content h2 {
    font-size: 150%;
    margin-top: 2em;
    margin-bottom: 0.75em;
  }

  .content h3 {
    font-size: 125%;
    margin-top: 1.75em;
    margin-bottom: 0.5em;
  }

  .content h4 {
    font-size: 115%;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
  }
</style>
