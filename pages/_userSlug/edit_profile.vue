<template>
  <Page id="edit_profile">
    <template #head>
      <PageHeader>
        <template #title>Edite profile</template>
        <template #actions>
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
        </template>
      </PageHeader>
    </template>
    <template #body>
      <PageBody col="3">
        <template #c-1>
          <Card>
            <v-text-field
              v-model="info.first_name"
              :rules="rules.name"
              :counter="15"
              label="First name"
              outlined
            />
            <v-text-field
              v-model="info.last_name"
              :rules="rules.name"
              :counter="15"
              label="Last name"
              outlined
            />
            <v-text-field
              v-model="info.location"
              :rules="rules.name"
              :counter="15"
              label="Your current Location"
              outlined
            />
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
              :rules="rules.about"
              :counter="200"
              label="Tell about yourself"
              outlined
              auto-grow
              rows="1"
            />
          </Card>
        </template>
        <template #c-2>
          <Card>
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
              label="Stack languages"
              small-chips
              multiple
              outlined
              height="56px"
            >
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
            </v-select>
          </Card>
        </template>
        <template #c-3>
          <Card>
            <v-row>
              <v-col cols="3">
                <v-select
                  v-model="phone_code"
                  :items="codes"
                  label="Code"
                  outlined
                  height="56px"
                />
              </v-col>
              <v-col cols="9">
                <v-text-field
                  :disabled="!phone_code"
                  v-model="contacts.phone"
                  v-mask="'##-###-##-##'"
                  :counter="12"
                  :rules="rules.phone"
                  :label="phone_label"
                  :placeholder="phone_placeholder"
                  outlined
                  raw
                  type="tel"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-select
                  v-model="git_type"
                  :items="git_types"
                  label="Git"
                  outlined
                  height="56px"
                />
              </v-col>
              <v-col cols="9">
                <v-text-field
                  v-model="contacts.github"
                  :rules="rules.git"
                  :disabled="!git_type"
                  :counter="100"
                  :placeholder="git_type_placeholder"
                  :label="git_type_label"
                  outlined
                  type="url"
                />
              </v-col>
            </v-row>
            <v-text-field
              v-model="contacts.site"
              :rules="rules.cite"
              :counter="100"
              label="Your web-cite"
              outlined
              type="url"
              placeholder="https://EXAMPLE.com"
            />
            <v-text-field
              v-model="contacts.linkedIn"
              :rules="rules.linkedIn"
              :counter="100"
              label="LinkedIn"
              outlined
              type="url"
              placeholder="https://www.linkedin.com/in/USER_SLUG"
            />
            <v-text-field
              v-model="contacts.facebook"
              :rules="rules.facebook"
              :counter="100"
              label="Facebook"
              outlined
              type="url"
              placeholder="https://www.facebook.com/USER_SLUG"
            />
          </Card>
        </template>
      </PageBody>
    </template>
  </Page>
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
      phone_code: null,
      git_type: null,
      git_types: ['GitHub', 'GitLab'],
      work_status: ['Unemployed', 'Full employment', 'Part-time employment'],
      work_type: ['Office worker', 'Freelancer'],
      work_position: [
        'Developer',
        'System Administrator',
        'Business Analytic',
        'Human resources',
        'Quality assurance'
      ],
      codes: [
        '+380',
        '+971',
        '+44',
        '+1',
        '+598',
        '+998',
        '+678',
        '+681',
        '+967',
        '+260',
        '+263',
        '+591',
        '+673'
      ],
      rules: {
        name: [
          (v) => v.length <= 15 || 'Input must be less than 15 characters'
        ],
        about: [
          (v) =>
            v.length <= 200 || 'Description must be less than 200 characters'
        ],
        phone: [(v) => v.length === 12 || 'Phone length must be 12'],
        cite: [
          (v) => /https:\/\/.+/.test(v) || 'Link must starts with "https://"',
          (v) => v.length <= 100 || 'Link must be less than 100 characters'
        ],
        linkedIn: [
          (v) =>
            /https:\/\/www.linkedin.com\/.+/.test(v) ||
            'Link must starts with "https://www.linkedin.com"',
          (v) => v.length <= 100 || 'Link must be less than 100 characters'
        ],
        facebook: [
          (v) =>
            /https:\/\/www.facebook.com\/.+/.test(v) ||
            'Link must starts with "https://www.facebook.com/"',
          (v) => v.length <= 100 || 'Link must be less than 100 characters'
        ],
        git: [
          (v) => {
            if (this.git_type === 'GitHub') {
              return (
                /https:\/\/github.com\/.+/.test(v) ||
                'Must starts with "https://github.com/"'
              )
            } else {
              return (
                /https:\/\/gitlab.com\/.+/.test(v) ||
                'Must starts with "https://gitlab.com/"'
              )
            }
          },
          (v) => v.length <= 100 || 'Must be less than 100 characters'
        ]
      }
    }
  },
  computed: {
    technologies() {
      const technolies = []
      for (const i of this.work.work_languages) {
        try {
          this.languages[i].technologies.forEach((item) => {
            technolies.push(item)
          })
        } catch (e) {}
      }
      return technolies
    },
    git_type_placeholder() {
      if (this.git_type === 'GitHub') {
        return 'https://github.com/USER_SLUG'
      } else if (this.git_type === 'GitLab') {
        return 'https://gitlab.com/USER_SLUG'
      } else {
        return ''
      }
    },
    git_type_label() {
      if (this.git_type === 'GitHub') {
        return 'GitHub'
      } else if (this.git_type === 'GitLab') {
        return 'GitLab'
      } else {
        return 'Select Git Type'
      }
    },
    phone_label() {
      if (!this.phone_code) {
        return 'Select Phone Code'
      } else {
        return 'Phone number'
      }
    },
    phone_placeholder() {
      if (!this.phone_code) {
        return ''
      } else {
        return '##-###-##-##'
      }
    }
  },
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
  async asyncData(context) {
    return {
      contacts: Object.assign({}, context.store.getters.user.userInfo.contacts),
      info: Object.assign({}, context.store.getters.user.userInfo.info),
      work: Object.assign({}, context.store.getters.user.userInfo.work),
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
      // this.$router.push('/')
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

<style lang="sass">
#edit_profile
  .hidden
    visibility: hidden
  .row
    height: 86px
    margin: 0
    .col
      height: 86px
      padding: 0
      .v-input__append-inner
        display: none
</style>
