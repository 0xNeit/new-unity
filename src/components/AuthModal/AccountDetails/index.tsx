/** @jsxImportSource @emotion/react */
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from '../../../translation';

import useCopyToClipboard from '../../../hooks/useCopyToClipboard';

import { CoreLink } from '../../CoreLink';
import { SecondaryButton } from '../../Button';
import { EllipseAddress } from '../../EllipseAddress';
import { Icon } from '../../Icon';
import { useStyles } from './styles';

export interface AccountDetailsProps {
  onLogOut: () => void;
  accountAddress: string;
}

export const AccountDetails: React.FC<AccountDetailsProps> = ({ onLogOut, accountAddress }) => {
  const styles = useStyles();
  const { t } = useTranslation();
  const copyToClipboard = useCopyToClipboard(t('interactive.copy.walletAddress'));

  return (
    <div css={styles.container}>
      <div css={styles.infoContainer}>
        <div css={styles.infoRightColumn}>
          <div css={styles.accountAddressContainer}>
            <Typography component="span" css={styles.accountAddress}>
              <EllipseAddress ellipseBreakpoint="md" address={accountAddress} />
            </Typography>

            <button
              onClick={() => copyToClipboard(accountAddress)}
              type="button"
              css={styles.copyButton}
            >
              <Icon name="copy" css={styles.copyButtonIcon} />
            </button>
          </div>
        </div>
      </div>

      <CoreLink css={styles.coreScanLinkContainer} hash={accountAddress} />

      <SecondaryButton onClick={onLogOut} fullWidth>
        {t('authModal.accountDetails.logOutButtonLabel')}
      </SecondaryButton>
    </div>
  );
};
