<template>
  <nuxt />
</template>

<script>
/**
 * Functions is reusable in many pages. Map:
 * - [homePage.com]{@link module:pages/index} - Home page.
 * - [homePage.com/_userSlug/my_articles]{@link module:pages/_userSlug/my_articles/index} - List of all user's articles
 * - [homePage.com/_userSlug/my_articles/create]{@link module:pages/_userSlug/my_articles/create} - Page witch can create new article
 * - [homePage.com/_userSlug/my_portfolio]{@link module:pages/_userSlug/my_portfolio/index} - List of all user's portfolio works
 * - [homePage.com/_userSlug/my_portfolio/create]{@link module:pages/_userSlug/my_portfolio/create} - Page witch can create new portfolio work.
 * - [homePage.com/_userSlug/my_repositories]{@link module:pages/_userSlug/my_repositories/index} - List of all user's repositories
 * - [homePage.com/_userSlug/my_repositories/create]{@link module:pages/_userSlug/my_repositories/create} - Page witch can create new article.
 * - [homePage.com/_userSlug/my_friends]{@link module:pages/_userSlug/my_friends} - List of logged in user friends
 * - [homePage.com/_userSlug/edit_profile]{@link module:pages/_userSlug/edit_profile} - Page witch gives ability to edit user info
 * - [homePage.com/_userSlug/admin_panel]{@link module:pages/_userSlug/admin_panel} - Page witch gives ability to manage languages and technologies
 * - [homePage.com/articles]{@link module:pages/articles/index} - List of all articles.
 * - [homePage.com/articles/_id]{@link module:pages/articles/_id/index} - Basic view of article.
 * - [homePage.com/articles/_id/edit]{@link module:pages/articles/_id/edit} - Page for editing article
 * - [homePage.com/repositories]{@link module:pages/repositories/index} - List of all repositories.
 * - [homePage.com/repositories/_id]{@link module:pages/repositories/_id/index} - Basic view of repository.
 * - [homePage.com/repositories/_id/edit]{@link module:pages/repositories/_id/edit} - Page for editing repository
 * - [homePage.com/users]{@link module:pages/users/index} - List of all users.
 * - [homePage.com/users/_id]{@link module:pages/users/_id/index} - Basic view of user.
 * - [homePage.com/users/_id/articles]{@link module:pages/users/_id/articles} - Basic view of user's articles.
 * - [homePage.com/users/_id/repositories]{@link module:pages/users/_id/repositories} - Basic view of user's repositories.
 * - [homePage.com/users/_id/friends]{@link module:pages/users/_id/friends} - Basic view of user's friends.
 * - [homePage.com/users/_id/portfolio]{@link module:pages/users/_id/portfolio} - Basic view of user portfolio.
 * @namespace pages
 */
export default {
  name: 'UserSlug',
  transition: 'bounce',
  middleware: 'isNotLoggedIn',
  validate({ store, route }) {
    return store.getters.profile === route.params.userSlug
  }
}
</script>

<style scoped></style>
