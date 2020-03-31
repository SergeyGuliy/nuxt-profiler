import Vue from 'vue'
import Page from '../components/pages_wrappers/Page'
import PageHeader from '../components/pages_wrappers/PageHeader'
import PageBody from '../components/pages_wrappers/PageBody'
import NavLink from '~/components/misc/NavLink'
import Table from '~/components/misc/TableItems/Table'
import Card from '~/components/misc/CardItems/Card'
import CardRow from '~/components/misc/CardItems/CardRow'
import GitInfo from '~/components/pages_components/GitInfo'
import BtnCopy from '~/components/misc/BtnCopy'
import BtnRouter from '~/components/misc/BtnRouter'
import BtnOpenBlank from '~/components/misc/BtnOpenBlank'
import CardTitle from '~/components/misc/CardItems/CardTitle'
import CardRowTitle from '~/components/misc/CardItems/CardRowTitle'
import TableLink from '~/components/misc/TableItems/TableLink'
import TableText from '~/components/misc/TableItems/TableText'
import TableIcon from '~/components/misc/TableItems/TableIcon'
import BtnCreate from '~/components/misc/BtnCreate'
import UserShowingData from '~/components/pages_components/UserShowingData'
import SideLink from '~/components/misc/SideLink'
import PortfolioList from '~/components/pages_components/PortfolioList'
import BtnPrint from '~/components/misc/BtnPrint'
import BtnShare from '~/components/misc/BtnShare'

const components = {
  Page,
  PageHeader,
  PageBody,
  NavLink,
  Table,
  Card,
  CardRow,
  GitInfo,
  BtnCopy,
  BtnRouter,
  BtnOpenBlank,
  CardTitle,
  CardRowTitle,
  TableLink,
  TableText,
  TableIcon,
  BtnCreate,
  UserShowingData,
  SideLink,
  PortfolioList,
  BtnPrint,
  BtnShare
}

Object.keys(components).forEach((key) => {
  Vue.component(key, components[key])
})
