<template>
  <Page id="HomePage">
    <template #head>
      <PageHeader>
        <template
          #title
          v-if="data.userInfo.info.first_name && data.userInfo.info.last_name"
          >{{ data.userInfo.info.first_name }}
          {{ data.userInfo.info.last_name }}
          <v-chip v-if="data.isAdmin" small>Admin</v-chip>
        </template>
        <template #title v-else>
          {{ data.profile }}
          <v-chip v-if="data.isAdmin" small>Admin</v-chip>
        </template>
        <template #actions>
          <v-btn @click="log" class="mx-1">Save</v-btn>
        </template>
      </PageHeader>
    </template>
    <template #body>
      <PageBody col="3">
        <template #c-1>
          <Card>
            <Header v-if="gitApiInfo"> GitHub Info</Header>

            <GitInfo v-if="gitApiInfo" :gitApiInfo="gitApiInfo" :data="data" />

            <Header> User Info</Header>
            <CardContainer>
              <span class="font-weight-black">Location:</span>
              <span v-if="data.userInfo.info.location">{{
                data.userInfo.info.location
              }}</span>
              <span v-else>Not indicated</span>
            </CardContainer>
            <CardContainer>
              <span class="font-weight-black">Date of birth:</span>
              <span v-if="data.userInfo.info.date_of_birth">{{
                data.userInfo.info.date_of_birth
              }}</span>
              <span v-else>Not indicated</span>
            </CardContainer>
            <CardContainer>
              <span class="font-weight-black">Описание:</span>
            </CardContainer>
            <CardContainer>
              <p v-if="data.userInfo.info.about">
                {{ data.userInfo.info.about }}
              </p>
              <p v-else>Not indicated</p>
            </CardContainer>
          </Card>
        </template>
        <template #c-2>
          <Card>
            <Header> Contacts</Header>
            <CardContainer>
              <span class="font-weight-black">Phone:</span>
              <div v-if="data.userInfo.contacts.phone">
                <BtnOpenBlank
                  :link="
                    `tel:${data.userInfo.contacts.phone_code}-${data.userInfo.contacts.phone}`
                  "
                  icon="mdi-phone"
                  text="Call"
                />
                <BtnCopy
                  :copyValue="
                    `${data.userInfo.contacts.phone_code}-${data.userInfo.contacts.phone}`
                  "
                />
              </div>
              <span v-else>Not indicated</span>
            </CardContainer>
            <CardContainer>
              <span class="font-weight-black">E-mail:</span>

              <div v-if="data.userInfo.contacts.email">
                <BtnOpenBlank
                  :link="`mailto:${data.userInfo.contacts.email}`"
                  icon="mdi-at"
                  text="mail"
                />
                <BtnCopy :copyValue="data.userInfo.contacts.email" />
              </div>
              <span v-else>Not indicated</span>
            </CardContainer>
            <CardContainer>
              <span
                v-if="data.userInfo.contacts.git_type === 'GitHub'"
                class="font-weight-black"
              >
                GitHub:
              </span>
              <span
                v-else-if="data.userInfo.contacts.git_type === 'GitLab'"
                class="font-weight-black"
              >
                GitLab:
              </span>
              <span v-else class="font-weight-black">Git:</span>
              <div v-if="data.userInfo.contacts.github">
                <BtnOpenBlank
                  :link="data.userInfo.contacts.github"
                  icon="mdi-git"
                />
                <BtnCopy :copyValue="data.userInfo.contacts.github" />
              </div>
              <span v-else>Not indicated</span>
            </CardContainer>
            <CardContainer>
              <span class="font-weight-black">LinkedIn:</span>
              <div v-if="data.userInfo.contacts.linkedIn">
                <BtnOpenBlank
                  :link="data.userInfo.contacts.linkedIn"
                  icon="mdi-linkedin"
                />
                <BtnCopy :copyValue="data.userInfo.contacts.linkedIn" />
              </div>
              <span v-else>Not indicated</span>
            </CardContainer>
            <CardContainer>
              <span class="font-weight-black">Facebook:</span>
              <div v-if="data.userInfo.contacts.facebook">
                <BtnOpenBlank
                  :link="data.userInfo.contacts.facebook"
                  icon="mdi-facebook"
                />
                <BtnCopy :copyValue="data.userInfo.contacts.facebook" />
              </div>

              <span v-else>Not indicated</span>
            </CardContainer>
            <CardContainer>
              <span class="font-weight-black">Your site:</span>
              <div v-if="data.userInfo.contacts.site">
                <BtnOpenBlank :link="data.userInfo.contacts.site" />
                <BtnCopy :copyValue="data.userInfo.contacts.site" />
              </div>

              <span v-else>Not indicated</span>
            </CardContainer>

            <Header> Working Info</Header>
            <CardContainer>
              <span class="font-weight-black">Work Status:</span>
              <span v-if="data.userInfo.work.work_status">
                {{ data.userInfo.work.work_status }}
              </span>
              <span v-else>Not indicated</span>
            </CardContainer>
            <CardContainer>
              <span class="font-weight-black">Work Type:</span>
              <span v-if="data.userInfo.work.work_type">
                {{ data.userInfo.work.work_type }}
              </span>
              <span v-else>Not indicated</span>
            </CardContainer>
            <CardContainer>
              <span class="font-weight-black">Work Position:</span>
              <span v-if="data.userInfo.work.work_position">
                {{ data.userInfo.work.work_position }}
              </span>
              <span v-else>Not indicated</span>
            </CardContainer>
            <CardContainer>
              <span class="font-weight-black">Working Languages:</span>
              <v-chip-group column>
                <v-chip
                  v-for="item in data.userInfo.work.work_languages"
                  :key="item"
                  label
                  small
                  >{{ item }}</v-chip
                >
              </v-chip-group>
            </CardContainer>
            <CardContainer>
              <span class="font-weight-black">Working Languages:</span>
              <v-chip-group column>
                <v-chip
                  v-for="item in data.userInfo.work.work_technologies"
                  :key="item"
                  label
                  small
                  >{{ item }}</v-chip
                >
              </v-chip-group>
            </CardContainer>
          </Card>
        </template>
        <template #c-3>
          <Card>
            <Header>Your lists</Header>
            <v-expansion-panels accordion multiple>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <Header>
                    Friends <v-chip small label>{{ myFriends.length }}</v-chip>
                  </Header>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-btn
                    v-for="item in myFriends"
                    :key="item.id"
                    @click="$router.push(`/users/${item.id}`)"
                    class="my-1"
                    block
                    small
                    >{{ item.profile }}
                  </v-btn>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <Header>
                    Articles
                    <v-chip small label>{{ myArticles.length }}</v-chip>
                  </Header>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-btn
                    v-for="item in myArticles"
                    :key="item.id"
                    @click="$router.push(`/articles/${item.id}`)"
                    block
                    small
                    class="my-1"
                    >{{ item.name }}
                  </v-btn>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <Header>
                    Repositories
                    <v-chip small label>{{ myRepositories.length }}</v-chip>
                  </Header>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-btn
                    v-for="item in myRepositories"
                    :key="item.id"
                    @click="$router.push(`/repositories/${item.id}`)"
                    block
                    small
                    class="my-1"
                    >{{ item.name }}
                  </v-btn>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </Card>
        </template>
      </PageBody>
    </template>
  </Page>
