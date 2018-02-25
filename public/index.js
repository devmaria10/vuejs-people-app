/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      people: [],
      newPerson: {name: "", bio: ""},
      errors: [],
      nameFilter: "",
      bioFilter: "",
      sortAttribute: "bio",
      sortAscending: true
    };
  },
  created: function() {
    axios.get("/people")
      .then(function(response) {
        this.people = response.data;
      }.bind(this));
  },
  methods: {
    addPerson: function() {
      axios.post('/people', this.newPerson)
        .then(function(response) {
          this.people.push(response.data);
          this.newPerson = {name: "", bio: ""};
          this.errors = [];
        }.bind(this))
        .catch(function(error) { 
          this.errors = error.response.data.errors; 
        }.bind(this));
    },
    deletePerson: function(inputPerson) {
      var index = this.people.indexOf(inputPerson);
      this.people.splice(index,1);
    },
    toggleBioVisible: function(inputPerson) {
      inputPerson.bioVisible = !inputPerson.bioVisible;
    },
    isValidPerson: function(inputPerson) {
      var validName = inputPerson.name.toLowerCase().includes(this.nameFilter.toLowerCase());
      var validBio = inputPerson.bio.toLowerCase().includes(this.bioFilter.toLowerCase());
      return validName && validBio;
    },
    setSortAttribute: function(inputAttribute) {
      if (inputAttribute === this.sortAttribute) {
        this.sortAscending = !this.sortAscending;
      } else {
        this.sortAscending = true;
      }
      this.sortAttribute = inputAttribute;
    }

  },
  computed: {
    sortedPeople: function() {
      return this.people.sort(function(person1, person2) {
        if (this.sortAscending) {
          return person1[this.sortAttribute].localeCompare(person2[this.sortAttribute]);
        } else {
          return person2[this.sortAttribute].localeCompare(person1[this.sortAttribute]);
        }
      }.bind(this));
    }
  }
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage }],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});