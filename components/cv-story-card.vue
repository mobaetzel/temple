<template>
  <b-col cols="12">
    <b-card class="mb-4" header-tag="header" footer-tag="footer"
            header-bg-variant="dark" header-text-variant="light">
      <template v-slot:header>
        <div class="d-flex justify-content-between align-items-center">
          <small>{{moment(start).format('MMM YYYY')}} - {{end != null ? moment(end).format('MMM YYYY') :
            'Heute'}}</small>
          <small>
            <template v-if="end != null">
              {{duration(end, start).humanize()}}
            </template>
            <template v-else>
              <client-only>
                {{duration(new Date(), start).humanize()}}
              </client-only>
            </template>
          </small>
        </div>
      </template>
      <div>
        <div class="d-flex mb-3 align-items-center">
          <b-img v-if="logo != null" class="mr-2" thumbnail :src="logo" rounded="circle"  width="64" height="64" :alt="subTitle"></b-img>
          <div>
            <b-card-title>{{title}}</b-card-title>
            <b-card-sub-title>{{subTitle}}</b-card-sub-title>
          </div>
        </div>
        <b-card-text v-if="description != null">
          {{description}}
        </b-card-text>
        <div v-if="tasks != null" class="mt-4">
          <b-button size="sm" v-b-toggle="'collapse-' + ikey" variant="outline-primary">
            Tätigkeitsbereiche
          </b-button>
          <b-collapse :id="'collapse-' + ikey" class="mt-2">
            <ul>
              <li v-for="task in tasks" :key="task">
                {{task}}
              </li>
            </ul>
          </b-collapse>
        </div>
      </div>
      <template v-if="links != null && links.length > 0" v-slot:footer>
        <b-link v-for="link in links"
                class="mr-4"
                target="_blank"
                rel="noreferrer noopener"
                :key="link.link"
                :href="link.link">
          {{link.label}}
        </b-link>
      </template>
    </b-card>
  </b-col>
</template>

<script>
  import * as _moment from 'moment';

  export default {
    name: "cv-story-card",
    props: {
      ikey: String,
      start: Date,
      end: Date,
      logo: String,
      title: String,
      subTitle: String,
      description: String,
      links: Array,
      tasks: Array,
    },
    methods: {
      moment(date) {
        return _moment(date)
      },
      duration(dateA, dateB) {
        return _moment.duration(_moment(dateA) - _moment(dateB));
      }
    }
  }
</script>

<style>
  .card-footer {
    background-color: white;
  }
</style>
