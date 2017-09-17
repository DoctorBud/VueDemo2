<template>
  <div>
    <h2>Coin Search</h2>

    <el-row>
      <el-col :span="24">
        <el-input
          autofocus
          @change="doSearch"
          placeholder="Type a Coin Symbol or Name"
          v-model="searchFor">
          <template slot="prepend"><b>Symbol/Name</b></template>
          <template slot="append">{{ searchResultsLength }} found</template>
        </el-input>
      </el-col>
    </el-row>


    <el-row>
      <vue-good-table
        style="width:90%;margin:auto;"
        title="Coin Types"
        :columns="columns"
        :rows="rows"
        :perPage="15"
        styleClass="table-striped table-bordered xcondensed"
        :paginate="true"
        :lineNumbers="false"
        :onClick="toggleWatch">
        <div slot="emptystate" style="width:500px;">
          No Coins Selected
        </div>

<!--         <template slot="table-row" scope="props">
          <td v-for="(column, i) in columns"
            v-if="!column.hidden"
            :class="column.getDataStyle(i, 'td')">
            {{ props.row[column.field] }}
          </td>
        </template> -->


      </vue-good-table>
    </el-row>
  </div>
</template>

<script>
  import axios from 'axios'
  const STORAGE_KEY = 'watch-vuejs';
  import watchStorage from '../services/Store.js';

  const columnDefs = [
          {
            label: 'Symbol',
            field: 'symbol',
            width: '15%',
          },
          {
            label: 'Name',
            field: 'name',
            width: '50%',
          },
          {
            label: 'Price (USD)',
            field: 'price_usd',
            type: 'number',
            width: '20%',
          },
          {
            label: 'Watch',
            field: 'watchHTML',
            type: 'boolean',
            width: '5%',
            html: true,
          },
        ];
  export default {
    name: 'Search',

    data() {
      return {
        watches: [],
        searchFor: '',
        coinTypes: [],
        columns: [],
        rows: [],
      }
    },

    created() {
      this.fetchCoinTypes();
      this.watches = watchStorage.fetch(STORAGE_KEY);
    },

    watch: {
      watches: {
          deep: true,
          handler: function (newVal, oldVal) {
              watchStorage.save(STORAGE_KEY, newVal);
          },
      }
    },

    computed: {
      searchResultsLength: function searchResultsLength() {
        return this.rows.length;
      },
    },
    methods: {
      isSymbolWatched(symbol) {
        let result = false;
        if (this.watches) {
          this.watches.forEach(watch => {
            if (watch && watch.title.toUpperCase() === symbol.toUpperCase()) {
              result = true;
            }
          });
        }
        return result;
      },
      generateCheckboxOrNot(flag) {
        return flag ?
          '<span style="color:green;margin:0;">&nbsp;&#10004;&nbsp;</span>' :
          '';
      },
      toggleWatch(row) {
        row.watch = !row.watch;
        row.watchHTML = this.generateCheckboxOrNot(row.watch);
        if (this.watches) {
          const symbol = row.symbol;

          if (row.watch) {
            this.watches.push({
              title: symbol,
              completed: false
            });
          }
          else {
            for (let i = 0; i < this.watches.length; ++i) {
              const watch = this.watches[i];
              if (watch && watch.title.toUpperCase() === symbol.toUpperCase()) {
                this.watches.splice(i, 1);
                break;
              }
            }
          }
        }
      },
      doSearch() {
        const searchForUpper = this.searchFor.toUpperCase();
        if (searchForUpper.length === 0) {
          this.rows = [];
          this.columns = [];
        }
        else {
          let searchRows = [];
          this.coinTypes.forEach((coin) => {
            if (coin.name.toUpperCase().indexOf(searchForUpper) >= 0 ||
                coin.symbol.toUpperCase().indexOf(searchForUpper) >= 0) {
              const watched = this.isSymbolWatched(coin.symbol);
              searchRows.push({
                symbol: coin.symbol,
                name: coin.name,
                price_usd: coin.price_usd,
                watchHTML: this.generateCheckboxOrNot(watched),
                watch: watched,
              });
            }
          });

          this.columns = columnDefs;
          this.rows = searchRows;
        }
      },
      fetchCoinTypes() {
        axios.get('https://api.coinmarketcap.com/v1/ticker/')
        .then((resp) => {
          const coins = resp.data;
          const coinTypes = coins.map((coin) => {
            return coin;
          });
          this.coinTypes = coinTypes;
        })
        .catch((err) => {
          console.log(err)
        })
      },
      // fetchData() {
      //   axios.get('https://api.coinmarketcap.com/v1/ticker/'+this.$route.params.id+'/')
      //   .then((resp) => {
      //     this.coin = resp.data[0]
      //     // console.log(resp)
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //   })
      // },
    }
  }
</script>

<style>
.search-input {
  width: 100%;
}
</style>
