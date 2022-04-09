<template>
  <div @click="handleClick">{{ msg }}</div>
</template>

<script>
import request from '../utils/request'
import { generateServer } from '../request/generateServer'
//  https://mockapi.eolink.com/Rijy6K25168ee42812fbe838bb557aed97c6cb206591c4c/user/points.php

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    handleClick () {
      request()
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
