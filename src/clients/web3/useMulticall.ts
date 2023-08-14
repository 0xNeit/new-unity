import { Multicall } from 'core-multicall';
import { useMemo } from 'react';

import { useAuth } from '../../context/AuthContext';

const useMulticall = () => {
  const { provider } = useAuth();
  return useMemo(
    () =>
      new Multicall({
        ethersProvider: provider,
        tryAggregate: true,
      }),
    [provider],
  );
};

export default useMulticall;
