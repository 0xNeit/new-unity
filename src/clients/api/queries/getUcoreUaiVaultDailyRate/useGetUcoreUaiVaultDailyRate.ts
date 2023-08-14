import { QueryObserverOptions, useQuery } from 'react-query';
import { getContractAddress } from 'utils';

import { GetUcoreUaiVaultDailyRateOutput, getUcoreUaiVaultDailyRate } from 'clients/api';
import { useComptrollerContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

type Options = QueryObserverOptions<
  GetUcoreUaiVaultDailyRateOutput,
  Error,
  GetUcoreUaiVaultDailyRateOutput,
  GetUcoreUaiVaultDailyRateOutput,
  FunctionKey.GET_UCORE_UAI_VAULT_DAILY_RATE
>;

const mainPoolComptrollerAddress = getContractAddress('comptroller');

const useGetUcoreUaiVaultDailyRate = (options?: Options) => {
  const comptrollerContract = useComptrollerContract(mainPoolComptrollerAddress);

  return useQuery(
    FunctionKey.GET_UCORE_UAI_VAULT_DAILY_RATE,
    () => getUcoreUaiVaultDailyRate({ comptrollerContract }),
    options,
  );
};

export default useGetUcoreUaiVaultDailyRate;
