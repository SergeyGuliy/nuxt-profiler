<template>
  <div>
    <form @submit.prevent="submitRegistration">
      <div><input v-model="email" type="email" placeholder="email" /></div>
      <div>
        <input v-model="password" type="password" placeholder="password" />
      </div>
      <div><input type="submit" />Отправить</div>
    </form>
  </div>
</template>

<script>
import 'firebase/auth'
export default {
  name: 'Registration',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async submitRegistration() {
      try {
        await this.$store.dispatch('createNewUser', {
          email: this.email,
          password: this.password
        })
        this.$router.push('/')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped></style>