</template>

<script>
import { fetchAllArticles } from '~/functions/articles'
import { fetchAllRepositories } from '~/functions/repositories'
import { fetchAllUsers } from '~/functions/users'
export default {
  data() {
    return {
      dialog: false,
      loading: false
    }
  },
  computed: {
    myArticles() {
      const myListIDS = this.$store.getters.user.lists.articles
      const myList = []
      for (const i of myListIDS) {
        try {
          const art = this.allArticles[i]
          art.id = i
          myList.push(art)
        } catch (e) {
          continue
        }
      }
      return myList
    },
    myRepositories() {
      const myListIDS = this.$store.getters.user.lists.repositories
      const myList = []
      for (const i of myListIDS) {
        try {
          const rep = this.allRepositories[i]
          rep.id = i
          myList.push(rep)
        } catch (e) {
          continue
        }
      }
      return myList
    },
    myFriends() {
      const myListIDS = this.$store.getters.user.lists.friends
      const myList = []
      for (const i of myListIDS) {
        try {
          const usr = this.allUsers[i]
          usr.id = i
          myList.push(usr)
        } catch (e) {
          continue
        }
      }
      return myList
    }
  },
  async asyncData({ app, store }) {
    try {
      const data = store.getters.user
      if (data.userInfo.contacts.gitApi) {
        return {
          data,
          gitApiInfo: (await app.$axios.get(data.userInfo.contacts.gitApi))
            .data,
          allUsers: await fetchAllUsers(),
          allRepositories: await fetchAllRepositories(),
          allArticles: await fetchAllArticles()
        }
      }
      return {
        data
      }
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    log() {
      console.log(this.data)
      if (this.gitApiInfo) {
        console.log(this.gitApiInfo)
      }
    },
    async copy(copiedText) {
      try {
        await this.$copyText(copiedText)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="sass">
#HomePage
  .v-slide-group__content
    padding: 0
    .v-chip
      margin: 2px
      padding: 0 5px
      height: 25px
</style>
