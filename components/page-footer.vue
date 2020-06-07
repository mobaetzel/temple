<template>
  <footer class="footer bg-dark pt-4 pb-4 text-light">
    <b-container>
      <b-row>
        <b-col>
          <b-nav class="social-nav" align="center">
            <b-nav-item link-classes="text-light" target="_blank" href="https://github.com/mobaetzel"><i class="fab fa-github" /></b-nav-item>
            <b-nav-item link-classes="text-light" target="_blank" href="https://linkedin.com/in/mobaetzel"><i class="fab fa-linkedin-in" /></b-nav-item>
            <b-nav-item link-classes="text-light" target="_blank" href="https://twitter.com/mobaetzel"><i class="fab fa-twitter" /></b-nav-item>
            <b-nav-item link-classes="text-light" target="_blank" href="mailto:mobaetzel@gmail.com"><i class="fas fa-at" /></b-nav-item>
            <b-nav-item link-classes="text-light" target="_blank" href="https://enwork.de"><b-img src="/images/enwork-logo.svg" height="24px"/></b-nav-item>
          </b-nav>
        </b-col>
      </b-row>
      <b-row>
        <b-col style="text-align: center">
          &copy; {{ theYear }} by Finn Moritz B&auml;tzel
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>

<script>
    export default {
        name: "page-footer",
        data() {
          return {
            theYear: new Date().getFullYear()
          }
        }
    }
</script>

<style scoped>
  .footer {
    margin-top: 25vh;
    min-height: 25vh;
  }

  .footer .social-nav {
    font-size: 150%;
  }
</style>
