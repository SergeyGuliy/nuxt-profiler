<template>
  <client-only>
    <v-expansion-panels id="ExpansionPanel" accordion flat hover focusable>
      <v-expansion-panel :disabled="userFriends.length === 0">
        <v-expansion-panel-header>
          <v-btn
            v-if="$store.getters.user && $store.getters.user.id === userId"
            @click.stop="
              $router.push(`${$store.getters.user.profile}/my_friends`)
            "
            height="26px"
            link
          >
            Open List Of My Friends
          </v-btn>
          <v-btn
            v-else
            @click.stop="$router.push(`/users/${userId}/friends`)"
            height="26px"
            link
          >
            Open List Of User Friends
          </v-btn>
          <v-chip small label>{{ userFriends.length }}</v-chip>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-btn
            v-for="item in userFriends"
            :key="item.id"
            @click="$router.push(`/users/${item.id}`)"
            block
            small
            >{{ item.profile }}</v-btn
          >
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel :disabled="userArticles.length === 0">
        <v-expansion-panel-header>
          <v-btn
            v-if="$store.getters.user && $store.getters.user.id === userId"
            @click.stop="
              $router.push(`${$store.getters.user.profile}/my_articles`)
            "
            height="26px"
            link
          >
            Open List Of My Articles
          </v-btn>
          <v-btn
            v-else
            @click.stop="$router.push(`/users/${userId}/articles`)"
            height="26px"
            link
          >
            Open List Of User Articles
          </v-btn>
          <v-chip small label>{{ userArticles.length }}</v-chip>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-btn
            v-for="item in userArticles"
            :key="item.id"
            @click="$router.push(`/articles/${item.id}`)"
            block
            small
            >{{ item.name }}</v-btn
          >
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel :disabled="userRepositories.length === 0">
        <v-expansion-panel-header>
          <v-btn
            v-if="$store.getters.user && $store.getters.user.id === userId"
            @click.stop="
              $router.push(`${$store.getters.user.profile}/my_repositories`)
            "
            height="26px"
            link
          >
            Open List Of My Repositories
          </v-btn>
          <v-btn
            v-else
            @click.stop="$router.push(`/users/${userId}/repositories`)"
            height="26px"
            link
          >
            Open List Of User Repositories
          </v-btn>
          <v-chip small label>{{ userRepositories.length }}</v-chip>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-btn
            v-for="item in userRepositories"
            :key="item.id"
            @click="$router.push(`/repositories/${item.id}`)"
            block
            small
            >{{ item.name }}</v-btn
          >
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel :disabled="checkedList.length === 0">
        <v-expansion-panel-header>
          <v-btn
            v-if="$store.getters.user && $store.getters.user.id === userId"
            @click.stop="
              $router.push(`${$store.getters.user.profile}/my_portfolio`)
            "
            height="26px"
            link
          >
            Open my portfolio
          </v-btn>
          <v-btn
            v-else
            @click.stop="$router.push(`/users/${userId}/portfolio`)"
            height="26px"
            link
          >
            Open user portfolio
          </v-btn>
          <v-chip small label>{{ checkedList.length }}</v-chip>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-btn
            v-for="item in checkedList"
            :key="item.id"
            block
            small
            class="my-1"
          >
            {{ item.name }}
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </client-only>
</template>

<script>
export default {
  name: 'ExpansionPanel',
  props: {
    userFriends: Array,
    userArticles: Array,
    userRepositories: Array,
    userPortfolio: Array,
    userId: String
  },
  computed: {
    checkedList() {
      return this.userPortfolio.filter((item) => {
        return item !== 'empty'
      })
    }
  }
}
</script>
<style lang="sass">
#ExpansionPanel
  .v-expansion-panel-header--active
    min-height: 48px
  .v-chip
    max-width: 35px
    margin-left: 5px
    justify-content: center
    padding: 0
  .v-expansion-panel-content__wrap
    padding: 0
    .v-btn
      margin: 3px 0
      padding: 0
</style>
