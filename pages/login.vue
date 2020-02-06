<template>
  <div>
    <form @submit.prevent="submitLogIn">
      <div><input v-model="email" type="email" placeholder="email" /></div>
      <div>
        <input v-model="password" type="password" placeholder="password" />
      </div>
      <div><input type="submit" />Отправить</div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  layout: 'empty',
  head: {
    title: 'Profiler - Login'
  },
  methods: {
    async submitLogIn() {
      try {
        await this.$store.dispatch('logIn', {
          email: this.email,
          password: this.password
        })
        this.email = ''
        this.password = ''
        this.$router.push('/')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped></style>
