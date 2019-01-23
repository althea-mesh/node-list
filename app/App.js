import React from 'react';
import PropTypes from 'prop-types';
import { AragonApp, Button, Text } from '@aragon/ui';
import styled from 'styled-components';
import { Grid } from 'react-flexbox-grid';
import { translate } from 'react-i18next';
import NewNode from './components/NewNode';

import Nav from './components/Nav';

const AppContainer = styled(AragonApp)`
  display: flex;
  align-content: flex-start;
  flex-direction: column;
`;

class App extends React.Component {
  state = {
    newNode: false,
    page: null
  }

  handleClose = () => {
    console.log('hiey');
    this.setState({ newNode: false });
  }

  render () {
    const Page = this.state.page;
    const { app, nodes, appAddress, daoAddress } = this.props;
    const { newNode } = this.state;

    return (
      <AppContainer publicUrl={window.location.href}>
        <Grid fluid>
          <NewNode opened={newNode} daoAddress={daoAddress} nodes={nodes} handleClose={this.handleClose} />

          <div style={{ background: 'white', borderBottom: '1px solid #ddd' }}>
            <Text size="xxlarge">Althea</Text>
            <Button mode="strong" style={{ float: 'right' }} onClick={() => { this.setState({ newNode: true }); }}>New Node</Button>
            <Nav setPage={page => this.setState({ page })} />
          </div>
          {this.state.page &&
           <Page
             app={app}
             nodes={nodes}
             appAddress={appAddress}
             daoAddress={daoAddress}
             newNode={newNode}
           />
          }
        </Grid>
      </AppContainer>
    );
  }
}

App.propTypes = {
  app: PropTypes.object,
  nodes: PropTypes.array,
  appAddress: PropTypes.string,
  daoAddress: PropTypes.string,
  t: PropTypes.func
};

export default translate()(App);
