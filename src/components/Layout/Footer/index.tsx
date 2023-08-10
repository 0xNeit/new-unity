/** @jsxImportSource @emotion/react */
import React from 'react';
import { useTranslation } from 'translation';

import { Icon } from 'components/Icon';

import {
  UNITY_DISCORD_URL,
  UNITY_GITHUB_URL,
  UNITY_MEDIUM_URL,
  UNITY_TWITTER_URL,
} from './constants';
import { useStyles } from './styles';

export const FooterUi: React.FC = () => {
  const styles = useStyles();
  const { t } = useTranslation();

  return (
    <div css={styles.container}>
      <div css={styles.links}>
        <a css={styles.link} href={UNITY_MEDIUM_URL} target="_blank" rel="noreferrer">
          <Icon name="medium" color={styles.theme.palette.text.primary} size="12px" />
        </a>

        <a css={styles.link} href={UNITY_DISCORD_URL} target="_blank" rel="noreferrer">
          <Icon name="discord" color={styles.theme.palette.text.primary} size="12px" />
        </a>

        <a css={styles.link} href={UNITY_TWITTER_URL} target="_blank" rel="noreferrer">
          <Icon name="twitter" color={styles.theme.palette.text.primary} size="12px" />
        </a>

        <a css={styles.link} href={UNITY_GITHUB_URL} target="_blank" rel="noreferrer">
          <Icon name="github" color={styles.theme.palette.text.primary} size="12px" />
        </a>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {

  return <FooterUi />;
};

export default Footer;
