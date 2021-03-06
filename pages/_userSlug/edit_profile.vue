<template>
  <Page id="editProfile">
    <template #head>
      <PageHeader>
        <template #title>Edit profile</template>
        <template #actions>
          <v-btn
            v-if="!isAdmin"
            v-tooltip.bottom-start="'Become admin.'"
            class="headerButton"
            outlined
            color="green"
            @click="submitBecomeAdmin"
          >
            <v-icon>mdi-account-key</v-icon>
          </v-btn>
          <v-btn
            v-if="isAdmin"
            v-tooltip.bottom-start="'Become casual user.'"
            class="headerButton"
            outlined
            color="green"
            @click="submitBecomeUser"
          >
            <v-icon>mdi-account-arrow-left</v-icon>
          </v-btn>
          <v-btn
            v-tooltip.bottom-start="'Update your information.'"
            class="headerButton"
            outlined
            color="green"
            @click="submitUpdateInfo"
          >
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
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
                  label="Birthday date"
                  readonly
                  outlined
                  v-on="on"
                />
              </template>
              <v-date-picker
                ref="picker"
                v-model="info.date_of_birth"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="save"
              />
            </v-menu>
            <v-text-field
              v-model="info.education"
              :rules="rules.education"
              :counter="40"
              label="Your higher education"
              outlined
            />
            <v-textarea
              v-model="info.about"
              :rules="rules.about"
              :counter="200"
              label="Tell about yourself. (Use /// to break line.)"
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
              v-model="work.work_scope"
              :items="work_scope"
              label="Work scope"
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
            >
            </v-select>
            <v-select
              v-model="work.work_technologies"
              :items="technologies"
              small-chips
              label="Stack technologies"
              multiple
              outlined
            >
            </v-select>
          </Card>
        </template>
        <template #c-3>
          <Card>
            <v-row>
              <v-col cols="3">
                <v-select
                  v-model="contacts.phone_code"
                  :items="codes"
                  label="Code"
                  outlined
                  height="56px"
                />
              </v-col>
              <v-col cols="9">
                <v-text-field
                  v-model="contacts.phone"
                  v-mask="'##-###-##-##'"
                  :disabled="!contacts.phone_code"
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
            <v-row
              v-tooltip.bottom-start="
                'Fetching Git info works only with GitHub profiles.'
              "
            >
              <v-col cols="3">
                <v-select
                  v-model="contacts.git_type"
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
                  :disabled="!contacts.git_type"
                  :counter="100"
                  :placeholder="git_type_placeholder"
                  :label="git_type_label"
                  outlined
                  type="url"
                />
              </v-col>
            </v-row>
            <v-text-field
              v-model="contacts.skype"
              :rules="rules.skype"
              :counter="20"
              label="Your Skype link"
              outlined
              type="url"
              placeholder="live:SKYPE_USER_PROFILE"
            />
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
import { mapGetters } from 'vuex'
import { fetchCategories } from '~/functions/language-technologies'

/**
 * ---(_userSlug/edit_profile.vue)--- Page witch gives ability to edit user info
 * @module pages/_userSlug/edit_profile
 *
 * @vue-event {context(store, error)} asyncData   - return ['fetchCategories']{@link external:functions_language_technologies}, and get ['getters.userInfo']{@link external:store_index} from store.
 * @vue-data {Array} git_types                    - returns array of git types
 * @vue-data {Array} work_status                  - returns array of work statuses
 * @vue-data {Array} work_type                    - returns array of work types
 * @vue-data {Array} work_position                - returns array of work positions
 * @vue-data {Array} work_scope                   - returns array of work scopes
 * @vue-data {Array} codes                        - returns array of phone codes
 * @vue-data {Object} rules                       - rules for inputs
 * @vue-event {isAdmin} submitBecomeAdmin         - Change admin status of user to true. Calls ['changeAdminStatus']{@link external:store_index}
 * @vue-event {isAdmin} submitBecomeUser          - Change admin status of user to false. Calls ['changeAdminStatus']{@link external:store_index}
 * @vue-event {userInfo} submitUpdateInfo         - Change user info. Calls ['updateUserInfo']{@link external:store_index}
 */
