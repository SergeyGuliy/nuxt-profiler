import Vue from 'vue'
import Page from '../components/global_components/Page'
import PageHeader from '../components/global_components/PageHeader'
import PageBody from '../components/global_components/PageBody'
import Table from '~/components/global_components/TableItems/Table'
import Card from '~/components/global_components/CardItems/Card'
import CardRow from '~/components/global_components/CardItems/CardRow'
import CardTitle from '~/components/global_components/CardItems/CardTitle'
import CardRowTitle from '~/components/global_components/CardItems/CardRowTitle'
import TableLink from '~/components/global_components/TableItems/TableLink'
import TableText from '~/components/global_components/TableItems/TableText'
import TableIcon from '~/components/global_components/TableItems/TableIcon'
const components = {
  // This components is part of every page.
  Page,
  PageHeader,
  PageBody,
  // This components is used in lists of friends, articles, repositories.
  Table,
  TableLink,
  TableText,
  TableIcon,
  // This components are used in pages showing: users, articles, repositories
  Card,
  CardRow,
  CardTitle,
  CardRowTitle
}

Object.keys(components).forEach((key) => {
  Vue.component(key, components[key])
})
