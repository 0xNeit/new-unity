/** @jsxImportSource @emotion/react */
import React, { useCallback, useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import commaNumber from "comma-number";
import { useAuth } from "context/AuthContext";
import { TOKENS } from "constants/tokens";
import { useTokenContract, useUaiVaultContract } from "clients/contracts";
import { useStyles } from "./styles";
import uaiImg from 'assets/img/tokens/uai.svg'
import ucoreImg from 'assets/img/tokens/ucore.svg'
import { LoadingOutlined } from "@ant-design/icons";

const format = commaNumber.bindWith(',','.');
const abortController = new AbortController();

export interface UserInfoProps {
    availableUai: BigNumber;
    uaiStaked: BigNumber;
    uaiReward: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ availableUai, uaiStaked, uaiReward }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState('');
  const { accountAddress } = useAuth();
  const styles = useStyles()

  const updateBalance = useCallback(async () => {
    if (accountAddress) {
      const ucoreTokenContract = useTokenContract(TOKENS.ucore);
      let temp = await (ucoreTokenContract.balanceOf(accountAddress));
      const toNormal = temp.toNumber();
      const toNormalBigNumber = new BigNumber(toNormal);
      const newTemp = toNormalBigNumber
        .dividedBy(new BigNumber(10).pow(18))
        .dp(4, 1)
        .toString(10);
      setBalance(newTemp);
    }
  }, []);

  const handleClaimReward = async () => {
    if (isLoading || uaiReward === '0') return;
    const appContract = useUaiVaultContract();
    setIsLoading(true);
    await (appContract["claim()"]())
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (accountAddress) {
      updateBalance();
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [updateBalance]);

  return (
    <div css={styles.card}>
        <div css={styles.userInfoWrapper}>
            <div css={styles.totalItem}>
                <div css={styles.prop}>Available VAI to stake</div>
                <div css={styles.value}>
                    <img src={uaiImg} alt="uai" css={styles.image} />
                    {format(availableUai.dp(4, 1).toString(10))} UAI
                </div>
            </div>
            <div css={styles.totalItem}>
                <div css={styles.prop}>UAI Staked</div>
                <div css={styles.value}>
                    <img src={uaiImg} alt="uai" css={styles.image} />
                    {format(uaiStaked.dp(4, 1).toString(10))} UAI
                </div>
            </div>
            <div css={styles.totalItem}>
                <div css={styles.prop}>Available UAI rewards</div>
                <div css={styles.valueBetween}>
                    <p>
                        <img src={ucoreImg} alt="ucore" css={styles.image} />
                        {format(uaiReward)} UCORE
                    </p>
                    <p
                        css={styles.claimBtn}
                        className={`pointer ${
                            isLoading || uaiReward === '0' ? 'disable-btn' : ''
                        }`}
                        onClick={handleClaimReward}
                    >
                        {isLoading && <LoadingOutlined spin />} Claim
                    </p>
                </div>
            </div>
            <div css={styles.totalItem}>
                <div css={styles.prop}>Ucore Balance</div>
                <div css={styles.valueBetween}>
                    <p>
                        <img src={ucoreImg} alt="ucore"  css={styles.image}/>
                        {format(balance)} UCORE
                    </p>
                </div>
            </div> 
        </div>
    </div>
  );
};

export default UserInfo;