export default {
  name: 'EditProfile',
  async asyncData({ store, error }) {
    try {
      return {
        contacts: Object.assign({}, store.getters.userInfo.contacts),
        info: Object.assign({}, store.getters.userInfo.info),
        work: Object.assign({}, store.getters.userInfo.work),
        languages: await fetchCategories()
      }
    } catch (e) {
      error({ message: 'Error while trying to load page.' })
    }
  },
  data() {
    return {
      menu: false,
      git_types: ['GitHub', 'GitLab'],
      work_status: [
        'Unemployed (searching)',
        'Unemployed (not searching)',
        'Full employment',
        'Part-time employment'
      ],
      work_type: ['Office worker', 'Freelancer'],
      work_position: [
        'Developer',
        'System Administrator',
        'Business Analytic',
        'Human resources',
        'Quality assurance'
      ],
      work_scope: [
        'Web development',
        'Game development',
        'Artificial Intelligence'
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
        education: [
          (v) => v.length <= 40 || 'Input must be less than 40 characters'
        ],
        about: [
          (v) =>
            v.length <= 200 || 'Description must be less than 200 characters'
        ],
        phone: [(v) => v.length === 12 || 'Phone length must be 12'],
        cite: [
          (v) => /http.+/.test(v) || 'Link must starts with "http"',
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
        skype: [
          (v) => /live:.+/.test(v) || 'Link must starts with "live:"',
          (v) => v.length <= 20 || 'Link must be less than 20 characters'
        ],
        git: [
          (v) => {
            if (this.contacts.git_type === 'GitHub') {
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
    ...mapGetters(['userInfo', 'isAdmin']),
    user() {
      return this.userInfo
    },
    formIsChanged() {
      return (
        JSON.stringify(this.userInfo) !==
        JSON.stringify({
          contacts: this.contacts,
          info: this.info,
          work: this.work
        })
      )
    },
    technologies() {
      const technolies = []
      this.work.work_languages.forEach((lang) => {
        try {
          this.languages[lang].technologies.forEach((item) => {
            technolies.push(item)
          })
        } catch (e) {
          // it's ok. i muted catching.
        }
      })
      return technolies
    },
    git_type_placeholder() {
      if (this.contacts.git_type === 'GitHub') {
        return 'https://github.com/USER_SLUG'
      } else if (this.contacts.git_type === 'GitLab') {
        return 'https://gitlab.com/USER_SLUG'
      } else {
        return ''
      }
    },
    git_type_label() {
      if (this.contacts.git_type === 'GitHub') {
        return 'GitHub'
      } else if (this.contacts.git_type === 'GitLab') {
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
    },
    'contacts.git_type'() {
      this.contacts.github = ''
    },
    'work.work_languages'(val) {
      const technologies = []
      val.forEach((item) => {
        try {
          this.languages[item].technologies.forEach((value) => {
            technologies.push(value)
          })
        } catch (e) {
          // it's ok. i muted catching.
        }
      })
      this.work.work_technologies = this.work.work_technologies.filter(
        (value) => technologies.includes(value)
      )
      if (this.work.work_technologies.length === 0) {
        this.work.work_technologies.push('empty')
      }
    }
  },
  methods: {
    async submitBecomeAdmin() {
      try {
        const res = await this.$dialog.confirm({
          text:
            "It will give you opportunity to access Admin Panel Page. Where you cant change Languages and technologies items. (Please don't delete existing categories! But you can create new.)",
          title: 'You want to become Admin? '
        })
        if (res) {
          await this.$store.dispatch('changeAdminStatus', true)
          this.$dialog.message.success(`You had become Admin`, {
            position: 'top-right',
            timeout: 5000
          })
        } else {
          this.$dialog.message.error(`You had refuse to become Admin`, {
            position: 'top-right',
            timeout: 5000
          })
        }
      } catch (e) {
        console.log(`Error in trying to become admin: ${e}`)
      }
    },
    async submitBecomeUser() {
      try {
        const res = await this.$dialog.confirm({
          text: 'You will lose access to admin page',
          title: 'You want to become casual User?'
        })
        if (res) {
          await this.$store.dispatch('changeAdminStatus', false)
          this.$dialog.message.success(`You had become casual user`, {
            position: 'top-right',
            timeout: 5000
          })
        } else {
          this.$dialog.message.error(`You had refuse becoming casual user`, {
            position: 'top-right',
            timeout: 5000
          })
        }
      } catch (e) {
        console.log(`Error in trying to become casual user: ${e}`)
      }
    },
    async submitUpdateInfo() {
      try {
        if (this.contacts.git_type === 'GitHub') {
          try {
            const gitApiKey = `https://api.github.com/users/${
              this.contacts.github.split('https://github.com/')[1]
            }`
            const checkingGitApi = (await this.$axios.get(gitApiKey)).data
            if (checkingGitApi.login) {
              this.contacts.gitApi = gitApiKey
            }
          } catch (e) {
            this.$dialog.message.error(
              `You had write wrong link to GiHub profile`,
              { position: 'top-right', timeout: 5000 }
            )
            this.contacts.gitApi = ''
            this.contacts.github = ''
            return
          }
        } else {
          this.contacts.gitApi = ''
        }
        await this.$store.dispatch('updateUserInfo', {
          contacts: this.contacts,
          info: this.info,
          work: this.work
        })
        this.$dialog.message.success(`You had update your info`, {
          position: 'top-right',
          timeout: 5000
        })
        this.$router.push('/')
      } catch (e) {
        console.log(`Error in trying to update user info: ${e}`)
      }
    },
    save(date) {
      this.$refs.menu.save(date)
    },
    remove(item) {
      const index = this.friends.indexOf(item.name)
      if (index >= 0) this.friends.splice(index, 1)
    }
  },
  head: {
    title: `Profiler - Edit Profile`
  }
}
</script>

<style lang="sass">
#editProfile
  .row
    height: 86px
    margin: 0 0 5px 0
    .col
      height: 86px
      padding: 0
      .v-input__append-inner
        display: none
  .v-input
    margin-bottom: 5px
</style>
