import React from 'react';
import PropTypes from 'prop-types';
import { DropDown } from '@aragon/ui';
import { translate } from 'react-i18next';
import styled from 'styled-components';
import search from '../search.png';

const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const SearchField = styled.input.attrs({
  className: 'form-control',
  type: 'text',
  placeholder: 'Search nodes'
})`
  border-right: none;
  &::placeholder {
    color: #ccc;
  } 
`;

const NodeListControls = translate()(({ handleAction, t }) => {
  return (
    <div className="d-flex justify-content-between">
      <div className="input-group mb-3" style={{ width: 220 }}>
        <SearchField />
        <div className="input-group-append">
          <span className="input-group-text bg-white">
            <SearchIcon src={search} />
          </span>
        </div>
      </div>
      <div>
        <DropDown
          items={['Actions', 'Update Subscription Fee', 'Collect Bills', 'Generate Report']}
          active={0}
          onChange={handleAction}>
        </DropDown>
      </div>
    </div>
  );
});

NodeListControls.propTypes = {
  t: PropTypes.func
};

export default NodeListControls;
