<template>
  <Page id="ShowArticle">
    <template #head>
      <PageHeader>
        <template #title>
          {{ data.name }}
          <v-chip small class="title-chip">
            {{ data.isPublic ? 'Public' : 'Private' }}
          </v-chip>
        </template>
        <template #actions>
          <v-btn
            v-if="$store.getters.loggedIn"
            v-tooltip.bottom-start="'Edit article.'"
            color="orange"
            class="headerButton"
            outlined
            :disabled="!$store.getters.id === data.creatorId"
            @click="$router.push(`/articles/${$route.params.id}/edit`)"
          >
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>
          <BtnPrint />
          <BtnShare :link="`articles/${$route.params.id}`" />
          <div v-if="data.isPublic && $store.getters.loggedIn">
            <v-btn
              v-if="
                !$store.getters['articles/articles'].includes($route.params.id)
              "
              v-tooltip.bottom-start="'Add to my articles.'"
              color="green"
              class="headerButton btn_add"
              outlined
              @click="addTomMyList($route.params.id)"
            >
              <v-icon>mdi-book-plus</v-icon>
            </v-btn>
            <v-btn
              v-else
              v-tooltip.bottom-start="'Remove from my articles.'"
              color="red"
              class="headerButton btn_rm"
              outlined
              @click="deleteFromMyList($route.params.id)"
            >
              <v-icon>mdi-book-minus</v-icon>
            </v-btn>
          </div>
        </template>
      </PageHeader>
    </template>
    <template #body>
      <PageBody col="2">
        <template #c-1>
          <Card>
            <CardRow v-if="data.language">
              <CardRowTitle>Language:</CardRowTitle>
              <span>{{ data.language }}</span>
            </CardRow>
            <CardRow v-if="data.technology">
              <CardRowTitle>Technology:</CardRowTitle>
              <span>{{ data.technology }}</span>
            </CardRow>
            <CardRow>
              <CardRowTitle>Description:</CardRowTitle>
            </CardRow>
            <CardRow>
              <p v-if="data.about">{{ data.about }}</p>
              <p v-else>Description is empty.</p>
            </CardRow>
          </Card>
        </template>
        <template #c-2>
          <Card>
            <CardRow>
              <CardRowTitle>Creator:</CardRowTitle>
              <BtnRouter
                :link="`/users/${data.creatorId}`"
                :text="data.creatorName"
                icon="mdi-face-profile"
              />
            </CardRow>
            <CardRow>
              <CardRowTitle>Link to article:</CardRowTitle>
              <div>
                <BtnOpenBlank :link="data.cite" />
                <BtnCopy :copy-value="data.cite" />
              </div>
            </CardRow>
          </Card>
        </template>
      </PageBody>
    </template>
  </Page>
</template>

<script>
import BtnShare from '../../../components/buttons_components/BtnShare'
import BtnPrint from '../../../components/buttons_components/BtnPrint'
import BtnRouter from '../../../components/buttons_components/BtnRouter'
import BtnCopy from '../../../components/buttons_components/BtnCopy'
import BtnOpenBlank from '../../../components/buttons_components/BtnOpenBlank'

import { controlArticles } from '../../../mixins/controlArticles'
import { fetchArticleByID } from '~/functions/articles'

/**
 * ---(articles/_id/index.vue)--- Basic view of article. If user logged in, he can add or remove article to his list
 * @module pages/articles/_id/index
 *
 * @vue-event {Object(app, store, error)} asyncData - Return ['fetchArticleByID']{@link external:functions_articles}
 * @vue-event {id(string)} deleteFromMyList   - delete from my list. From mixin: [controlArticles.js]{@link external:mixins_controlArticles}
 * @vue-event {id(string)} addTomMyList       - add to my list. From mixin: [controlArticles.js]{@link external:mixins_controlArticles}
 */
export default {
  name: 'Id',
  transition: 'bounce',
  components: { BtnCopy, BtnRouter, BtnOpenBlank, BtnPrint, BtnShare },
  mixins: [controlArticles],
  async asyncData({ route, error }) {
    try {
      return {
        data: await fetchArticleByID(route.params.id)
      }
    } catch (e) {
      error({ message: 'Article not found' })
    }
  },
  data() {
    return {
      // ---------------------------Created for testing--------------------------------------------
      data: {
        name: '',
        creatorId: '',
        creatorName: '',
        language: '',
        technology: '',
        isPublic: true,
        cite: '',
        about: ''
      }
      // ---------------------------Created for testing--------------------------------------------
    }
  },
  head: {
    title: `Profiler - Article Information`
  }
}
</script>
