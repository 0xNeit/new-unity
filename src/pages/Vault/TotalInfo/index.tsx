/** @jsxImportSource @emotion/react */
import React from "react";
import { useStyles } from "./styles";
// import { Card } from "@mui/material";
import BigNumber from "bignumber.js";
import commaNumber from 'comma-number';


interface TotalInfoProps {
    emission: string;
    staked: string;
    apy: string;
    pendingRewards: string;
}

const format = commaNumber.bindWith(',', '.');

const TotalInfo: React.FC<TotalInfoProps> = ({ emission, staked, apy, pendingRewards }) => {
    const styles = useStyles();
    return (
        <div css={styles.card}>
            <div css={styles.totalInfoWrapper}>
                <div css={styles.totalItem}>
                    <div css={styles.prop}>Total emission per day</div>
                    <div css={styles.value}>{format(emission)} UCORE</div>
                </div>
                <div css={styles.totalItem}>
                    <div css={styles.prop}>Total UAI Staked</div>
                    <div css={styles.value}>{format(staked)} UAI</div>
                </div>
                <div css={styles.totalItem}>
                    <div css={styles.prop}>UAI Staking APY</div>
                    <div css={styles.value}>{format(apy)}%</div>
                </div>
                <div css={styles.totalItem}>
                    <div css={styles.prop}>UAI Vault Reward Pool</div>
                    <div css={styles.value}>{format(pendingRewards)} UCORE</div>
                </div>
            </div>
        </div>
    )
}
  
export default TotalInfo