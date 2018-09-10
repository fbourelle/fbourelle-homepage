function main () {
  window.onscroll = function () { myFunction() };
  function myFunction () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        document.getElementById('img-frederic').className = 'avatar-sticky';
    } else {
      document.getElementById('img-frederic').className = 'avatar';
    }
  };
};

main();

// import { METHODS } from 'http';
Vue.component('slider', {
  template: `<div class="slider">
  <slot img-responsive></slot>
  <i class="material-icons carousel__nav carousel__nav__next" v-on:click="next">keyboard_arrow_right</i>
  <i class="material-icons carousel__nav carousel__nav__prev" v-on:click="prev">keyboard_arrow_left</i>
  <ol class="carousel-index" >
    <li v-for="n in slidesCount" v-on:click="goto(n-1)" v-bind:class="{ active: n-1 == index }"></li>
  </ol>

  </div>`,
  data () {
    return {
      index: 0,
      slices: [],
      direction: null
    }
  },
  mounted () {
    this.slices = this.$children
    this.slices.forEach((slice, i) => {
      slice.index = i
    })
    // console.log(this.slices)
  },
  computed: {
    slidesCount () { return this.slices.length }
  },
  methods: {
    goto (index) {

      if (index > this.index ) {
        this.direction = 'left'
      } else {
        this.direction = 'right'
      }
      this.index = index
    },
    next () {
      this.index++
      this.direction = 'left'
      if (this.index >= this.slidesCount) {
        this.index = 0
      }
    },
    prev () {
      this.index--
      this.direction = 'right'
      if (this.index < 0 ) {
        this.index = this.slidesCount -1
      }
    }
  }
})

Vue.component('Slide', {
  template: `
  <transition :name="transition">
    <div v-show='visible'>
      <slot></slot>
    </div>
  </transition>`,
  props: {
    image: String,
    indexSlides: Number
  },
  data: function () {
    return {
      index: 0
    }
  },
  computed: {
    transition () {
      if (this.$parent.direction) {
        return 'slide-' + this.$parent.direction
      }
    },
    visible () {
      return this.index === this.$parent.index
    }
  }
})

Vue.component('ligneClient', {
  template: `<article class="container-portfolio" v-bind:class="classObjectPortfolio(clientId)">
                <div class="row" v-if="clientId%2 == 0">
                  <!-- Resume -->
                  <div class="col-lg-5 col-md-5 col-sm-9" v-bind:class="{ first: classObjectFirst(clientId) }">
                    <div class="client" v-bind:class="classObjectClient(clientId)">
                      <h3><span v-html="clientData.project"></span></h3>
                      <small v-html="clientData.type"></small>
                      <div v-html="clientData.resume">
                      </div>
                      <ul class="tags">
                        <li v-for="(tag, index) in clientData.tags">{{ tag }}</li>
                      </ul>
                    </div>
                  </div>
                  <!-- Fin Resume -->
                  <!-- Slider -->
                  <div class="col-lg-7 col-md-7 col-sm-12">
                    <slider v-if="clientData.images != 0">
                        <slide v-for="(image, index) in clientData.images" :key=index>
                            <img v-bind:src="'img/portfolio/' + image" class="img-responsive">
                        </slide>
                    </slider>
                    <div v-else v-html="clientData.alternative">
                    </div>
                  </div>
                  <!-- Fin Slider -->
                </div>
                <div v-else class="row">
                  <div class="col-lg-7 col-md-7 col-sm-12">
                    <slider v-if="clientData.images != 0">
                        <slide v-for="(image, index) in clientData.images" :key=index>
                            <img v-bind:src="'img/portfolio/' + image" class="img-responsive">
                        </slide>
                    </slider>
                    <div v-else v-html="clientData.alternative">
                    </div>
                  </div>
                  <div class="col-lg-5 col-md-5 col-sm-9" v-bind:class="{ first: classObjectFirst(clientId) }">
                    <div class="client" v-bind:class="classObjectClient(clientId)">
                      <h3><span v-html="clientData.project"></span></h3>
                      <small v-html="clientData.type"></small>
                      <div v-html="clientData.resume">
                      </div>
                      <ul class="tags">
                        <li v-for="(tag, index) in clientData.tags">{{ tag }}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </article>`,
  props: {
    clientData: Object,
    clientId: Number
  },
  data: function () {
    return {
      clientleft: 'clientleft',
      clientright: 'clientright',
      left: 'left',
      right: 'right',
      first: true
      }
  },
  computed: {
    children () {
      this.slides = this.$children
      console.log(this.slides);
    }
  },
  methods: {
    classObjectFirst: function (n) {
      if (n%2 == 1) {
        return this.first;
      } else {
        return !this.first
      }
    },
    classObjectPortfolio: function (n) {
        if (n%2 == 0) {
          return this.clientleft;
        }
        else {
          return this.clientright;
        }
      },
      classObjectClient: function (n) {
          if (n%2 == 0) {
            return this.left;
          }
          else {
            return this.right;
          }
        },
      firstImage: function (n) {
        if (n == 0) {
          console.log('coucou ' + n);
          return this.imageActive;
        } else {
          console.log('salut ' + n);
          return !this.imageActive;
        }
      },
    }
})

