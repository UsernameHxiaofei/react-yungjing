import React, {Component} from 'react'
import styled from 'styled-components'
import SearchForm from './components/SearchForm'
import Tab from './components/Tab'
import Info from './model/Info'
import Memary from './model/Memary'

const Root = styled.div`
  padding: 20px
`
class CloudMirrorPool extends Component{
  render () {
    return (
      <Root>
        <SearchForm />
        <Tab />
        <Info />
        <Memary />
      </Root>
    )
  }
}

export default CloudMirrorPool
