import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();

  return {
    tabletSearchTextField: css`
      width: 100%;
      // margin-bottom: ${theme.spacing(6)};
    `,
    desktopSearchTextField: css`
      min-width: ${theme.spacing(75)};
      width: ${theme.spacing(203)};
    `,
    spaceSpan: css`
        display: flex;
        align-items: center;
        gap: 0px;
    `,
    theme,
  };
};
