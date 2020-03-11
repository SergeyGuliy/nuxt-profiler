<template>
  <div id="Registration">
    <v-card width="370" raised>
      <v-card-title class="headline">Registration</v-card-title>
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
          <v-text-field
            v-model="passwordRepeat"
            :rules="rules.passwordRepeat"
            :counter="16"
            :append-icon="showPasswordRepeat ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPasswordRepeat = !showPasswordRepeat"
            :type="showPasswordRepeat ? 'text' : 'password'"
            label="Repeat password"
            required
            outlined
          />
          <v-row>
            <v-col cols="6">
              <v-btn
                :disabled="!valid"
                @click="submitRegistration"
                color="success"
                class="mr-4"
                block
              >
                Registration
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn @click="$router.push('/login')" color="success" block>
                Log In
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
  name: 'Registration',
  transition: 'bounce',
  data() {
    return {
      showPassword: false,
      showPasswordRepeat: false,
      valid: false,
      email: '',
      password: '',
      passwordRepeat: '',
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
        ],
        passwordRepeat: [
          (v) => !!v || 'Please repeat password',
          (v) => v === this.password || 'Password must be same'
        ]
      }
    }
  },
  layout: 'empty',
  head: {
    title: 'Profiler - Registration'
  },
  methods: {
    async submitRegistration() {
      try {
        await this.$store.dispatch('createNewUser', {
          email: this.email,
          password: this.password
        })
        this.$router.push('/')
      } catch (e) {}
    }
  }
}
</script>

<style lang="sass">
#Registration
  margin: 0 auto
</style>