Vue.component('portfolioEnum', {
  template: `<div>
              <ligne-client v-for="toto in dataportfolio"
                :key="toto.id"
                :clientId="toto.id"
                :clientData="toto">
              </ligne-client>
            </div>`,
  props: {
    dataportfolio: Array
  }
})

var portfolio = new Vue({
  el: '#portfolio',
  data: {
    tablePortfolio: [
      {
        id: 0,
        project: `<a href="https://www.lespetiteschanceuses.fr" target="_blank" title="Les Petites Chanceuses">Les Petites Chanceuses</a>`,
        type: 'E-commerce',
        resume: `<p>Marketplace réalisée avec <a href="https://www.prestashop.com/fr" target="_blank">Prestashop.</a>
        Conception du site, personnalisation du template et des module, ajout de fonctionnalités.</p>`,
        tags: ['digital', 'prestashop', 'php', 'pro'],
        images: ['lpc.png', 'lpc_2.png']
      },
      {
        id: 1,
        project: `<a href="https://fr.wikipedia.org/wiki/Fourmi_de_Langton" target="_blank" title="La fourmi de Langton">La fourmi de Langton</a>`,
        type: 'Exercice algorithmique',
        resume: `<p>Travail algorithmique en javascript et jquery à partir de la fourmi de Langton qui se déplace selon <a href="https://fr.wikipedia.org/wiki/Fourmi_de_Langton" target="_blank" title="La fourmi de Langton">des règles définies.</a>
                  J'y ai rajouté des variations de couleurs ainsi que la possibilité "d\'écraser" la fourmi si l'utilisateur clique sur la case où elle se trouve.</p>`,
        tags: ['digital', 'javaScript', 'jquery', 'perso'],
        images: [],
        alternative: `
        <div id="algofourmi">
        <input type="number" id="dimX" style="display:none" value="15">
        <input type="number" id="dimY" style="display:none" value="30">
        <button id="go">Build</button>
        <button id="start" disabled>Start</button>
        <button id="stop" disabled>Stop</button>
        <div id="fourmi"></div></div>
        `
      },
      {
        id: 2,
        project: `<a href="https://www.caravanecompagnie.fr/" target="_blank">Caravane Compagnie</a>`,
        type: 'Compagnie théatrale',
        resume: `<p>Flyer de la tournée "Échappée clownesque en Pays de Retz" du spectacle "Entre 2 Ô". Graphisme, illustration, maquettage.<br>Format 420 x 148 mm, pliage accordéon.</p>`,
        tags: ['print', 'pro'],
        images: ['caravane01.jpg', 'caravane04.jpg', 'caravane03.jpg', 'caravane02.jpg']
      },
      {
        id: 3,
        project: `Salon U`,
        type: `Salon professionnel de <a href="https://www.magasins-u.com" target="_blank">Système U Ouest</a>`,
        resume: `<p>Créations des visuels de la campagne de communication du salon de Système U Ouest : logo, illustration, affiche, guide, plan, plv, signalétique, site internet, etc.</p>`,
        tags: ['print', 'digital', 'pro'],
        images: ['affiche-salon-u-2016.png', 'Salon_beaujoire.jpg', 'salon_web_2016.png', 'salonflyer.png']
      },
      {
        id: 4,
        project: `Sacs cabas "U de"`,
        type: `Système U Ouest`,
        resume: `<p>Création des visuels de sacs cabas régionaux pour les magasins U de la région ouest.</p>`,
        tags: ['print', 'pro'],
        images: ['sac_01.png', 'sac_02.png', 'sac_03.png', 'sac_04.png', 'sac_05.png', 'sac_06.png',]
      },
      {
        id: 5,
        project: `Les jours festifs`,
        type: `Communication événementielle pour les <a href="https://www.magasins-u.com" target="_blank">magasins U</a>`,
        resume: `<p>Création du visuel d'une campagne de communication multi-supports : affiche, banderoles, PLV, tract, etc.</p>`,
        tags: ['print', 'digital', 'pro'],
        images: ['theatralisation.jpg', 'theatralisation_1.jpg', 'theatralisation_2.jpg', 'theatralisation_3.jpg']
      },
      {
        id: 6,
        project: `Fruits et légumes`,
        type: `PLV pour les magasins U`,
        resume: `<p>Création de visuels promotionnels pour les rayons fruits et légumes des magasins U : banderole, sticker, plv.</p>`,
        tags: ['print', 'pro'],
        images: ['fl.jpg', 'fl_anciens.jpg', 'fl_pommes.jpg', 'fl_pommes_2.jpg']
      },
      {
        id: 7,
        project: `The big Lego love`,
        type: `Film d'animation pour des amis`,
        resume: `<p>Legofilm en stop-motion sans prétention mais que j'ai eu beaucoup de plaisir à réaliser.</p>`,
        tags: ['video', 'perso'],
        images: [],
        alternative: `<iframe src="https://player.vimeo.com/video/73975402" width="100%" height="360" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>`
      },
  ]
  }
});

