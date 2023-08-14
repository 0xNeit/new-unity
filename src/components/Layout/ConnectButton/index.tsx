/** @jsxImportSource @emotion/react */
import React from 'react';
import { useTranslation } from '../../../translation';
import { truncateAddress } from '../../../utils';

import { useAuth } from '../../../context/AuthContext';
import { useStyles } from './styles';
import { ButtonProps, SecondaryButton } from '../../Button';
import avatar from 'assets/img/avatar.png'
import caret from 'assets/img/caretDown.png'

export interface ConnectButtonProps extends ButtonProps {
  accountAddress?: string;
}

export const ConnectButtonUi: React.FC<ConnectButtonProps> = ({
  accountAddress,
  ...otherProps
}) => {
  const { t } = useTranslation();
  const styles = useStyles();

  return (
    <SecondaryButton {...otherProps}>
      {!accountAddress 
        ? <span css={styles.buttonText}>{t('connectButton.title')}</span> 
        : <div css={styles.spaceSpan}>
            <img src={avatar} />
            {truncateAddress(accountAddress)}
            <img src={caret} />
          </div>
      }
    </SecondaryButton>
  );
};

export const ConnectButton: React.FC<ButtonProps> = props => {
  const { accountAddress, openAuthModal } = useAuth();
  return (
    <ConnectButtonUi
      accountAddress={accountAddress}
      onClick={openAuthModal}
      variant={accountAddress ? 'secondary' : 'primary'}
      {...props}
    />
  );
};

export default ConnectButton;
