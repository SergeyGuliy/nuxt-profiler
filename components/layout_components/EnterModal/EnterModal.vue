<template>
  <v-card>
    <v-tabs v-model="tabs" fixed-tabs>
      <v-tab href="#login" class="primary--text">
        Login
      </v-tab>

      <v-tab href="#registration" class="primary--text">
        Registration
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tabs">
      <v-tab-item value="login">
        <Login @closeModal="$emit('closeModal')" />
      </v-tab-item>
      <v-tab-item value="registration">
        <Registration @closeModal="$emit('closeModal')" />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import Login from './Login'
import Registration from './Registration'
export default {
  name: 'LogInModal',
  components: { Login, Registration },
  data() {
    return {
      tabs: 'login'
    }
  }
}
</script>
