/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to the People App!",
      people: [{
                name: "Maria",
                bio: "Social worker and software developer-in-one",
                bioVisible: true
              },
              {
                name: "Carleen",
                bio: "Wanderluster",
                bioVisible: true
              },
              {
                name: "Eduardo",
                bio: "Pops Extraordinaire",
                bioVisible: true
              }
      ]
    };
  },
  created: function() {},
  methods: {},
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
