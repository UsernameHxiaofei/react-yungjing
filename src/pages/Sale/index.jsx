import React, { Component } from 'react';
import styled from 'styled-components';
import SearchForm from './components/SearchForm'
import TableList from './components/tableList'
import Sale from './components/Sale'
const Root = styled.div`
    padding: 20px;
`;
class stock extends Component {
  render() {
    return (
      <Root>
        <SearchForm/>
        <TableList/>
        <Sale/>
      </Root>
    );
  }
}

export default stock;
