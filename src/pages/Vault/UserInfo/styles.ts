import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();

  return {
    userInfoWrapper: css`
        width: 100%;
        height: 520px;
        border-radius: 25px;
        background-color: ${theme.palette.background.paper};
        display: flex;
        flex-direction: column;
        padding: 20px 40px;
    
        ${theme.breakpoints.down('lg')} {
            padding: 20px;
            height: 100%;
        }
    `,
    totalItem: css`
        margin: 20px 0;

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
        display: flex;
        align-items: center;
    `,
    valueBetween: css`
        font-weight: 600;
        font-size: 24px;
        color: ${theme.palette.text.secondary};
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    `,
    image: css`
        width: 24px;
        margin-right: 10px;
    `,
    claimBtn: css`
        font-size: 18px;
        font-weight: bold;
        color: ${theme.palette.button.main};
        margin-left: 10px;
        cursor: pointer;
    `,
    disableBtn: css`
        color: ${theme.palette.text.secondary};
        cursor: pointer;
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
