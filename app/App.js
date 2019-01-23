import React from 'react';
import PropTypes from 'prop-types';
import { AragonApp, Button, Text } from '@aragon/ui';
import styled from 'styled-components';
import { Grid } from 'react-flexbox-grid';
import { translate } from 'react-i18next';

import NewNode from './components/NewNode';
import GenerateReport from './components/GenerateReport';
import SubscriptionFee from './components/SubscriptionFee';

import Nav from './components/Nav';

const AppContainer = styled(AragonApp)`
  display: flex;
  align-content: flex-start;
  flex-direction: column;
`;

class App extends React.Component {
  state = {
    newNode: false,
    subscriptionFee: false,
    generateReport: false,
    page: null
  }

  handleAction = i => {
    switch (i) {
      case 1:
        this.setState({ subscriptionFee: true });
        break;
      case 3:
        this.setState({ generateReport: true });
        break;
    }
  };

  render () {
    const Page = this.state.page;
    const { app, nodes, appAddress, daoAddress } = this.props;
    const { newNode, generateReport, subscriptionFee } = this.state;

    return (
      <AppContainer publicUrl={window.location.href}>
        <Grid fluid>
          <NewNode opened={newNode} daoAddress={daoAddress} nodes={nodes} handleClose={() => this.setState({ newNode: false }) } />
          <GenerateReport opened={generateReport} handleClose={() => this.setState({ generateReport: false }) } />
          <SubscriptionFee opened={subscriptionFee} handleClose={() => this.setState({ subscriptionFee: false }) } />

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
             handleAction={this.handleAction}
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
