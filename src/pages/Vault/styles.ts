import { css } from '@emotion/react';
import { useTheme } from '@mui/material';
import styled from 'styled-components'

function getWidthString(span: any) {
    if (!span) return '';
  
    const width = (span / 12) * 100;
    return `width: ${width}%;`;
}

export const useStyles = () => {
  const theme = useTheme();

  return {
    marketWrapper: css`
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    `,
    vaultWrapper: css`
        padding-top: 30px;
        height: 100%;
        position: relative;
        width: 100%;
        max-width: 1200px;
        // display: flex;
    `,
    spinnerWrapper: css`
        height: 80vh;
        width: 100%;
    
        ${theme.breakpoints.only('xxl')} {
            height: 70vh;
        }
    `,
    loadingSpinner: css`
        width: 100%;
        height: 100%;

        color: ${theme.palette.button.main};
    `
    };
};

export const Row = styled.div`
  width: 100%;
  &::after {
    content: '';
    clear: both;
    display: table;
  }
`;

interface Props {
    xs: string;
    sm: string;
    md: string;
    lg: string;
}

export const Column = styled.div<Props>`
  float: left;
  ${({ xs }) => (xs ? getWidthString(xs) : 'width: 100%')};

  @media only screen and (min-width: 768px) {
    ${({ sm }) => sm && getWidthString(sm)};
  }

  @media only screen and (min-width: 992px) {
    ${({ md }) => md && getWidthString(md)};
  }

  @media only screen and (min-width: 1200px) {
    ${({ lg }) => lg && getWidthString(lg)};
  }
`;
