<template>
  <BodyCard>
    <template #head>
      <BodyCardHeader>
        <template #title>Edit Profile</template>
        <div class="flex">
          <v-dialog v-model="dialog" persistent max-width="290">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" v-if="!$store.getters.user.isAdmin" mx-1
                >Become admin</v-btn
              >
            </template>
            <v-card>
              <v-card-title class="headline"
                >Use Google's location service?</v-card-title
              >
              <v-card-text
                >Let Google help apps determine location. This means sending
                anonymous location data to Google, even when no apps are
                running.</v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="dialog = false">Disagree</v-btn>
                <v-btn
                  @click="submitBecomeAdmin"
                  :loading="loading"
                  :disabled="loading"
                  color="primary"
                  >Agree</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-btn @click="submitUpdateInfo" :loading="loadingSave" class="mx-1"
            >Save</v-btn
          >
        </div>
      </BodyCardHeader>
    </template>
    <template #body>
      <BodyCardMain3>
        <template #c-1>
          <v-card color="#385F73" dark height="100%">
            <v-card-subtitle>
              <v-text-field
                v-model="info.first_name"
                label="First name"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="info.last_name"
                label="Last name"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="info.location"
                label="Your current Location"
                outlined
              ></v-text-field>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="info.date_of_birth"
                    v-on="on"
                    label="Birthday date"
                    readonly
                    outlined
                  />
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="info.date_of_birth"
                  :max="new Date().toISOString().substr(0, 10)"
                  @change="save"
                  min="1950-01-01"
                />
              </v-menu>
              <v-textarea
                v-model="info.about"
                label="Tell about yourself"
                outlined
              ></v-textarea>
            </v-card-subtitle>
          </v-card>
        </template>
        <template #c-2>
          <v-card color="#385F73" dark height="100%">
            <v-card-subtitle>
              <v-select
                v-model="work.work_status"
                :items="work_status"
                label="Work status"
                outlined
                height="56px"
              >
              </v-select>
              <v-select
                v-model="work.work_type"
                :items="work_type"
                label="Working type"
                outlined
                height="56px"
              />
              <v-select
                v-model="work.work_position"
                :items="work_position"
                label="Work position"
                outlined
                height="56px"
              />
              <v-select
                v-model="work.work_languages"
                :items="Object.keys(languages)"
                chips
                label="Stack languages"
                multiple
                outlined
                height="56px"
              >
                <!--                <template v-slot:selection="{ item, index }">-->
                <!--                  <v-chip v-if="index === 0">-->
                <!--                    <span>{{ item }}</span>-->
                <!--                  </v-chip>-->
                <!--                  <span v-if="index === 1" class="grey&#45;&#45;text caption"-->
                <!--                    >(+{{ work.work_languages.length - 1 }})</span-->
                <!--                  >-->
                <!--                </template>-->
              </v-select>
              <v-select
                v-model="work.work_technologies"
                :items="technologies"
                chips
                label="Stack technologies"
                multiple
                outlined
                height="56px"
              >
                <!--                <template v-slot:selection="{ item, index }">-->
                <!--                  <v-chip v-if="index === 0">-->
                <!--                    <span>{{ item }}</span>-->
                <!--                  </v-chip>-->
                <!--                  <span v-if="index === 1" class="grey&#45;&#45;text caption"-->
                <!--                    >(+{{ work.work_technologies.length - 1 }})</span-->
                <!--                  >-->
                <!--                </template>-->
              </v-select>
            </v-card-subtitle>
          </v-card>
        </template>
        <template #c-3>
          <v-card color="#385F73" dark height="100%">
            <v-card-subtitle>
              <v-text-field
                v-model="contacts.phone"
                label="Contact phone"
                outlined
                type="number"
              ></v-text-field>
              <v-text-field
                v-model="contacts.site"
                label="Your web-cite"
                outlined
                type="url"
              ></v-text-field>
              <v-text-field
                v-model="contacts.linkedIn"
                label="LinkedIn"
                outlined
                type="url"
              ></v-text-field>
              <v-text-field
                v-model="contacts.facebook"
                label="Facebook"
                outlined
                type="url"
              ></v-text-field>
              <v-text-field
                v-model="contacts.github"
                label="GitHub"
                outlined
                type="url"
              ></v-text-field>
            </v-card-subtitle>
          </v-card>
        </template>
      </BodyCardMain3>
    </template>
  </BodyCard>
</template>

<script>
import { fetchCategories } from '~/functions/language-technologies'
export default {
  name: 'EditProfile',
  head: {
    title: `Profiler - Edit Profile`
  },
  data() {
    return {
      dialog: false,
      loading: false,
      loadingSave: false,
      menu: false,
      work_status: ['Unemployed', 'Full employment', 'Part-time employment'],
      work_type: ['Office worker', 'Freelancer'],
      work_position: [
        'Developer',
        'System Administrator',
        'Business Analytic',
        'Human resources',
        'Quality assurance'
      ]
    }
  },
  // computed: {
  //   technologies() {
  //     const technolies = []
  //     for (const i in this.work.work_technologies) {
  //       try {
  //         this.languages[i].technologies.forEach((item) => {
  //           console.log(item)
  //           technolies.push(item)
  //         })
  //       } catch (e) {}
  //     }
  //     return technolies
  //   }
  // },
  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000)
      }
    },
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  async asyncData({ store }) {
    return {
      contacts: Object.assign({}, store.getters.user.userInfo.contacts),
      info: Object.assign({}, store.getters.user.userInfo.info),
      work: Object.assign({}, store.getters.user.userInfo.work),
      languages: await fetchCategories()
    }
  },
  methods: {
    async submitBecomeAdmin() {
      this.loading = true
      this.$store.commit('becomeAdmin')
      await this.$store.dispatch('updateUserInfo')
      this.dialog = false
    },
    async submitUpdateInfo() {
      this.$store.commit('updateUserInfo', {
        contacts: this.contacts,
        info: this.info,
        work: this.work
      })
      await this.$store.dispatch('updateUserInfo')
      this.$router.push('/')
    },
    save(date) {
      this.$refs.menu.save(date)
    },
    remove(item) {
      const index = this.friends.indexOf(item.name)
      if (index >= 0) this.friends.splice(index, 1)
    }
  }
}
</script>

<style scoped lang="sass">
.hidden
  visibility: hidden
</style>
