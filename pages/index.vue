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
            <span class="title"> GitHub Info</span>
            <img
              v-if="gitApiInfo"
              src="https://avatars1.githubusercontent.com/u/43864245?v=4"
              class="profile"
              alt="profile_img"
            />
            <v-card-actions v-if="gitApiInfo">
              <v-chip>
                <v-avatar left>
                  {{ gitApiInfo.followers }}
                </v-avatar>
                Followers
              </v-chip>
              <v-chip>
                <v-avatar left>
                  {{ gitApiInfo.following }}
                </v-avatar>
                Following
              </v-chip>
              <v-chip>
                <v-avatar left>
                  {{ gitApiInfo.public_repos }}
                </v-avatar>
                Repos
              </v-chip>
            </v-card-actions>

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
              <v-btn
                v-if="data.userInfo.contacts.phone"
                :href="
                  `tel:${data.userInfo.contacts.phone_code}-${data.userInfo.contacts.phone}`
                "
                link
                target="_blank"
                color="blue"
                small
                outlined
                >{{ data.userInfo.contacts.phone_code }}-{{
                  data.userInfo.contacts.phone
                }}
              </v-btn>
              <span v-else>Not indicated</span>
            </CardContainer>
            <CardContainer>
              <span class="font-weight-black">E-mail:</span>
              <v-btn
                v-if="data.userInfo.contacts.email"
                :href="`mailto:${data.userInfo.contacts.email}`"
                link
                target="_blank"
                color="blue"
                small
                outlined
                >{{ data.userInfo.contacts.email }}
              </v-btn>
              <span v-else>Not indicated</span>
            </CardContainer>
            <CardContainer>
              <span
                v-if="data.userInfo.contacts.git_type === 'GitHub'"
                class="font-weight-black"
                >GitHub:</span
              >
              <span
                v-else-if="data.userInfo.contacts.git_type === 'GitLab'"
                class="font-weight-black"
                >GitLab:</span
              >
              <span v-else class="font-weight-black">Git:</span>
              <v-btn
                v-if="data.userInfo.contacts.git_type === 'GitHub'"
                :href="data.userInfo.contacts.github"
                link
                target="_blank"
                color="blue"
                small
                outlined
                >{{ data.userInfo.contacts.github.split('://')[1] }}
              </v-btn>
              <span v-else>Not indicated</span>
            </CardContainer>
            <CardContainer>
              <span class="font-weight-black">LinkedIn:</span>
              <v-btn
                v-if="data.userInfo.contacts.linkedIn"
                :href="data.userInfo.contacts.linkedIn"
                link
                target="_blank"
                color="blue"
                small
                outlined
                >{{ data.userInfo.contacts.linkedIn.split('://')[1] }}
              </v-btn>
              <span v-else>Not indicated</span>
            </CardContainer>
            <CardContainer>
              <span class="font-weight-black">Facebook:</span>
              <v-btn
                v-if="data.userInfo.contacts.facebook"
                :href="data.userInfo.contacts.facebook"
                link
                target="_blank"
                color="blue"
                small
                outlined
                >{{ data.userInfo.contacts.facebook.split('://')[1] }}
              </v-btn>
              <span v-else>Not indicated</span>
            </CardContainer>
            <CardContainer>
              <span class="font-weight-black">Your site:</span>
              <v-btn
                v-if="data.userInfo.contacts.site"
                :href="data.userInfo.contacts.site"
                link
                target="_blank"
                color="blue"
                small
                outlined
                >{{ data.userInfo.contacts.site.split('://')[1] }}
              </v-btn>
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
            <span class="title"> Friends</span>

            <Table table_height="175px">
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
            <span class="title"> Articles</span>

            <Table table_height="175px">
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
            <span class="title"> Repositories</span>

            <Table table_height="175px">
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
    }
  }
}
</script>

<style lang="sass">
#HomePage
  img.profile
    object-fit: cover
    width: 100%
    height: 100%
    max-height: 400px
    border-radius: 10px
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
    margin: 10px auto
  .v-slide-group__content
    padding: 0
    .v-chip
      margin: 2px
      padding: 0 5px
      height: 25px
</style>
