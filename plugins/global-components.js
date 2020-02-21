import Vue from 'vue'
import Page from '../components/pages_components/Page'
import PageHeader from '../components/pages_components/PageHeader'
import PageBody from '../components/pages_components/PageBody'
import NavLink from '~/components/misc/NavLink'
import Table from '~/components/pages_components/Table'
import Card from '~/components/pages_components/Card'
import CardContainer from '~/components/pages_components/CardContainer'
import GitInfo from '~/components/pages_components/GitInfo'
import BtnCopy from '~/components/misc/BtnCopy'
import BtnRouter from '~/components/misc/BtnRouter'
import BtnOpenBlank from '~/components/misc/BtnOpenBlank'
import Header from '~/components/misc/Header'
const components = {
  Page,
  PageHeader,
  PageBody,
  NavLink,
  Table,
  Card,
  CardContainer,
  GitInfo,
  BtnCopy,
  BtnRouter,
  BtnOpenBlank,
  Header
}

Object.keys(components).forEach((key) => {
  Vue.component(key, components[key])
})
