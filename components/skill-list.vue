<template>
  <div class="skill-list">
    <h6>{{title}}</h6>
    <b-list-group>
      <b-list-group-item v-for="skill in skills"
                         :key="skill.title"
                         class="d-flex justify-content-between align-items-center">
        <div>
          <div>
        {{skill.title}}
          </div>
        <small v-if="skill.hint != null" class="text-muted">{{skill.hint}}</small>
        </div>
        <small v-if="skill.level != null" class="text-muted">
          {{parseSkillLevel(skill.level).toUpperCase()}}
        </small>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
  export default {
    name: "skill-list",
    props: {
      title: String,
      skills: Array,
    },
    methods: {
      parseSkillLevel(level) {
        switch (level) {
          case 1:
            return 'Anfänger';
          case 2:
            return 'Fortgeschritten';
          case 3:
            return 'Experte';
          case -1:
            return 'Elementar (Niveau A2)';
          case -2:
            return 'Selbstständig (Niveau B2)';
          case -3:
            return 'Kompetent (Niveau C2)';
        }
      }
    },
  }
</script>

<style scoped>
  .skill-list {
    margin-top: 3em;
    margin-bottom: 1em
  }

  .skill-list:first-child {
    margin-top: 2em;
  }
</style>
