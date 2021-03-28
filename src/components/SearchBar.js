import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { SearchBar as DefaultSearchBar } from 'react-native-elements';
import { palette } from './../styles/styles';

export const SearchBar = ({ loading, placeholder='Search...', getRef, onSetQuery }) => {
  const [ query, setQuery ] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSetQuery(query);
      setQuery(query);
    }, 250);
    return () => clearTimeout(timer);
  }, [query, onSetQuery])


  return (
    <DefaultSearchBar 
      ref={getRef}
      placeholder={placeholder}
      onChangeText={setQuery}
      platform={Platform.OS}
      value={query}
      showLoading={loading}
      clearIcon={{
        underlayColor: palette.gray,
        color: palette.black,
      }}
      cancelButtonProps={{
        color: palette.pink
      }}
      cancelIcon={{
        underlayColor: palette.gray,
        color: palette.black,
      }}
      searchIcon={{ color: palette.black }}
      autoCorrect={false}
      inputStyle={styles.inputStyle}
      inputContainerStyle={styles.inputContainerStyle}
      containerStyle={styles.containerStyle}
      leftIconContainerStyle={styles.leftIconContainerStyle}
      placeholderTextColor={palette.gray}
    />
  )
}

const styles = {
  inputStyle: {
    backgroundColor: 'transparent',
    color: palette.blackOpacity80,
  },
  inputContainerStyle: {
    backgroundColor: palette.white,
    borderRadius: 20,
  },
  containerStyle: {
    backgroundColor: 'transparent',
    marginHorizontal: Platform.OS === 'ios' ? 6 : 8,
  },
  leftIconContainerStyle: {
    backgroundColor: 'transparent'
  },
}