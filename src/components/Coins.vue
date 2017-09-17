<template>
  <div>
    <p>Name: {{ coin.name }}</p>
    <p>Symbol: {{ coin.symbol }}</p>
    <p>Price (USD): {{ coin.price_usd }}</p>
  </div>
</template>
<script>

/* eslint semi: 0 */
/* eslint comma-dangle: 0 */
/* eslint space-infix-ops: 0 */
/* eslint prefer-template: 0 */
/* eslint quote-props: 0 */
/* eslint no-console: 0 */

  import axios from 'axios'

  export default {
    name: 'Coins',

    data() {
      return {
        coin: {}
      }
    },

    created() {
      this.fetchData()
    },

    watch: {
      '$route': 'fetchData'
    },

    methods: {
      fetchData() {
        axios.get('https://api.coinmarketcap.com/v1/ticker/'+this.$route.params.id+'/')
        .then((resp) => {
          this.coin = resp.data[0]
          // console.log(resp)
        })
        .catch((err) => {
          console.log(err)
        })
      }
    }
  }
</script>
