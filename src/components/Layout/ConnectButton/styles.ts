import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();

  return {
    spaceSpan: css`
        display: flex;
        align-items: center;
        gap: 10px;
    `,
    buttonText: css`
        color: ${theme.palette.background.paper};
    `,
    theme,
  };
};
