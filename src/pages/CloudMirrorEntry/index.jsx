import React, {Component} from 'react'
import styled from 'styled-components';
import SearchForm from './component/searchForm'
import Tab from './component/Tab'
import NewSet from './model/newSet.jsx'
import Edit from './model/Edit.jsx'

const Root = styled.div`
  padding: 20px;
  .ant-upload-list{
    display: none;
  }
  .ant-message{
    width: 850px;
    height: 600px;
    overflow:auto;
  }
`;

class CloudMirrorEntry extends Component {
  render () {
    return (
      <Root>
        <SearchForm />
        <Tab />
        <NewSet />
        <Edit />
      </Root>
    )
  }
}

export default CloudMirrorEntry
