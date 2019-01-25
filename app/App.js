import React from 'react';
import PropTypes from 'prop-types';
import { AragonApp, Button, Text } from '@aragon/ui';
import styled from 'styled-components';
import { Grid } from 'react-flexbox-grid';
import { translate } from 'react-i18next';
import Althea from 'Embark/contracts/Althea';
import EmbarkJS from 'Embark/EmbarkJS';

import NewNode from './components/NewNode';
import GenerateReport from './components/GenerateReport';
import SubscriptionFee from './components/SubscriptionFee';

import Nav from './components/Nav';

const AppContainer = styled(AragonApp)`
  display: flex;
  align-content: flex-start;
  flex-direction: column;
  margin-top: 20px;
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

  getNodes = () => {
    let nodes = {};

    /*
    {
      nickname: web3Utils.padRight(web3Utils.toHex('Sebas'), 32),
      bill: { balance: -10200000000000000 },
      ethAddress: '0x09C4D1F918D3C02B390765C7EB9849842c8F7997',
      ipAddress: '0x2001deadbeefbf0c0000000000000000'
    }
    */

    EmbarkJS.onReady(async function (e) {
      if (e) {
        console.error('Error while connecting to web3', e);
        return;
      }
      let count = await Althea.methods.getCountOfSubscribers().call();
      console.log('COUNT', count)
    });

  }

  render () {
    const Page = this.state.page;
    const { app, nodes, appAddress, daoAddress } = this.props;
    const { newNode, generateReport, subscriptionFee } = this.state;

    this.getNodes();

    return (
      <AppContainer publicUrl={window.location.href}>
        <Grid fluid>
          <NewNode opened={newNode} daoAddress={daoAddress} nodes={nodes} handleClose={() => this.setState({ newNode: false }) } />
          <GenerateReport opened={generateReport} handleClose={() => this.setState({ generateReport: false }) } />
          <SubscriptionFee opened={subscriptionFee} handleClose={() => this.setState({ subscriptionFee: false }) } />

          <div style={{ background: 'white', borderBottom: '1px solid #ddd' }}>
            <Text size="xxlarge">Althea</Text>
            <Button mode="strong" style={{ float: 'right', padding: '10px 40px' }} onClick={() => { this.setState({ newNode: true }); }}>New Node</Button>
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
