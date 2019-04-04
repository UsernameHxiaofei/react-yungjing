import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { getDisplayName } from './utils';

const Style = styled.div`
  form.list-page_search-form {
    padding: 16px;
    background: #fafafa;
    border: 1px solid #bfbfbf;
    border-radius: 6px;
    margin-bottom: 32px;
  }
  form.list-page_search-form .ant-form-item {
    margin-bottom: 16px;
  }
  form.list-page_search-form .ant-form-item {
    display: flex;
  }
  form.list-page_search-form .ant-form-item-control-wrapper {
    flex: 1;
  }
  form.list-page_search-form .ant-form-item-label label:after {
    content: '';
  }
  form.list-page_search-form .search-form_button-row {
    display: inline-block;
    float: right;
  }
  form.list-page_search-form .search-form_button-lef {
    display: inline-block;
  }
  form.list-page_search-form .search-form_button-row button:not(:last-child) {
    margin-right: 8px;
  }
  form.list-page_search-form .search-form_button-lef button:not(:last-child) {
    margin-right: 8px;
  }
  form.list-page_search-form .collapse {
    display: inline-block;
    float: left;
  }
  form.list-page_search-form .collapse a {
    color: #4da6ff;
    font-size: 14;
  }
`;
function searchFormAdvanced(count) {
  return function wrapWithSearchForm(WrappedComponent) {
    class HOC extends Component {
      state = {
        collapseExpand: false,
        defaultCount: 3,
      };
      /** 重置搜索表单 */
      handleResetForm = () => {
        const { form } = this.props;
        form && form.resetFields();
      };
      /** 筛选按钮控制 */
      toggleCollapse = () => {
        const { collapseExpand } = this.state;
        this.setState({ collapseExpand: !collapseExpand });
      };
      render() {
        const { defaultCount } = this.state;
        const colLayout =
          typeof count === 'number' ? Math.round(24 / count) : Math.round(24 / defaultCount);
        const { collapseExpand } = this.state;
        const newProps = {
          handleSearchFormResetForm: () => this.handleResetForm(),
          toggleSearchFormCollapse: () => this.toggleCollapse(),
          // 左右间距
          gutter: 16,
          // 搜索表单样式
          searchFormClassName: 'list-page_search-form',
          // button操作行样式
          buttonColClassName: 'search-form_button-row',
          // 左侧button操作样式
          buttonColClassNameLef: 'search-form_button-lef',
          // 响应式配置
          colLayout: {
            sm: 24,
            md: 12,
            lg: colLayout,
          },
          // collapse 文案
          collapseText: !collapseExpand ? '展开更多筛选' : '收起更多选项',
          // collapse 样式
          collapseClassName: 'collapse',
          // collapse 状态（向上/向下）
          collapseIconType: collapseExpand ? 'up' : 'down',
          // 单个控件是否隐藏
          hide: !collapseExpand,
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

function createSearchForm({ searchFormHoc = searchFormAdvanced } = {}) {
  return function searchForm(count = 3) {
    return searchFormHoc(count);
  };
}

export default createSearchForm();
