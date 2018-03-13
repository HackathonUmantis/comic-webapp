import * as React from 'react';
import {Layout, Menu, Icon} from 'antd';
import {Route, Switch} from 'react-router';
import {SeriesList, ComicView, ComicsList} from 'app/containers';

const {Header, Sider, Content} = Layout;

import './style.scss';

export namespace AppLayout {
  export interface Props {
    collapsed: boolean;
  }
}

export class AppLayout extends React.Component<AppLayout.Props> {

  constructor(props: AppLayout.Props, context?: any) {
    super(props, context);
  }

  toggle = () => {
    this.setState({
      collapsed: !this.props.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.props.collapsed}
        >
          <div className="logo"/>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user"/>
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera"/>
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload"/>
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{background: '#fff', padding: 0}}>
            <Icon
              className="trigger"
              type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>
            <Switch>
              <Route exact path="/" component={SeriesList}/>
              <Route exact path="/:slug" component={ComicsList}/>
              <Route exact path="/**/:page" component={ComicView}/>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
