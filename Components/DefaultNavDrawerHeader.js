// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {View, Image, TouchableOpacity, Alert,StyleSheet,Text} from 'react-native';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';

const DefaultNavDrawerHeader = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };
  
 let _menu = null;
 let _menu1 = null;

  return (         
    <View style={{flexDirection: 'row'}}>
        


     <TouchableOpacity onPress={toggleDrawer}>
        <Image source={{uri:'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',}}
          style={{width: 35, height: 35, marginLeft: 5}}/>
      </TouchableOpacity>

      
    </View>
  );  
};

export default DefaultNavDrawerHeader;

const styles = StyleSheet.create({
  main: {
    //flex: 1,
    //justifyContent: 'center',
    backgroundColor: 'red',
    alignContent: 'flex-end',
  }, 

})