import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();

  return {
    stakingInfoWrapper: css`
        width: 100%;
        height: 520px;
        border-radius: 25px;
        background-color: ${theme.palette.background.paper};
        padding: 20px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
    `,
    stakeSection: css`
        margin: 15px 0;
        padding: 30px 0;
        border-radius: 20px;
        background-color: ${theme.palette.background.paper};
        height: 200px;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
    `,
    stakeInfo: css`
        font-weight: 500;
        font-size: 18px;
        color: #FFFFFF;
    `,
    
    stakeWarning: css`
        font-size: 15px;
        color: ${theme.palette.text.secondary};
    `,
    stakeInput: css`
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
    `,
    input: css`
        width: 65%;
        margin-left: 17.5%;
        border: none;
        height: 100%;
        font-size: 40px;
        color: var(--color-yellow);
        text-align: center;
        background: transparent;
        &:focus {
        outline: none;
        }
    `,
    span: css`
        position: absolute;
        right: 25px;
        width: 12%;
        text-align: center;
        font-weight: 600;
        font-size: 14px;
        color: #bdbdbd;
        cursor: pointer;
    `,
    button: css`
        width: 248px;
        height: 41px;
        border-radius: 5px;
        background-color: ${theme.palette.button.main};
        color: #FFFFFF;
    `,
    MuiButtonlabel: css`
        font-size: 16px;
        font-weight: 500;
        color: ${theme.palette.text.primary};
        text-transform: capitalize;
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
