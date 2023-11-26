import React from 'react';
import { Appbar } from 'react-native-paper';

const Header = ({ title, goBack, children}) => {
  return (
    <Appbar.Header style={{ backgroundColor: '#90AB4A' }}>
      {
        goBack && 
        <Appbar.BackAction onPress={goBack} />
      }
      <Appbar.Content 
      titleStyle={{ alignSelf: 'center', backgroundColor: '#90AB4A',}}
      title={title} />
      {children}
    </Appbar.Header>
  );
};

export default Header;
