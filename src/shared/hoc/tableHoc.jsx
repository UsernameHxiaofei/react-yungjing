import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { getDisplayName } from './utils';

const Style = styled.div`
  .list-page_table {
  }
  .list-page_table .ant-table a {
    color: #007fff;
  }
  .list-page_table .ant-table td {
    white-space: nowrap;
  }
  .list-page_table .ant-table-pagination.ant-pagination {
    text-align: center;
    float: none;
  }
  .list-page_table-header {
    margin-bottom: 17px;
    color: #666666;
    font-size: 14px;
  }
`;
function tableAdvanced() {
  return function wrapWithTable(WrappedComponent) {
    class HOC extends Component {
      render() {
        const newProps = {
          tableClassName: 'list-page_table',
          tableHeaderClassName: 'list-page_table-header',
        };
        return (
          <Fragment>
            <Style>
              <WrappedComponent {...this.props} {...newProps} />
            </Style>
          </Fragment>
        );
      }
    }
    HOC.displayName = `HOC(${getDisplayName(WrappedComponent)})`;
    return HOC;
  };
}
function createTable({ tableHoc = tableAdvanced } = {}) {
  return function table() {
    return tableHoc();
  };
}
export default createTable();
