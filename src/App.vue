<template>
  <div id="app">
    <!-- 
      NAVBAR
    -->
    <nav>
      <a href="#app">
        <img src="./assets/nav-logo.png" alt />
      </a>
      <div id="menu-link">
        <a href="#snacks">Menu</a>
        <div class="submenu">
          <a href="#snacks">snacks</a>
          <a href="#main">Main</a>
          <a href="#desserts">Desserts</a>
        </div>
      </div>
      <a href="#location">Location</a>
      <a href="#contact">Contact</a>
    </nav>

    <!-- 
      SNACKS
    -->
    <section id="snacks">
      <h1 class="menu-title">Snacks</h1>

      <div class="menu-items">
        <div class="card" v-for="item in snackItems" :key="item.name">
          <!-- OVERLAY -->
          <div class="grey" @click="added(item)">
            <svg width="100" height="100">
              <line x1="50" x2="50" y1="35" y2="65" />
              <line x1="35" x2="65" y1="50" y2="50" />
              <circle
                cx="50"
                cy="50"
                r="25"
                stroke="rgba(255, 255, 255, 0.8)"
                stroke-width="4"
                fill="none"
              />
            </svg>
          </div>

          <img :src="getImgUrl(item.src)" alt />
          <div class="title">
            <h2>{{ item.name }}</h2>
            <span>${{ item.price }}</span>
          </div>
        </div>
      </div>
    </section>

    <section id="main">
      <h1 class="menu-title">Mains</h1>

      <div class="menu-items">
        <div class="card" v-for="item in mainItems" :key="item.name">
          <!-- OVERLAY -->
          <div class="grey" @click="added(item)">
            <svg width="100" height="100">
              <line x1="50" x2="50" y1="35" y2="65" />
              <line x1="35" x2="65" y1="50" y2="50" />
              <circle
                cx="50"
                cy="50"
                r="25"
                stroke="rgba(255, 255, 255, 0.8)"
                stroke-width="4"
                fill="none"
              />
            </svg>
          </div>

          <img :src="getImgUrl(item.src)" alt />
          <div class="title">
            <h2>{{ item.name }}</h2>
            <span>${{ item.price }}</span>
          </div>
        </div>
      </div>
    </section>

    <section id="desserts">
      <h1 class="menu-title">Desserts</h1>

      <div class="menu-items">
        <div class="card" v-for="item in dessertItems" :key="item.name">
          <!-- OVERLAY -->
          <div class="grey" @click="added(item)">
            <svg width="100" height="100">
              <line x1="50" x2="50" y1="35" y2="65" />
              <line x1="35" x2="65" y1="50" y2="50" />
              <circle
                cx="50"
                cy="50"
                r="25"
                stroke="rgba(255, 255, 255, 0.8)"
                stroke-width="4"
                fill="none"
              />
            </svg>
          </div>

          <img :src="getImgUrl(item.src)" alt />
          <div class="title">
            <h2>{{ item.name }}</h2>
            <span>${{ item.price }}</span>
          </div>
        </div>
      </div>
    </section>

    <section id="location">
      <h1 class="menu-title">Location</h1>

      <GmapMap :center="center" :map-type-id="mapTypeId" :zoom="15">
        <GmapMarker
          v-for="(item, index) in markers"
          :key="index"
          :position="item.position"
          @click="center = item.position"
        />
      </GmapMap>
    </section>

    <section id="contact">
      <h1 class="menu-title">Get in touch</h1>
      <p>Call 021 555 2222</p>
      <p>contact@shreejagannath.co.nz</p>
    </section>

    <div class="shopping-cart" :class="{ shrink: shrink, grow: !shrink }">
      <div class="shopping-title">
        <span></span>
        <h2>Total: ${{ total }}</h2>
        <svg id="arrow" @click="shrink = !shrink" width="30" height="30">
          <line x1="0" x2="15" y1="0" y2="30" />
          <line x1="30" x2="15" y1="0" y2="30" />
        </svg>
        <span></span>
      </div>
      <div class="cart-item" v-for="item in currentItems" :key="item.name">
        <div class="img">
          <img :src="getImgUrl(item.src)" />
        </div>
        <span>{{ item.name }}</span>
        <span>${{ item.price }}</span>
        <svg width="50" height="50" @click="deleteItem(item)">
          <line x1="10" x2="40" y1="40" y2="10" />
          <line x1="10" x2="40" y1="10" y2="40" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  methods: {
    getImgUrl: function(item) {
      return require("./assets/" + item);
    },
    added: function(item) {
      this.total += item.price;
      this.currentItems.push(item);
    },

    deleteItem: function(item) {
      this.total -= item.price;

      for (let index = 0; index < this.currentItems.length; index++) {
        const element = this.currentItems[index];
        if (element === item) {
          this.currentItems.splice(this.currentItems.indexOf(element), 1);
        }
      }
    },
  },
  data: function() {
    return {
      shrink: false,
      currentItems: [],
      total: 0,
      snackItems: [
        { name: "Samosa", price: 4, src: "snacks/samosa.jpg" },
        {
          name: "Blueberry Muffin",
          price: 5,
          src: "snacks/blueberry-muffin.jpg",
        },
        {
          name: "Pumpkin Soup",
          price: 6,
          src: "snacks/pumpkin-soup.jpg",
        },
        {
          name: "Vegetarian Patties",
          price: 6,
          src: "snacks/patties.jpg",
        },
      ],

      mainItems: [
        {
          name: "Thali",
          price: 12,
          src: "main/thali.jpg",
        },
        {
          name: "Pizza",
          price: 18,
          src: "main/pizza.jpeg",
        },
        {
          name: "Pasta",
          price: 17,
          src: "main/pasta.jpg",
        },
        {
          name: "Burger",
          price: 16,
          src: "main/burger.jpg",
        },
      ],

      dessertItems: [
        {
          name: "Ladoo",
          price: 4,
          src: "desserts/ladoo.jpg",
        },
        {
          name: "Kaju Katli",
          price: 6,
          src: "desserts/kaju.jpg",
        },
        {
          name: "Rasgulla",
          price: 5,
          src: "desserts/rasgulla.jpg",
        },
        {
          name: "Milk Peda",
          price: 7,
          src: "desserts/milk-peda.jpg",
        },
      ],

      center: { lat: -43.537235, lng: 172.636791 },
      mapTypeId: "terrain",
      markers: [{ position: { lat: -43.537235, lng: 172.636791 } }],
    };
  },
};
</script>

