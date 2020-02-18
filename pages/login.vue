<template>
  <div id="Login">
    <v-card width="370" raised>
      <v-card-title class="headline">Log In</v-card-title>
      <v-divider />
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="email"
            :rules="rules.emailRules"
            :counter="25"
            label="Input E-mail"
            required
            outlined
          />
          <v-text-field
            v-model="password"
            :rules="rules.password"
            :counter="16"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            :type="showPassword ? 'text' : 'password'"
            label="Input password"
            required
            outlined
          />
          <v-row>
            <v-col cols="6">
              <v-btn
                :disabled="!valid"
                @click="submitLogIn"
                color="success"
                class="mr-4"
                block
              >
                Validate
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                @click="$router.push('/registration')"
                color="success"
                block
              >
                Registration
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      showPassword: false,
      valid: false,
      email: '',
      password: '',
      rules: {
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
        ],
        password: [
          (v) => !!v || 'Password is required',
          (v) => !(v.length < 8) || 'Password must longer 7',
          (v) =>
            /^(?=.*\d)(?=.*[a-zA-Z]).{1,20}$/.test(v) ||
            'Password must contains letters and numbers',
          (v) => !(v.length > 16) || "Password can't be longer 16"
        ]
      }
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

<style lang="sass">
#Login
  margin: 0 auto
</style>
