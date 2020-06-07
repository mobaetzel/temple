<template>
  <b-container class="page-content">
    <b-row  style="margin-bottom: 3em;">
      <b-col class="avatar-col" sm="12" md="4" lg="3" xl="2">
        <b-img src="https://pbs.twimg.com/profile_images/1055214673467977733/smaGyrYM_400x400.jpg"
               rounded="circle"
               thumbnail width="150px" height="150px"/>
      </b-col>
      <b-col sm="12" md="8" lg="9" xl="10">
        <h1>Finn Moritz Bätzel</h1>
        <h3>Full-Stack Developer</h3>
        <div>
          <i class="map-marker fas fa-map-marker-alt"></i> Marburg, Hessen, Deutschland
        </div>
      </b-col>
    </b-row>
    <hr/>
    <b-row>
      <b-col md="12" lg="4" order="2" order-lg="1">
        <h4 style="margin-top: 2em; margin-bottom: 2em">Fähigkeiten</h4>
        <div>
          <skill-list title="Programmiersprachen"
                      :skills="skills.programming"/>
          <skill-list title="Frameworks"
                      :skills="skills.frameworks"/>
          <skill-list title="Technologien"
                      :skills="skills.tech"/>
          <skill-list title="Team & Organisation"
                      :skills="skills.social"/>
          <skill-list title="Sprachen"
                      :skills="skills.languages"/>
        </div>
      </b-col>
      <b-col md="12" lg="8" order="1" order-lg="2">
        <b-container>
          <h4 style="margin-top: 2em; margin-bottom: 2em">Berufliche Erfahrung</h4>
          <b-row>
            <cv-story-card v-for="job in jobs"
                           :key="job.company + job.position"
                           :ikey="job.company + job.position"
                           :logo="job.logo"
                           :title="job.position"
                           :description="job.description"
                           :start="job.start"
                           :end="job.end"
                           :sub-title="job.company"
                           :links="job.links"
                           :tasks="job.tasks"/>
          </b-row>
          <h4 style="margin-top: 3em; margin-bottom: 2em">Ausbildung</h4>
          <b-row>
            <cv-story-card v-for="edu in educational"
                           :key="edu.school + edu.degree"
                           :ikey="edu.school + edu.degree"
                           :title="edu.degree"
                           :logo="edu.logo"
                           :description="edu.description"
                           :start="edu.start"
                           :end="edu.end"
                           :sub-title="edu.school"
                           :links="edu.links"
                           :tasks="edu.tasks"/>
          </b-row>
          <h4 style="margin-top: 3em; margin-bottom: 2em">Sonstiges</h4>
          <b-row>
            <cv-story-card v-for="oth in other"
                           :key="oth.title + oth.organization"
                           :ikey="oth.title + oth.organization"
                           :title="oth.title"
                           :logo="oth.logo"
                           :description="oth.description"
                           :start="oth.start"
                           :end="oth.end"
                           :sub-title="oth.organization"
                           :links="oth.links"
                           :tasks="oth.tasks"/>
          </b-row>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import CvStoryCard from "../components/cv-story-card";
  import {job, education, other} from "../assets/cvs";
  import {skills} from "../assets/skills";
  import SkillList from "../components/skill-list";

  export default {
    name: "cv",
    components: {SkillList, CvStoryCard},
    data() {
      return {
        jobs: job,
        educational: education,
        other: other,
        skills: skills,
      }
    },
  }
</script>

<style scoped>
  .map-marker {
    opacity: 0.5;
  }

  .avatar-col {
    text-align: center;
  }
</style>
