<template>
  <Page id="HomePage">
    <template #head>
      <PageHeader>
        <template
          #title
          v-if="data.userInfo.info.first_name && data.userInfo.info.last_name"
          >{{ data.userInfo.info.first_name }}
          {{ data.userInfo.info.last_name }}
          <v-chip v-if="data.isAdmin">Admin</v-chip>
        </template>
        <template #title v-else>
          {{ data.profile }}
          <v-chip v-if="data.isAdmin">Admin</v-chip>
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
            <span v-if="gitApiInfo" class="title"> GitHub Info</span>
            <div v-if="gitApiInfo" class="git">
              <img
                src="https://avatars1.githubusercontent.com/u/43864245?v=4"
                class="git__img"
                alt="profile_img"
              />
              <div class="git__actions">
                <a
                  :href="`${data.userInfo.contacts.github}/?tab=followers`"
                  class="box"
                  target="_blank"
                >
                  Followers
                  <span class="badge">{{ gitApiInfo.followers }}</span>
                </a>
                <a
                  :href="`${data.userInfo.contacts.github}/?tab=following`"
                  class="box"
                  target="_blank"
                >
                  Following
                  <span class="badge">{{ gitApiInfo.following }}</span>
                </a>
                <a
                  :href="`${data.userInfo.contacts.github}/?tab=repositories`"
                  class="box"
                  target="_blank"
                >
                  Repositories
                  <span class="badge">{{ gitApiInfo.public_repos }}</span>
                </a>
              </div>
            </div>

            <span class="title"> User Info</span>
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
            <span class="title"> Contacts</span>
            <CardContainer>
              <span class="font-weight-black">Phone:</span>
              <div v-if="data.userInfo.contacts.phone">
                <v-btn
                  :href="
                    `tel:${data.userInfo.contacts.phone_code}-${data.userInfo.contacts.phone}`
                  "
                  link
                  target="_blank"
                  color="blue"
                  small
                  outlined
                  >Call <v-icon dense class="mx-1">mdi-phone</v-icon>
                </v-btn>
                <v-btn
                  @click="
                    copy(
                      `${data.userInfo.contacts.phone_code}-${data.userInfo.contacts.phone}`
                    )
                  "
                  color="blue"
                  small
                  outlined
                  >Copy <v-icon dense class="mx-1">mdi-content-copy</v-icon>
                </v-btn>
              </div>
              <span v-else>Not indicated</span>
            </CardContainer>
            <CardContainer>
              <span class="font-weight-black">E-mail:</span>
              <div v-if="data.userInfo.contacts.email">
                <v-btn
                  :href="`mailto:${data.userInfo.contacts.email}`"
                  link
                  target="_blank"
                  color="blue"
                  small
                  outlined
                  >mail <v-icon dense class="mx-1">mdi-at</v-icon>
                </v-btn>
                <v-btn
                  @click="copy(data.userInfo.contacts.email)"
                  color="blue"
                  small
                  outlined
                  >Copy <v-icon dense class="mx-1">mdi-content-copy</v-icon>
                </v-btn>
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
              <div v-if="data.userInfo.contacts.git_type">
                <v-btn
                  :href="data.userInfo.contacts.github"
                  link
                  target="_blank"
                  color="blue"
                  small
                  outlined
                  >Open <v-icon dense class="mx-1">mdi-git</v-icon>
                </v-btn>
                <v-btn
                  @click="copy(data.userInfo.contacts.github)"
                  color="blue"
                  small
                  outlined
                  >Copy <v-icon dense class="mx-1">mdi-content-copy</v-icon>
                </v-btn>
              </div>
              <span v-else>Not indicated</span>
            </CardContainer>
            <CardContainer>
              <span class="font-weight-black">LinkedIn:</span>
              <div v-if="data.userInfo.contacts.linkedIn">
                <v-btn
                  :href="data.userInfo.contacts.linkedIn"
                  link
                  target="_blank"
                  color="blue"
                  small
                  outlined
                  >Open <v-icon dense class="mx-1">mdi-linkedin</v-icon>
                </v-btn>
                <v-btn
                  @click="copy(data.userInfo.contacts.linkedIn)"
                  color="blue"
                  small
                  outlined
                  >Copy <v-icon dense class="mx-1">mdi-content-copy</v-icon>
                </v-btn>
              </div>
              <span v-else>Not indicated</span>
            </CardContainer>
            <CardContainer>
              <span class="font-weight-black">Facebook:</span>
              <div v-if="data.userInfo.contacts.facebook">
                <v-btn
                  :href="data.userInfo.contacts.facebook"
                  link
                  target="_blank"
                  color="blue"
                  small
                  outlined
                  >Open <v-icon dense class="mx-1">mdi-facebook</v-icon>
                </v-btn>
                <v-btn
                  @click="copy(data.userInfo.contacts.facebook)"
                  color="blue"
                  small
                  outlined
                  >Copy <v-icon dense class="mx-1">mdi-content-copy</v-icon>
                </v-btn>
              </div>

              <span v-else>Not indicated</span>
            </CardContainer>
            <CardContainer>
              <span class="font-weight-black">Your site:</span>
              <div v-if="data.userInfo.contacts.site">
                <v-btn
                  :href="data.userInfo.contacts.site"
                  link
                  target="_blank"
                  color="blue"
                  small
                  outlined
                  >Open <v-icon dense class="mx-1">mdi-web</v-icon>
                </v-btn>
                <v-btn
                  @click="copy(data.userInfo.contacts.site)"
                  color="blue"
                  small
                  outlined
                  >Copy <v-icon dense class="mx-1">mdi-content-copy</v-icon>
                </v-btn>
              </div>

              <span v-else>Not indicated</span>
            </CardContainer>

            <span class="title"> Working Info</span>
            <CardContainer>
              <span class="font-weight-black">Work Status:</span>
              <span v-if="data.userInfo.work.work_status">{{
                data.userInfo.work.work_status
              }}</span>
              <span v-else>Not indicated</span>
            </CardContainer>
            <CardContainer>
              <span class="font-weight-black">Work Type:</span>
              <span v-if="data.userInfo.work.work_type">{{
                data.userInfo.work.work_type
              }}</span>
              <span v-else>Not indicated</span>
            </CardContainer>
            <CardContainer>
              <span class="font-weight-black">Work Position:</span>
              <span v-if="data.userInfo.work.work_position">{{
                data.userInfo.work.work_position
              }}</span>
              <span v-else>Not indicated</span>
            </CardContainer>
            <CardContainer>
              <span class="font-weight-black">Working Languages:</span>
              <v-chip-group column>
                <v-chip
                  v-for="item in data.userInfo.work.work_languages"
                  :key="item"
                  label
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
                  >{{ item }}</v-chip
                >
              </v-chip-group>
            </CardContainer>
          </Card>
        </template>
        <template #c-3>
          <Card>
            <v-expansion-panels accordion multiple>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <span class="title">
                    Friends <v-chip small label>{{ myFriends.length }}</v-chip>
                  </span>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <Table>
                    <template #table-body>
                      <tr v-for="item in myFriends" :key="item.id">
                        <td>
                          <v-btn
                            @click="$router.push(`/users/${item.id}`)"
                            block
                            small
                            >{{ item.profile }}
                          </v-btn>
                        </td>
                      </tr>
                    </template>
                  </Table>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <span class="title">
                    Articles
                    <v-chip small label>{{ myArticles.length }}</v-chip>
                  </span>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <Table>
                    <template #table-body>
                      <tr v-for="item in myArticles" :key="item.id">
                        <td>
                          <v-btn
                            @click="$router.push(`/articles/${item.id}`)"
                            block
                            small
                            >{{ item.name }}
                          </v-btn>
                        </td>
                      </tr>
                    </template>
                  </Table>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <span class="title">
                    Repositories
                    <v-chip small label>{{ myRepositories.length }}</v-chip>
                  </span>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <Table>
                    <template #table-body>
                      <tr v-for="item in myRepositories" :key="item.id">
                        <td>
                          <v-btn
                            @click="$router.push(`/repositories/${item.id}`)"
                            block
                            small
                            >{{ item.name }}
                          </v-btn>
                        </td>
                      </tr>
                    </template>
                  </Table>
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
  .git
    display: flex
    flex-direction: column
    border: 2px solid #999999
    border-radius: 5px
    .git__img
      object-fit: cover
      width: 100%
      height: 100%
      max-height: 400px
    .git__actions
      height: 30px
      display: flex
      align-items: center
      justify-content: center
      border-radius: 0 0 5px 5px
      .box
        background-color: #e0e0e0
        width: 33.33333%
        height: 100%
        display: flex
        justify-content: center
        align-items: center
        cursor: pointer
        text-decoration: none
        .badge
          background-color: #e0e0e0
          height: 19px
          width: 19px
          text-align: center
          line-height: 17px
          border-radius: 50%
          border: 1px solid #707070
          font-size: 11px
          margin-left: 5px
      .box:hover
        zoom: 1.02
        background-color: #cccccc

  .v-card__actions
    .v-chip
      width: 33%
      margin: 0 2px
      text-align: center
      .v-avatar
        margin-right: 0
        opacity: 1.5
      .v-chip__content
        width: 100%
  span.title
    display: block
    text-align: center
    margin: auto
    span
      margin-bottom: 3px
  .v-slide-group__content
    padding: 0
    .v-chip
      margin: 2px
      padding: 0 5px
      height: 25px
</style>
