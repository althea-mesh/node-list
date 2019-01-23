import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import styled from 'styled-components';

const Title = styled.h4`
  color: gray;
  text-transform: lowercase;
  font-variant: small-caps;
`

const Value = styled.h1`
  font-size: 24px;
  color: ${props => props.color ? props.color : 'black'};
`

const Aside = styled.span`
 color: #aaa;
 font-weight: light;
`

const NodeStats = translate()(({ app, nodes, t }) => {
  let fundsColor = funds => (funds > 0) ? 'green' : 'red';
  // if (!nodes || !nodes.length) return <Text>{t('noNodes')}</Text>

  return (
    <div className="w-100 d-flex justify-content-between bg-white border my-4 py-3 px-5 text-center">
      <div>
        <Title>Past Due</Title>
        <Value color="red">3.012 <small>ETH</small></Value>
        <Aside>5 nodes</Aside>
      </div>
      <div>
        <Title>Bills to Collect</Title>
        <Value>10.224 <small>ETH</small></Value>
      </div>
      <div>
        <Title>YTD Revenue</Title>
        <Value>70.780 <small>ETH</small></Value>
      </div>
      <div>
        <Title>Subscription Fee</Title>
        <Value>0.2 <small>ETH</small></Value>
        <Aside>per month</Aside>
      </div>
    </div>
  );
});

NodeStats.propTypes = {
  t: PropTypes.func
};

export default NodeStats;
