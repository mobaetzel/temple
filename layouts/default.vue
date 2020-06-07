<template>
  <div>
    <page-header v-if="$nuxt.$route.name !== 'index'"/>
    <nuxt />
    <page-footer />
  </div>
</template>

<style>
</style>

<script>
  import PageHeader from "../components/page-header";
  import PageFooter from "../components/page-footer";
  import * as moment from 'moment';

  moment.locale('de');

  export default {
    components: {PageFooter, PageHeader}
  }
</script>
