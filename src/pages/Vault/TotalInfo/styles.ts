import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();

  return {
    totalInfoWrapper: css`
        width: 100%;
        height: 100%;
        border-radius: 25px;
        background-color: ${theme.palette.background.paper};
        display: flex;
        justify-content: space-between;
        padding: 20px 40px;
    
        ${theme.breakpoints.down('lg')} {
            padding: 20px;
            flex-direction: column;
        }
    `,
    totalItem: css`
        ${theme.breakpoints.down('lg')} {
            margin: 10px;
        }
    `,
    prop: css`
        font-weight: 600;
        font-size: 20px;
        color: ${theme.palette.text.secondary};
    `,
    value: css`
        font-weight: 600;
        font-size: 24px;
        color: ${theme.palette.text.secondary};
        margin-top: 10px;
    `,
    card: css`
        height: 100%;
        display: flex;
        border-radius: 25px;
        margin: 10px 15px;
        padding: 0px;
        justify-content: center;
    `
  };
};
