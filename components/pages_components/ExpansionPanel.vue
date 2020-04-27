<template>
  <client-only>
    <v-expansion-panels id="ExpansionPanel" accordion flat hover focusable>
      <v-expansion-panel :disabled="userFriends.length === 0">
        <v-expansion-panel-header>
          <v-btn
            v-if="loggedIn && id === userId"
            height="26px"
            link
            @click.stop="$router.push(`${profile}/my_friends`)"
          >
            Open List Of My Friends
            <v-chip small label>{{ userFriends.length }}</v-chip>
          </v-btn>
          <v-btn
            v-else
            height="26px"
            link
            @click.stop="$router.push(`/users/${userId}/friends`)"
          >
            Open List Of User Friends
            <v-chip small label>{{ userFriends.length }}</v-chip>
          </v-btn>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-btn
            v-for="item in userFriends"
            :key="item.id"
            block
            small
            @click="$router.push(`/users/${item.id}`)"
            >{{ item.profile }}</v-btn
          >
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel :disabled="userArticles.length === 0">
        <v-expansion-panel-header>
          <v-btn
            v-if="loggedIn && id === userId"
            height="26px"
            link
            @click.stop="$router.push(`${profile}/my_articles`)"
          >
            Open List Of My Articles
            <v-chip small label>{{ userArticles.length }}</v-chip>
          </v-btn>
          <v-btn
            v-else
            height="26px"
            link
            @click.stop="$router.push(`/users/${userId}/articles`)"
          >
            Open List Of User Articles
            <v-chip small label>{{ userArticles.length }}</v-chip>
          </v-btn>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-btn
            v-for="item in userArticles"
            :key="item.id"
            block
            small
            @click="$router.push(`/articles/${item.id}`)"
            >{{ item.name }}</v-btn
          >
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel :disabled="userRepositories.length === 0">
        <v-expansion-panel-header>
          <v-btn
            v-if="loggedIn && id === userId"
            height="26px"
            link
            @click.stop="$router.push(`${profile}/my_repositories`)"
          >
            Open List Of My Repositories
            <v-chip small label>{{ userRepositories.length }}</v-chip>
          </v-btn>
          <v-btn
            v-else
            height="26px"
            link
            @click.stop="$router.push(`/users/${userId}/repositories`)"
          >
            Open List Of User Repositories
            <v-chip small label>{{ userRepositories.length }}</v-chip>
          </v-btn>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-btn
            v-for="item in userRepositories"
            :key="item.id"
            block
            small
            @click="$router.push(`/repositories/${item.id}`)"
            >{{ item.name }}</v-btn
          >
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel :disabled="userPortfolio.length === 0">
        <v-expansion-panel-header>
          <v-btn
            v-if="loggedIn && id === userId"
            height="26px"
            link
            @click.stop="$router.push(`${profile}/my_portfolio`)"
          >
            Open my portfolio
            <v-chip small label>{{ userPortfolio.length }}</v-chip>
          </v-btn>
          <v-btn
            v-else
            height="26px"
            link
            @click.stop="$router.push(`/users/${userId}/portfolio`)"
          >
            Open user portfolio
            <v-chip small label>{{ userPortfolio.length }}</v-chip>
          </v-btn>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-btn
            v-for="item in userPortfolio"
            :key="item.id"
            :href="item.cite"
            block
            small
            class="my-1"
            link
            target="_blank"
          >
            {{ item.name }}
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </client-only>
</template>

<script>
import { mapGetters } from 'vuex'
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
    ...mapGetters(['id', 'loggedIn', 'profile'])
  }
}
</script>
<style lang="sass">
#ExpansionPanel
  .v-expansion-panel-header
    min-height: 48px
    .v-btn--contained
      padding: 0 0 0 5px
      justify-content: space-between
      @media screen and (max-width: 510px)
        font-size: 13px
        letter-spacing: 0.8px
        font-weight: 400
  .v-chip
    max-width: 35px
    min-width: 20px
    margin-left: 5px
    justify-content: center
    padding: 0
  .v-expansion-panel-content__wrap
    padding: 0
    .v-btn
      margin: 3px 0
      padding: 0
</style>
