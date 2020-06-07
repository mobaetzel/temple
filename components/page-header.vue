<template>
  <div>
    <b-navbar variant="dark" type="dark" fixed="top">
      <b-navbar-nav class="mx-auto">
        <b-nav-item href="/">Startseite</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <div id="navbar-placeholder"></div>
  </div>
</template>

<script>
  export default {
    name: "page-header"
  }
</script>

<style scoped>
#navbar-placeholder {
  height: 52px;
}
</style>
