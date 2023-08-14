/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import { useStyles, Row, Column } from "./styles";
import { getContractAddress } from "utils";
import { useComptrollerContract, useUaiVaultContract } from "clients/contracts";
import { useTokenContract } from "clients/contracts";
import { TOKENS } from "constants/tokens";
import { withRouter } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import TotalInfo from "./TotalInfo";
import { calculateApy } from "utils";
import { useAuth } from "context/AuthContext";
import UserInfo from "./UserInfo";
import Staking from "./Staking";

const Vault: React.FC = () => {
    const styles = useStyles();
    const [emission, setEmission] = useState('0');
    const [pendingRewards, setPendingRewards] = useState('0');
    const [availableUai, setAvailableUai] = useState(new BigNumber(0));
    const [uaiStaked, setUaiStaked] = useState(new BigNumber(0));
    const [uaiReward, setUaiReward] = useState('0');
    const [isEnabled, setIsEnabled] = useState(false);
    const [apy, setApy] = useState(new BigNumber(0));
    const comptrollerAddress = getContractAddress("comptroller");
    const uaiVaultAddress = getContractAddress("uaiVault");
    const { accountAddress } = useAuth();

    const updateTotalInfo = async () => {
        const compContract = useComptrollerContract(comptrollerAddress);
        const ucoreTokenContract = useTokenContract(TOKENS.ucore)
        const uaiTokenContract = useTokenContract(TOKENS.uai);
        const vaultContract = useUaiVaultContract();
    
        const [
          ucoreUAIVaultRate,
          pendingRewards,
          availableAmount,
          { 0: staked },
          uaiReward,
          allowBalance
        ] = await Promise.all([
          compContract.ucoreUAIVaultRate(),
          ucoreTokenContract.balanceOf(uaiVaultAddress),
          uaiTokenContract.balanceOf(accountAddress),
          vaultContract.userInfo(accountAddress),
          vaultContract.pendingUCORE(accountAddress),
          uaiTokenContract.allowance(accountAddress, uaiVaultAddress),
        ]);

        const toNormalNumber = ucoreUAIVaultRate.toNumber();
        const toBigNumber = new BigNumber(toNormalNumber)

        const apyCalc = calculateApy({
            dailyRate: toBigNumber 
        })

        setApy(apyCalc);
    
        // total info
        setEmission(
            ucoreUAIVaultRate
            .div(1e18)
            .mul(20 * 60 * 24)
            // .dp(2, 1)
            .toString()
        );
        setPendingRewards(
            pendingRewards
            .div(1e18)
            // .dp(4, 1)
            .toString()
        );
        setAvailableUai(new BigNumber(availableAmount.div(1e18).toNumber()));
        setUaiStaked(new BigNumber(staked.div(1e18).toNumber()));
        setUaiReward(
            uaiReward
            .div(1e18)
            // .dp(4, 1)
            .toString()
        );
        setIsEnabled(allowBalance.div(1e18).gt(availableAmount));
    };
    
    useEffect(() => {
        if (accountAddress) {
            updateTotalInfo();
        }
    }, []);

    return (
        <div css={styles.marketWrapper}>
            <div css={styles.vaultWrapper}>
                {!accountAddress ? (
                    <div css={styles.spinnerWrapper}>
                        <LoadingOutlined css={styles.loadingSpinner} className="flex align-center just-center" />
                    </div>
                ) : (
                    <Row>
                        <div>
                            <TotalInfo
                                emission={emission}
                                staked={uaiStaked.toString()}
                                apy={apy.toString()}
                                pendingRewards={pendingRewards}
                            />
                        </div>
                        <div>
                            <div>
                                <div>
                                    <UserInfo
                                    availableUai={new BigNumber(availableUai)}
                                    uaiStaked={new BigNumber(uaiStaked)}
                                    uaiReward={uaiReward}
                                    />
                                </div>
                                <div>
                                    <Staking
                                    isEnabled={isEnabled}
                                    availableUai={availableUai}
                                    uaiStaked={uaiStaked}
                                    updateTotalInfo={updateTotalInfo}
                                    /> 
                                </div>
                            </div>
                        </div>
                    </Row>
          )}
            </div>
        </div>
    )
    
}

export default withRouter(Vault);