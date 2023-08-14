
import uniqueContractInfos, {
  UniqueContractName,
  UniqueContractTypeByName,
} from './uniqueContractInfos';

export const contractInfos = {
  ...uniqueContractInfos,
  // ...genericContractInfos,
  // swapRouter,
};

export type ContractName = keyof typeof contractInfos;

export type ContractTypeByName<TContractName extends ContractName> =
  TContractName extends UniqueContractName
    ? UniqueContractTypeByName<TContractName>
    : never;

export { default as uniqueContractInfos } from './uniqueContractInfos';
export * from './uniqueContractInfos';
