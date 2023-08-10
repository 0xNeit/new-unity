import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();

  return {
    spaceSpan: css`
        display: flex;
        align-items: center;
        gap: 0px;
    `,
    theme,
  };
};
