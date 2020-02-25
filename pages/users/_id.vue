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
          <v-btn
            @click="addTomMyList(data.id)"
            v-if="!$store.getters.user.lists.friends.includes(data.id)"
            class="mx-1"
            color="green"
            >Add to my list
          </v-btn>
          <v-btn @click="deleteFromMyList()" v-else class="mx-1" color="red"
            >remove from my list
          </v-btn>
        </template>
      </PageHeader>
    </template>
    <template #body>
      <PageBody col="3">
        <template #c-1>
          <Card>
            <GitInfo
              v-if="data.userInfo.contacts.gitApiInfo"
              :gitApiInfo="gitApiInfo"
              :data="data"
            />

            <Header> User Info</Header>
            <CardContainer>
              <LineTitle>Location:</LineTitle>
              <span v-if="data.userInfo.info.location">
                {{ data.userInfo.info.location }}</span
              >
              <span v-else>Not indicated</span>
            </CardContainer>
            <CardContainer>
              <LineTitle>Date of birth:</LineTitle>
              <span v-if="data.userInfo.info.date_of_birth">{{
                data.userInfo.info.date_of_birth
              }}</span>
              <span v-else>Not indicated</span>
            </CardContainer>
            <CardContainer>
              <LineTitle>About:</LineTitle>
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
              <LineTitle>E-mail:</LineTitle>

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
              <LineTitle>Phone:</LineTitle>
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
              <LineTitle v-if="data.userInfo.contacts.git_type === 'GitHub'">
                GitHub:
              </LineTitle>
              <LineTitle
                v-else-if="data.userInfo.contacts.git_type === 'GitLab'"
              >
                GitLab:
              </LineTitle>
              <LineTitle v-else>Git:</LineTitle>
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
              <LineTitle>LinkedIn:</LineTitle>
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
              <LineTitle>Facebook:</LineTitle>
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
              <LineTitle>Your site:</LineTitle>
              <div v-if="data.userInfo.contacts.site">
                <BtnOpenBlank :link="data.userInfo.contacts.site" />
                <BtnCopy :copyValue="data.userInfo.contacts.site" />
              </div>

              <span v-else>Not indicated</span>
            </CardContainer>

            <Header> Working Info</Header>
            <CardContainer>
              <LineTitle>Work Status:</LineTitle>
              <span v-if="data.userInfo.work.work_status">
                {{ data.userInfo.work.work_status }}
              </span>
              <span v-else>Not indicated</span>
            </CardContainer>
            <CardContainer>
              <LineTitle>Work Type:</LineTitle>
              <span v-if="data.userInfo.work.work_type">
                {{ data.userInfo.work.work_type }}
              </span>
              <span v-else>Not indicated</span>
            </CardContainer>
            <CardContainer>
              <LineTitle>Work Position:</LineTitle>
              <span v-if="data.userInfo.work.work_position">
                {{ data.userInfo.work.work_position }}
              </span>
              <span v-else>Not indicated</span>
            </CardContainer>
            <CardContainer>
              <LineTitle>Working Languages:</LineTitle>
              <v-chip-group v-if="!workLanguages.length == 0" column>
                <v-chip v-for="item in workLanguages" :key="item" label small>{{
                  item
                }}</v-chip>
              </v-chip-group>
              <span v-else>Not indicated</span>
            </CardContainer>
            <CardContainer>
              <LineTitle>Working Languages:</LineTitle>
              <v-chip-group v-if="!workTechnologies.length == 0" column>
                <v-chip
                  v-for="item in workTechnologies"
                  :key="item"
                  label
                  small
                  >{{ item }}</v-chip
                >
              </v-chip-group>
              <span v-else>Not indicated</span>
            </CardContainer>
          </Card>
        </template>
        <template #c-3>
          <Card>
            <Header>Your lists</Header>
            <v-expansion-panels accordion multiple>
              <v-expansion-panel :disabled="userFriends.length === 0">
                <v-expansion-panel-header>
                  <Header>
                    Friends
                    <v-chip small label>{{ userFriends.length }}</v-chip>
                  </Header>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-btn
                    v-for="item in userFriends"
                    :key="item.id"
                    @click="$router.push(`/users/${item.id}`)"
                    class="my-1"
                    block
                    small
                    >{{ item.profile }}
                  </v-btn>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel :disabled="userArticles.length === 0">
                <v-expansion-panel-header>
                  <Header>
                    Articles
                    <v-chip small label>{{ userArticles.length }}</v-chip>
                  </Header>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-btn
                    v-for="item in userArticles"
                    :key="item.id"
                    @click="$router.push(`/articles/${item.id}`)"
                    block
                    small
                    class="my-1"
                    >{{ item.name }}
                  </v-btn>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel :disabled="userRepositories.length === 0">
                <v-expansion-panel-header>
                  <Header>
                    Repositories
                    <v-chip small label>{{ userRepositories.length }}</v-chip>
                  </Header>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-btn
                    v-for="item in userRepositories"
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
import { fetchUserByID, fetchAllUsers } from '~/functions/users'
import { fetchAllArticles } from '~/functions/articles'
import { fetchAllRepositories } from '~/functions/repositories'

export default {
  name: 'Id',
  computed: {
    workLanguages() {
      const workLanguages = []
      this.data.userInfo.work.work_languages.forEach((item) => {
        if (item !== 'empty') {
          workLanguages.push(item)
        }
      })
      return workLanguages
    },
    workTechnologies() {
      const workTechnologies = []
      this.data.userInfo.work.work_technologies.forEach((item) => {
        if (item !== 'empty') {
          workTechnologies.push(item)
        }
      })
      return workTechnologies
    },
    userArticles() {
      const myListIDS = this.data.lists.articles
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
    userRepositories() {
      const myListIDS = this.data.lists.repositories
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
    userFriends() {
      const myListIDS = this.data.lists.friends
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
  async asyncData({ route, app }) {
    try {
      const data = await fetchUserByID(route.params.id)
      const allUsers = await fetchAllUsers()
      const allRepositories = await fetchAllRepositories()
      const allArticles = await fetchAllArticles()
      if (data.userInfo.contacts.gitApi) {
        return {
          data,
          allUsers,
          allRepositories,
          allArticles,
          gitApiInfo: (await app.$axios.get(data.userInfo.contacts.gitApi)).data
        }
      }
      return {
        data,
        allUsers,
        allRepositories,
        allArticles
      }
    } catch (e) {
      throw Error
    }
  },
  head: {
    title: `Profiler - User Information`
  },
  methods: {
    deleteFromMyList(id) {
      try {
        this.$store.commit('deleteFriend', id)
        this.$store.dispatch('updateUserInfo')
        this.$dialog.message.error(`You delete friend`, {
          position: 'top-right',
          timeout: 3000
        })
      } catch (e) {}
    },
    addTomMyList(id) {
      try {
        this.$store.commit('pushFriend', id)
        this.$store.dispatch('updateUserInfo')
        this.$dialog.message.success(`You add friend`, {
          position: 'top-right',
          timeout: 3000
        })
      } catch (e) {}
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
  .v-expansion-panel-header
    padding: 0 24px
</style>
