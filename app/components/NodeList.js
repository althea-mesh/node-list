import React from 'react';
import PropTypes from 'prop-types';
import { ContextMenu, ContextMenuItem, Table, TableHeader, TableRow, TableCell, Text } from '@aragon/ui';
import { translate } from 'react-i18next';
import styled from 'styled-components';
import { Address6 } from 'ip-address';
import BigInteger from 'jsbn';
import web3Utils from 'web3-utils';

const Abbr = styled.abbr`
  cursor: pointer;
  text-decoration: none;
`;

const NodeList = translate()(({ app, nodes, t }) => {
  let fundsColor = funds => (funds > 0) ? 'green' : 'red';
  // if (!nodes || !nodes.length) return <Text>{t('noNodes')}</Text>

  if (!nodes || !nodes.length) {
    nodes = [{
      nickname: web3Utils.padRight(web3Utils.toHex('Adam'), 32),
      bill: { balance: 5000000000000000 },
      ethAddress: '0x8401Eb5ff34cc943f096A32EF3d5113FEbE8D4Eb',
      ipAddress: '0x8401Eb5ff34cc943f096A32EF3d5113FEbE8D4Eb'
    }];
  }

  return (
    <div>
      <Table
        header={
          <TableRow>
            <TableHeader title={t('nickname')} />
            <TableHeader title={t('ethAddress')} />
            <TableHeader title={t('ipAddress')} />
            <TableHeader title={t('balance')} />
            <TableHeader title={t('status')} />
            <TableHeader />
          </TableRow>
        }
      >
        {nodes.map((d, i) => {
          let { nickname, bill, ethAddress, ipAddress } = d;
          let trunc = (s, n) => `${s.substr(0, n)}...${s.substr(-n)}`;
          nickname = web3Utils.toUtf8(nickname);
          let addr = Address6.fromBigInteger(new BigInteger(ipAddress.substr(2), 16));
          let ip = addr.correctForm() + '/64';
          //
          // expecbill.balance = bill.blockNumber * current

          bill.balance = web3Utils.fromWei(bill.balance.toString());
          return (
            <TableRow key={i}>
              <TableCell>
                <Text>{nickname}</Text>
              </TableCell>
              <TableCell>
                <Text color={fundsColor(bill.balance)}>&Xi;{bill.balance}</Text>
              </TableCell>
              <TableCell>
                <Text><Abbr title={ethAddress}>{trunc(ethAddress, 6)}</Abbr></Text>
              </TableCell>
              <TableCell>
                <Text><Abbr>{ip}</Abbr></Text>
              </TableCell>
              <TableCell>
                <Text>Insufficient funds</Text>
              </TableCell>
              <TableCell>
                <ContextMenu>
                  <ContextMenuItem>Some Action</ContextMenuItem>
                  <ContextMenuItem>Another Action</ContextMenuItem>
                </ContextMenu>
              </TableCell>
            </TableRow>
          );
        }
        )}
      </Table>
    </div>
  );
});

NodeList.propTypes = {
  t: PropTypes.func
};

export default NodeList;
