<template>
  <b-container class="page-content">
    <b-row class="profile-section">
      <b-col class="centered">
        <b-img src="https://pbs.twimg.com/profile_images/1055214673467977733/smaGyrYM_400x400.jpg" rounded="circle"
               thumbnail width="150px" height="150px"/>
        <h2 class="mt-4">Finn Moritz Bätzel</h2>
        <h3>Full-Stack Developer, Founder, Cloud-Enthusiast</h3>
        <nuxt-link to="/cv">Lebenslauf</nuxt-link>
      </b-col>
    </b-row>
    <b-row class="blog-section">
      <b-col class="centered">
        <h2>Blog</h2>
      </b-col>
    </b-row>
    <b-row>
      <b-container>
        <b-row align-h="center">
          <b-col class="mt-4" sm="12" md="6" lg="4"  v-for="post in posts" :key="post.content.attributes.title">
            <blog-post-preview
              :title="post.content.attributes.title"
              :abstract="post.content.attributes.abstract"
              :header="post.content.attributes.header"
              :published="post.content.attributes.published"
              :link="`/posts/${post.key}`"/>
          </b-col>
        </b-row>
      </b-container>
    </b-row>
    <b-row class="talks-section">
      <b-col class="centered">
        <h2>Sonstiges</h2>
      </b-col>
    </b-row>
    <b-row class="mt-4" align-h="center">
      <b-col class="mb-4" sm="12" md="6" lg="4"  v-for="talk in talks"
             :key="talk.title">
        <activity-card :title="talk.title"
                       :date="talk.date"
                       :abstract="talk.abstract"
                       :source="talk.source"
                       :source_link="talk.source_link"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import BlogPostPreview from "../components/blog-post-preview";
  import {talks} from "~/assets/talks";
  import ActivityCard from "../components/activity-card";

  export default {
    name: 'index',
    components: {ActivityCard, BlogPostPreview},
    async asyncData() {
      const resolve = require.context("~/posts/", true, /\.md$/);
      let imports = resolve.keys().map((key) => {
        const [, name] = key.match(/\/(.+)\.md$/);
        return {
          key: key.substr(2, key.length - 5),
          content: resolve(key),
        };
      });
      imports = imports.reverse();

      return {
        posts: imports,
      }
    },
    data() {
      return {
        talks: talks.reverse(),
      }
    }
  }
</script>

<style scoped>
  .centered {
    text-align: center;
  }

  .profile-section {
    margin-bottom: 15vh;
  }

  .blog-section {
    margin-top: 15vh;
  }

  .talks-section {
    margin-top: 15vh;
  }
</style>