Vue.component('skills-enum', {
  template: `<div class="div-responsive">
            <div class="pastille" v-bind:class="[competence.form, classObject(index)]" v-for="(competence, index) in data">
            <span class="skilltext">{{ competence.skill }}</span>
            <div class="rating"><span class="skilltext">{{ competence.rating }}</span></div>
            </div>
            </div>`,
  props: {
    data: Array
  },
  data: function () {
        return { numeros: ['un', 'deux', 'trois', 'quatre', 'cinq'] }
    },
  methods: {
    classObject: function (n) {
        // console.log(n%this.numeros.length);
        return this.numeros[(n%this.numeros.length)];
      }
    }
})

var skills = new Vue({
    el: '#skills',
    data: {
        tableSkills: [
      { form: 'rond', skill: 'Algorithmie', rating: '❤ J\'aime' },
      { form: 'carre', skill: 'Front-end', rating: '✊ Opérationnel' },
      { form: 'rond', skill: 'HTML/CSS', rating: 'À l\'aise' },
      { form: 'rond', skill: 'Javascript', rating: '❤ J\'apprécie' },
      { form: 'rond', skill: 'Vue.js', rating: '❤ J\'aime' },
      { form: 'rond', skill: 'Ionic', rating: '↗ Bases acquises' },
      { form: 'rond', skill: 'Angular', rating: '↗ Bases acquises' },
      { form: 'carre', skill: 'Back-end', rating: '✊ Opérationnel' },
      { form: 'rond', skill: 'Sql', rating: '↗ Bases acquises' },
      { form: 'rond', skill: 'Php', rating: '↗ Bases acquises' },
      { form: 'rond', skill: 'Symfony', rating: '↗ Bases acquises' },
      { form: 'rond', skill: 'Laravel', rating: '↗ Bases acquises' },
      { form: 'carre', skill: 'Infographie', rating: '10 ans d\'expérience' },
      { form: 'rond', skill: 'Retouche photo', rating: 'Maîtrise' },
      { form: 'rond', skill: 'Création graphique', rating: '✊ Toujours partant' },
      { form: 'rond', skill: 'Photoshop', rating: '★ Expert' },
      { form: 'rond', skill: 'Illustrator', rating: '★ Expert' },
      { form: 'rond', skill: 'InDesign', rating: '★ Expert' }
      ]
    }
});
