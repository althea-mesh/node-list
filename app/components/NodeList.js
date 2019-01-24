import React from 'react';
import PropTypes from 'prop-types';
import { ContextMenu, ContextMenuItem, IconCheck, IconCross, IconError, IconRemove, IconTime, IconSettings, Text } from '@aragon/ui';
import styled from 'styled-components';
import { translate } from 'react-i18next';
import { Address6 } from 'ip-address';
import BigInteger from 'jsbn';
import web3Utils from 'web3-utils';
import NodeStats from './NodeStats';
import NodeListControls from './NodeListControls';
import Blockies from 'react-blockies';

const Table = styled.table.attrs({
  className: 'table-responsive-sm'
})`
  background: white;
  width: 100%;

  td, th {
    padding: 10px;
  } 

  tr {
    border-bottom: 1px solid #dadada;
  } 

  tbody {
    border: 1px solid #dadada;
  } 

  th {
    font-variant: small-caps;
    text-transform: lowercase;
    background: #F7FBFD;
    color: #aaa;
  } 
`;

const td = styled.td`
  word-break: break-word;
`;

const Blue = styled.div`
  background: #DAEAEF;
  height: 25px;
`;

const NodeList = translate()(({ app, daoAddress, handleAction, nodes, t }) => {
  let fundsColor = funds => (funds > 0) ? 'black' : 'red';
  let trunc = (s, n) => `${s.substr(0, n)}...${s.substr(-n)}`;
  // if (!nodes || !nodes.length) return <Text>{t('noNodes')}</Text>

  if (!nodes || !nodes.length) {
    nodes = [
      {
        nickname: web3Utils.padRight(web3Utils.toHex('Sebas'), 32),
        bill: { balance: -10200000000000000 },
        ethAddress: '0x09C4D1F918D3C02B390765C7EB9849842c8F7997',
        ipAddress: '0x2001deadbeefbf0c0000000000000000'
      },
      {
        nickname: web3Utils.padRight(web3Utils.toHex('Bob\'s Internet Shop'), 32),
        bill: { balance: 231000000000000000 },
        ethAddress: '0x229fB539753b1017835501Ccf2f5d2B4dB2367c4',
        ipAddress: '0x2001deadbeefbf0c0000000000000000'
      },
      {
        nickname: web3Utils.padRight(web3Utils.toHex('Deborah'), 32),
        bill: { balance: 40000000000000000000 },
        ethAddress: '0x031F80b5B57187C933BDCF7adA1e18c31D0F3728',
        ipAddress: '0x2001deadbeefbf0c0000000000000000'
      },
      {
        nickname: web3Utils.padRight(web3Utils.toHex('Neil'), 32),
        bill: { balance: 4000000000000000000 },
        ethAddress: '0x8401Eb5ff34cc943f096A32EF3d5113FEbE8D4Eb',
        ipAddress: '0x2001deadbeefbf0c0000000000000000'
      }

    ];
  }

  return (
    <div>
      <NodeStats />
      <NodeListControls handleAction={handleAction} />

      <Table>
        <thead>
          <tr>
            <th>{t('nickname')}</th>
            <th>{t('ethAddress')}</th>
            <th>{t('ipAddress')}</th>
            <th className="text-right">{t('balance')}</th>
            <th>{t('status')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {nodes.map((d, i) => {
            let { nickname, bill, ethAddress, ipAddress } = d;
            nickname = web3Utils.toUtf8(nickname);
            let addr = Address6.fromBigInteger(new BigInteger(ipAddress.substr(2), 16));
            let ip = addr.correctForm() + '/64';
            //
            // expecbill.balance = bill.blockNumber * current

            bill.balance = web3Utils.fromWei(bill.balance.toString());
            return (
              <tr key={i}>
                <td>
                  <Text>{nickname}</Text>
                </td>
                <td>
                  <Blue>
                    <Blockies
                      seed={ethAddress}
                      size={8}
                      scale={3}
                    />
                    <Text style={{ display: 'block', float: 'right', marginLeft: 10, paddingTop: 5, paddingRight: 10 }}>{trunc(ethAddress, 6)}</Text>
                  </Blue>
                </td>
                <td>
                  <Text>{ip}</Text>
                </td>
                <td className="text-right">
                  <Text color={fundsColor(bill.balance)}>{bill.balance} ETH</Text>
                </td>
                <td>
                  <Text>
                    {bill.balance > 1 ? <IconCheck /> : (bill.balance > 0 ? <IconError /> : <IconCross />)}
                  &nbsp;
                    {bill.balance > 1 ? 'On-track' : (bill.balance > 0 ? 'Low balance' : 'Insufficient funds')}
                  </Text>

                </td>
                <td>
                  <ContextMenu>
                    <ContextMenuItem><IconRemove /> Remove Node</ContextMenuItem>
                    <ContextMenuItem><IconTime />&nbsp; Send Billing Reminder</ContextMenuItem>
                    <ContextMenuItem><IconSettings /> View Node Details</ContextMenuItem>
                  </ContextMenu>
                </td>
              </tr>
            );
          }
          )}
        </tbody>
      </Table>
    </div>
  );
});

NodeList.propTypes = {
  t: PropTypes.func
};

export default NodeList;
