### Nuxt Profiler

---
### Creator
This project is a pet project, made by Sergey Guliy.
Contacts: 
* `phone`: [+380-50-280-8165](tel:+380-50-280-8165)
* `email`: [sergey.guliy.92@gmail.com](mailto:sergey.guliy.92@gmail.com)
* `skype`: [sergey.guliy.92](live:sergey.guliy.92)
* `LinkedIn`: [sergey-guliy](https://www.linkedin.com/in/sergey-guliy-082203183/)
* `GitHub`: [github.com/SergeyGuliy](https://github.com/SergeyGuliy)
* `GitLab`: [gitlab.com/SergeyGuliy](https://gitlab.com/SergeyGuliy)
---
### Project installation:

```
mkdir name
```
```
cd name
```
```
git init
```
```
git pull https://github.com/SergeyGuliy/nuxt-profiler.git
```
```
git checkout DEV_WITHOUT_LOGIN_REGISTER_MIDDLEWARE
```
```
npm run dev
```
```
sudo docker build -t sergeyguliy/profiler:v7 .
```
```
sudo docker push sergeyguliy/profiler:v7
```
```
sudo ssh root@165.22.203.186
```
```
docker run -d -p 165.22.203.186:80:3000 sergeyguliy/profiler:v7
```
---
### Structure of project
* [Store](./store.html)
    * [index.test.js](./external-store_index.html) `-This store module contain logic with: logging in, registration, fetching data, and update data.`
    * [friends.js](./external-store_friends.html) `-This store module contain logic to control logged in user list of friends`
    * [articles.js](./external-store_articles.html) `-This store module contain logic to control logged in user fist of articles`
    * [repositories.js](./external-store_repositories.html) `-This store module contain logic to control logged in user list of repositories`
    * [portfolio.js](./external-store_portfolio.html) `-This store module contain logic to control logged in user list of portfolio works`
* [Functions](./functions.html) `-Functions is reusable in many pages`
    * [language-technologies.js](./external-functions_language_technologies.html) `-This functions controls logic with fetching languages and update languages`
    * [articles.js](./external-functions_articles.html) `-This functions controls logic with fetching all, fetching by id, creating, updating articles`
    * [repositories.js](./external-functions_repositories.html) `-This functions controls logic with fetching all, fetching by id, creating, updating repositories`
    * [users.js](./external-functions_users.html) `-This functions controls logic with fetching all, fetching by id users.`
* [Mixins](./mixins.html) 
    * [controlArticles.js](./external-mixins_controlArticles.html) `-This mixin contains logic to add or remove article to my list`
    * [controlFriends.js](./external-mixins_controlFriends.html) `-This mixin contains logic to add or remove user to my list`
    * [controlRepositories.js](./external-mixins_controlRepositories.html) `-This mixin contains logic to add or remove repository to my list`
    * [filterMixin.js](./external-mixins_filterMixin.html) `-This mixin contains logic to filter articles and repositories`
    * [paginationMixin.js](./external-mixins_paginationMixin.html) `-This mixin contains logic chunk list of items, and puginate pages`
* [Pages](./pages.html)
    * [/](./module-pages_index.html) `-Home page`
    * [/articles](./module-pages_articles_index.html) `-List of all articles`
        * [/_id](./module-pages_articles__id_index.html) `-Basic view of article`
            * [/edit](./module-pages_articles__id_edit.html) `-Page for editing article`
    * [/repositories](./module-pages_repositories_index.html) `-List of all repositories`
        * [/_id](./module-pages_repositories__id_index.html) `-Basic view of repository`
            * [/edit](./module-pages_repositories__id_edit.html) `-Page for editing repository`
    * [/users](./module-pages_users_index.html) `-List of all users`
        * [/_id](./module-pages_users__id_index.html) `-Basic view of user`
            * [/articles](./module-pages_users__id_articles.html) `-Basic view of user's articles`
            * [/repositories](./module-pages_users__id_repositories.html) `-Basic view of user's repositories`
            * [/friends](./module-pages_users__id_friends.html) `-Basic view of user's friends`
            * [/portfolio](./module-pages_users__id_portfolio.html) `-Basic view of user portfolio`
    * [/_userSlug]()
        * [/my_articles](./module-pages__userSlug_my_articles_index.html) `-List of all user's articles`
            * [/create](./module-pages__userSlug_my_articles_create.html) `-Page witch can create new article`
        * [/my_portfolio](./module-pages__userSlug_my_portfolio_index.html) `-List of all user's portfolio works`
            * [/create](./module-pages__userSlug_my_portfolio_create.html) `-Page witch can create new portfolio work.`
        * [/my_repositories](./module-pages__userSlug_my_repositories_index.html) `-List of all user's repositories`
            * [/create](./module-pages__userSlug_my_repositories_create.html) `-Page witch can create new article.`
        * [/my_friends](./module-pages__userSlug_my_friends.html) `-List of logged in user friends`
        * [/edit_profile](./module-pages__userSlug_edit_profile.html) `-Page witch gives ability to edit user info`
        * [/admin_panel](./module-pages__userSlug_admin_panel.html) `-Page witch gives ability to manage languages and technologies`
