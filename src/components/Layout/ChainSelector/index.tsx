/** @jsxImportSource @emotion/react */
import React from 'react';
import config from 'config';
import { useStyles } from './styles';
import { ButtonProps, SecondaryButton } from '../../Button';
import core from 'assets/img/coredao.png'

export const ChainSelectorUi: React.FC = () => {
  const styles = useStyles();
  return (
    <SecondaryButton>
      <div css={styles.spaceSpan}>
        <img src={core} />
        {!config.isOnTestnet ? 'CORE' : 'TESTNET'}
      </div>
    </SecondaryButton>
  );
};

export const ChainSelector: React.FC<ButtonProps> = props => {
  return (
    <ChainSelectorUi
      variant={'secondary'}
      {...props}
    />
  );
};

export default ChainSelector;
