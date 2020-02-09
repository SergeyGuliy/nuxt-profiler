import Vue from 'vue'
import BodyCard from '../components/miscs/BodyCard'
import BodyCardHeader from '../components/miscs/BodyCardHeader'
import BodyCardMain1 from '../components/miscs/BodyCardMain1'
import BodyCardMain2 from '../components/miscs/BodyCardMain2'
import BodyCardMain3 from '../components/miscs/BodyCardMain3'
import NavLink from '~/components/miscs/NavLink'
import Table from '~/components/miscs/Table'
const components = {
  BodyCard,
  BodyCardHeader,
  BodyCardMain1,
  BodyCardMain2,
  BodyCardMain3,
  NavLink,
  Table
}

Object.keys(components).forEach((key) => {
  Vue.component(key, components[key])
})
