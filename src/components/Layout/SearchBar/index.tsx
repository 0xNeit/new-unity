/** @jsxImportSource @emotion/react */
import React, { InputHTMLAttributes, useState } from 'react';
import config from 'config';
import { useStyles } from './styles';
import core from 'assets/img/coredao.png'
import { TextField } from 'components/TextField';
import { useHideXlDownCss, useShowXlDownCss } from 'hooks/responsive';

interface SearchProps {
    searchValue: string;
    onSearchInputChange: (newValue: string) => void;
}

export const SearchBarUi: React.FC<SearchProps> = ({ searchValue, onSearchInputChange }) => {
  const styles = useStyles();

  const showXlDownCss = useShowXlDownCss();
  const hideXlDownCss = useHideXlDownCss();

  const handleSearchInputChange: InputHTMLAttributes<HTMLInputElement>['onChange'] = changeEvent =>
    onSearchInputChange(changeEvent.currentTarget.value);

  return (
    <div>
        <TextField
            css={[styles.desktopSearchTextField, hideXlDownCss]}
            value={searchValue}
            onChange={handleSearchInputChange}
            placeholder='Search for tokens, pools...'
            leftIconSrc="magnifier"
            variant="secondary"
        />
        <TextField
            css={[styles.tabletSearchTextField, showXlDownCss]}
            value={searchValue}
            onChange={handleSearchInputChange}
            placeholder='Search for tokens, pools...'
            leftIconSrc="magnifier"
            variant="secondary"
        />
    </div>
  );
};

export const SearchBar: React.FC = () => {
    const [searchValue, setSearchValue] = useState('');
  return (
    <SearchBarUi
      searchValue={searchValue}
      onSearchInputChange={setSearchValue}
    />
  );
};

export default SearchBar;
