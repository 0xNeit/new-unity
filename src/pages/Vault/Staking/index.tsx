/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import commaNumber from "comma-number";
import NumberFormat from "react-number-format"
import { useTokenContract, useUaiVaultContract } from "clients/contracts";
import { TOKENS } from "constants/tokens";
import { getContractAddress } from "utils";
import { useAuth } from "context/AuthContext";
import { useStyles } from "./styles";
import { Button } from "components/Button";
import { LoadingOutlined } from "@ant-design/icons";

export interface StakingProps {
    isEnabled: boolean;
    availableUai: BigNumber;
    uaiStaked: BigNumber;
    updateTotalInfo: any;
};

const format = commaNumber.bindWith(',', '.');

const Staking: React.FC<StakingProps> = ({
    isEnabled,
    availableUai,
    uaiStaked,
    updateTotalInfo
}) => {
    const [isStakeLoading, setIsStakeLoading] = useState(false);
    const [isWithdrawLoading, setIsWithdrawLoading] = useState(false);
    const [stakeAmount, setStakeAmount] = useState(new BigNumber(0));
    const [withdrawAmount, setWithdrawAmount] = useState(new BigNumber(0));
    const { accountAddress } = useAuth();
    const styles = useStyles();

    /**
   * Stake UAI
   */
  const handleStakeUAI = () => {
    const appContract = useUaiVaultContract();
    setIsStakeLoading(true);
        appContract.deposit(
            stakeAmount
            .times(1e18)
            .integerValue()
            .toString(10)
        )
      .then(() => {
        updateTotalInfo();
        setStakeAmount(new BigNumber(0));
        setIsStakeLoading(false);
      })
      .catch(() => {
        setIsStakeLoading(false);
      });
  };

  /**
   * Withdraw UAI
   */
  const handleWithdrawUAI = () => {
    const appContract = useUaiVaultContract();
    setIsWithdrawLoading(true);
    appContract.withdraw(
        withdrawAmount
            .times(1e18)
            .integerValue()
            .toString(10)
    )
      .then(() => {
        updateTotalInfo();
        setWithdrawAmount(new BigNumber(0));
        setIsWithdrawLoading(false);
      })
      .catch(() => {
        setIsWithdrawLoading(false);
      });
  };

  const onApprove = async () => {
    setIsStakeLoading(true);
    const uaiContract = useTokenContract(TOKENS.uai);
    const uaiVaultAddress = getContractAddress("uaiVault");
        uaiContract.approve(
            uaiVaultAddress,
            new BigNumber(2)
            .pow(256)
            .minus(1)
            .toString(10)
        )
      .then(() => {
        updateTotalInfo();
        setIsStakeLoading(false);
      })
      .catch(() => {
        setIsStakeLoading(false);
    });
  };

  return (
    <div css={styles.card}>
      <div css={styles.stakingInfoWrapper}>
        <div css={styles.stakeSection}>
          <div css={styles.stakeInfo}>
            Available UAI to stake: {format(availableUai.dp(4, 1).toString(10))}{' '}
            UAI
          </div>
          {!isEnabled ? (
            <p css={styles.stakeWarning}>
              To stake UAI, you need to approve it first.
            </p>
          ) : (
            <div css={styles.stakeInput}>
              <NumberFormat
                css={styles.input}
                autoFocus
                value={stakeAmount.isZero() ? '' : stakeAmount.toString(10)}
                onValueChange={({ value }) => {
                  setStakeAmount(new BigNumber(value));
                }}
                isAllowed={({ value }) => {
                  return new BigNumber(value || 0).lte(availableUai);
                }}
                thousandSeparator
                allowNegative={false}
                placeholder="0"
              />
              <span onClick={() => setStakeAmount(availableUai)}>MAX</span>
            </div>
          )}
          {!isEnabled ? (
            <Button
              css={styles.button}
              disabled={isStakeLoading}
              onClick={() => {
                onApprove();
              }}
            >
              {isStakeLoading && <LoadingOutlined spin />} Enable
            </Button>
          ) : (
            <Button
              css={styles.button}
              disabled={
                isStakeLoading ||
                stakeAmount.isZero() ||
                stakeAmount.isNaN() ||
                stakeAmount.isGreaterThan(availableUai)
              }
              onClick={handleStakeUAI}
            >
              {isStakeLoading && <LoadingOutlined spin />} Stake
            </Button>
          )}
        </div>
        <div css={styles.stakeSection}>
          <div css={styles.stakeInfo}>
            UAI staked: {format(uaiStaked.dp(4, 1).toString(10))} VAI
          </div>
          <div css={styles.stakeInput}>
            <NumberFormat
              css={styles.input}
              autoFocus
              value={withdrawAmount.isZero() ? '' : withdrawAmount.toString(10)}
              onValueChange={({ value }) => {
                setWithdrawAmount(new BigNumber(value));
              }}
              isAllowed={({ value }) => {
                return new BigNumber(value || 0).lte(uaiStaked);
              }}
              thousandSeparator
              allowNegative={false}
              placeholder="0"
            />
            <span onClick={() => setWithdrawAmount(uaiStaked)}>MAX</span>
          </div>
          <Button
            css={styles.button}
            onClick={() => handleWithdrawUAI()}
            disabled={
              isWithdrawLoading ||
              withdrawAmount.isZero() ||
              withdrawAmount.isNaN() ||
              withdrawAmount.isGreaterThan(uaiStaked)
            }
          >
            {isWithdrawLoading && <LoadingOutlined spin />} Withdraw
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Staking;