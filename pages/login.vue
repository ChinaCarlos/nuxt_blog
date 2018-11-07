<template>
 <div class="container">
     login page
 </div>
</template>

<script>
import axios from 'axios'
export default {
    async mounted() {
        await axios.post('/sys/login?username=admin&password=admin').then(res => {
            console.log(res.data)
        })
         await axios.get('sys/user/info').then(res => {
            console.log(res.data)
        })
    }
}
</script>

<style lang="scss" scoped>
</style>
