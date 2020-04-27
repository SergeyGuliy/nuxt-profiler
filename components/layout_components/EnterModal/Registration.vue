<template>
  <v-card id="Registration" raised>
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
          :type="showPassword ? 'text' : 'password'"
          label="Input password"
          required
          outlined
          @click:append="showPassword = !showPassword"
        />
        <v-text-field
          v-model="passwordRepeat"
          :rules="rules.passwordRepeat"
          :counter="16"
          :append-icon="showPasswordRepeat ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPasswordRepeat ? 'text' : 'password'"
          label="Repeat password"
          required
          outlined
          @click:append="showPasswordRepeat = !showPasswordRepeat"
        />
        <v-row>
          <v-col cols="6">
            <v-btn
              :disabled="!valid"
              :loading="loading"
              color="success"
              class="mr-4"
              block
              @click="submitRegistration"
            >
              Registration
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn color="red" block @click="$emit('closeModal')">
              close
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Registration',
  data() {
    return {
      loading: false,
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
  methods: {
    async submitRegistration() {
      try {
        this.loading = true
        await this.$store.dispatch('createNewUser', {
          email: this.email,
          password: this.password
        })
        this.loading = false
        this.$dialog.message.success(`You successfully registrated in base.`, {
          position: 'top-right',
          timeout: 5000
        })
      } catch (e) {
        this.$dialog.message.error(`${e.message}`, {
          position: 'top-right',
          timeout: 5000
        })
        this.email = ''
        this.password = ''
        this.passwordRepeat = ''
        this.loading = false
      }
    }
  }
}
</script>

<style lang="sass">
#Registration
  margin: 0 auto
</style>