<style lang="scss">
$single-column: 450px;
$double-column: 590px;
$triple-column: 800px;
$quadruple-column: 1000px;
$primary: rgba(255, 152, 25, 0.7);
$secondary: rgba(0, 134, 200, 0.3);

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    "Helvetica", "Arial", sans-serif;
}

body {
  margin: 0;
  scroll-behavior: smooth;
}

nav {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: $primary;
}

a {
  padding: 8px;
  text-decoration: none;
  color: aliceblue;
  font-size: 2em;
  transition: all 0.2s;
}

a:hover {
  color: white;
  background-color: rgba(255, 152, 25, 1);
  border-radius: 8px;
}

#menu-link:hover {
  .submenu {
    display: block;
  }
}

.submenu {
  position: absolute;
  display: none;
}

.grey {
  opacity: 0;
  position: absolute;
  transition: all 0.4s;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  img {
    width: 12em;
    color: grey;
  }

  line {
    stroke-width: 4;
    stroke: rgba(255, 255, 255, 0.8);
  }
}

.menu-items {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);

  @media screen and (min-width: $double-column) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: $triple-column) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: $quadruple-column) {
    grid-template-columns: repeat(4, 1fr);
  }

  .card {
    border: 1px solid grey;
    padding: 16px;
    margin: 8px;
    img {
      width: 200px;
      height: 200px;
      object-fit: cover;
    }
    position: relative;
    &:hover {
      .grey {
        opacity: 1;
        background-color: rgba(0, 0, 0, 0.4);
      }
    }
  }
}

.shopping-cart {
  width: 100%;
  height: 30%;
  position: fixed;
  bottom: 0;
  overflow-y: scroll;
  overflow-x: hidden;

  // color: rgba(255, 100, 25, 1);
  color: white;
  font-size: 1.5em;
  background: rgba(0, 134, 200, 0.7);

  svg {
    border-radius: 50%;
    padding: 8px;
    transition: all 0.4s;

    line {
      stroke-width: 2;
      stroke: rgba(255, 255, 255, 0.8);
    }
    &:hover {
      background-color: rgba(0, 134, 200, 0.8);
    }
  }

  .shopping-title {
    display: flex;
    justify-content: space-evenly;
    h2 {
      margin: 0;
    }
  }

  .cart-item {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      padding: 8px;
      border-radius: 10px;
    }

    .img {
      border-radius: 50%;
    }
    svg {
      border-radius: 50%;
      padding: 4px;

      transition: all 0.4s;

      &:hover {
        background-color: rgba(0, 134, 200, 0.8);
      }
    }
    line {
      stroke-width: 2;
      stroke: rgba(255, 255, 255, 0.8);
    }
  }
}

section {
  max-width: 100%;
  padding-top: 48px;
  padding-bottom: 48px;
}

#main {
  background-color: $secondary;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    margin: 8px;
    font-size: 1.2em;
  }
}

.subtitle {
  color: grey;
  font-size: 0.9em;
}

.menu-title {
  font-size: 2em;
  margin-top: 0px;
  // padding-top: 48px;
  // padding-bottom: 16px;
}

.vue-map-container {
  height: 450px;
  max-width: 900px;
  width: 100%;
}

#location {
  background-color: $secondary;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

#contact {
  color: aliceblue;
  background-color: #00537a;
  padding-bottom: 15%;
}

.shrink {
  animation: shrink 1s;
  animation-fill-mode: forwards;
  .shopping-title {
    svg {
      transform: rotate(180deg);
    }
  }
}

@keyframes shrink {
  from {
    height: 30%;
  }
  to {
    height: 70px;
  }
}

.grow {
  animation: grow 1s;
  animation-fill-mode: forwards;
}

@keyframes grow {
  from {
    height: 70px;
  }
  to {
    height: 30%;
  }
}
</style>
