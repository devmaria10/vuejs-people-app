/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      people: [],
      newPerson: {name: "", bio: ""},
      errors: []
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
          this.erros = error.response.data.errors;
        }.bind(this));
    },
    deletePerson: function(inputPerson) {
      var index = this.people.indexOf(inputPerson);
      this.people.splice(index,1);
    },
    toggleBioVisible: function(inputPerson) {
      inputPerson.bioVisible = !inputPerson.bioVisible;
    }
  },
  computed: {}
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