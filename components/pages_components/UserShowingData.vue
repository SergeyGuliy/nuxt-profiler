<template>
  <PageBody col="3">
    <template #c-1>
      <Card>
        <GitInfo v-if="gitApiInfo" :gitApiInfo="gitApiInfo" :data="data" />

        <CardTitle class="d-print-none">User Info</CardTitle>
        <CardRow>
          <CardRowTitle>Location:</CardRowTitle>
          <span>{{
            data.userInfo.info.location
              ? data.userInfo.info.location
              : 'Not indicated'
          }}</span>
        </CardRow>
        <CardRow>
          <CardRowTitle>Date of birth:</CardRowTitle>
          <span>{{
            data.userInfo.info.date_of_birth
              ? data.userInfo.info.date_of_birth
              : 'Not indicated'
          }}</span>
        </CardRow>
        <CardRow>
          <CardRowTitle>Education:</CardRowTitle>
          <span>{{
            data.userInfo.info.education
              ? data.userInfo.info.education
              : 'Not indicated'
          }}</span>
        </CardRow>
        <CardRow>
          <CardRowTitle>About:</CardRowTitle>
        </CardRow>
        <CardRow>
          <p class="about_user" />
        </CardRow>
      </Card>
    </template>
    <template #c-2>
      <Card>
        <CardTitle>Contacts</CardTitle>
        <CardRow :class="{ 'd-print-none': !data.userInfo.contacts.email }">
          <CardRowTitle>E-mail:</CardRowTitle>

          <div v-if="data.userInfo.contacts.email">
            <BtnOpenBlank
              :link="data.userInfo.contacts.email"
              type="email"
              icon="mdi-at"
              text="mail"
            />
            <BtnCopy :copyValue="data.userInfo.contacts.email" />
          </div>
          <span v-else>Not indicated</span>
        </CardRow>
        <CardRow :class="{ 'd-print-none': !data.userInfo.contacts.phone }">
          <CardRowTitle>Phone:</CardRowTitle>
          <div v-if="data.userInfo.contacts.phone">
            <BtnOpenBlank
              :link="
                `${data.userInfo.contacts.phone_code}-${data.userInfo.contacts.phone}`
              "
              type="tel"
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
        </CardRow>
        <CardRow :class="{ 'd-print-none': !data.userInfo.contacts.skype }">
          <CardRowTitle>Skype:</CardRowTitle>

          <div v-if="data.userInfo.contacts.skype">
            <BtnOpenBlank
              :link="`${data.userInfo.contacts.skype.split('live:')[1]}`"
              type="skype"
              icon="mdi-skype"
              text="call"
            />
            <BtnCopy
              :copyValue="
                `skype:${
                  data.userInfo.contacts.skype.split('live:')[1]
                }?userinfo`
              "
            />
          </div>
          <span v-else>Not indicated</span>
        </CardRow>
        <CardRow :class="{ 'd-print-none': !data.userInfo.contacts.github }">
          <CardRowTitle v-if="data.userInfo.contacts.git_type === 'GitHub'">
            GitHub:
          </CardRowTitle>
          <CardRowTitle
            v-else-if="data.userInfo.contacts.git_type === 'GitLab'"
          >
            GitLab:
          </CardRowTitle>
          <CardRowTitle v-else>Git:</CardRowTitle>
          <div v-if="data.userInfo.contacts.github">
            <BtnOpenBlank
              :link="data.userInfo.contacts.github"
              icon="mdi-git"
            />
            <BtnCopy :copyValue="data.userInfo.contacts.github" />
          </div>
          <span v-else>Not indicated</span>
        </CardRow>
        <CardRow :class="{ 'd-print-none': !data.userInfo.contacts.linkedIn }">
          <CardRowTitle>LinkedIn:</CardRowTitle>
          <div v-if="data.userInfo.contacts.linkedIn">
            <BtnOpenBlank
              :link="data.userInfo.contacts.linkedIn"
              icon="mdi-linkedin"
            />
            <BtnCopy :copyValue="data.userInfo.contacts.linkedIn" />
          </div>
          <span v-else>Not indicated</span>
        </CardRow>
        <CardRow :class="{ 'd-print-none': !data.userInfo.contacts.facebook }">
          <CardRowTitle>Facebook:</CardRowTitle>
          <div v-if="data.userInfo.contacts.facebook">
            <BtnOpenBlank
              :link="data.userInfo.contacts.facebook"
              icon="mdi-facebook"
            />
            <BtnCopy :copyValue="data.userInfo.contacts.facebook" />
          </div>

          <span v-else>Not indicated</span>
        </CardRow>
        <CardRow :class="{ 'd-print-none': !data.userInfo.contacts.site }">
          <CardRowTitle>Your site:</CardRowTitle>
          <div v-if="data.userInfo.contacts.site">
            <BtnOpenBlank :link="data.userInfo.contacts.site" />
            <BtnCopy :copyValue="data.userInfo.contacts.site" />
          </div>
          <span v-else>Not indicated</span>
        </CardRow>

        <CardTitle>Working Info</CardTitle>
        <CardRow :class="{ 'd-print-none': !data.userInfo.work.work_status }">
          <CardRowTitle>Work Status:</CardRowTitle>
          <span>{{
            data.userInfo.work.work_status
              ? data.userInfo.work.work_status
              : 'Not indicated'
          }}</span>
        </CardRow>
        <CardRow :class="{ 'd-print-none': !data.userInfo.work.work_type }">
          <CardRowTitle>Work Type:</CardRowTitle>
          <span>{{
            data.userInfo.work.work_type
              ? data.userInfo.work.work_type
              : 'Not indicated'
          }}</span>
        </CardRow>
        <CardRow :class="{ 'd-print-none': !data.userInfo.work.work_scope }">
          <CardRowTitle>Work Scope:</CardRowTitle>
          <span>{{
            data.userInfo.work.work_scope
              ? data.userInfo.work.work_scope
              : 'Not indicated'
          }}</span>
        </CardRow>
        <CardRow :class="{ 'd-print-none': !data.userInfo.work.work_position }">
          <CardRowTitle>Work Position:</CardRowTitle>
          <span>{{
            data.userInfo.work.work_position
              ? data.userInfo.work.work_position
              : 'Not indicated'
          }}</span>
        </CardRow>
        <CardRow :class="{ 'd-print-none': workLanguages.length === 0 }">
          <CardRowTitle>Working Languages:</CardRowTitle>
          <v-chip-group v-if="!workLanguages.length == 0" column>
            <v-chip v-for="item in workLanguages" :key="item" label small>
              {{ item }}
            </v-chip>
          </v-chip-group>
          <span v-else>Not indicated</span>
        </CardRow>
        <CardRow :class="{ 'd-print-none': workTechnologies.length === 0 }">
          <CardRowTitle>Working Technologies:</CardRowTitle>
          <v-chip-group v-if="!workTechnologies.length == 0" column>
            <v-chip v-for="item in workTechnologies" :key="item" label small>
              {{ item }}
            </v-chip>
          </v-chip-group>
          <span v-else>Not indicated</span>
        </CardRow>
        <div v-if="checkedList.length > 0" class="PortfolioLinks">
          <CardTitle>Portfolio links</CardTitle>
          <CardRow v-for="item in checkedList" :key="item.id">
            <CardRowTitle>{{ item.name }}:</CardRowTitle>
            <span>{{ item.cite.split('//')[1] }}</span>
          </CardRow>
        </div>
      </Card>
    </template>
    <template #c-3>
      <Card>
        <CardTitle>Your lists</CardTitle>
        <ExpansionPanel
          :userFriends="userFriends"
          :userArticles="userArticles"
          :userRepositories="userRepositories"
          :userPortfolio="checkedList"
          :userId="data.id"
        />
      </Card>
    </template>
  </PageBody>
</template>

<script>
import ExpansionPanel from './ExpansionPanel'
export default {
  name: 'UserShowingData',
  components: { ExpansionPanel },
  props: {
    data: Object,
    allUsers: Object,
    allRepositories: Object,
    allArticles: Object,
    gitApiInfo: [Object, Boolean]
  },
  computed: {
    checkedList() {
      return this.data.lists.portfolio.filter((item) => {
        return item !== 'empty'
      })
    },
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
  mounted() {
    const aboutUser = document.querySelector('.about_user')
    let formatedString
    if (this.data.userInfo.info.about.length > 0) {
      formatedString = this.data.userInfo.info.about.split('///').join('<br />')
    } else {
      formatedString = 'Not indicated'
    }
    aboutUser.innerHTML = formatedString
  }
}
</script>

<style lang="sass">
p
  display: block
  min-width: 100%
  min-height: 100%
.PortfolioLinks
  display: none
  @media print
    display: block
.v-chip--no-color
  padding: 0 5px
  margin: 0 3px 0 0 !important
</style>
