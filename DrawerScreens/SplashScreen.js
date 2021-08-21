// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image,Text} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('user_id').then((value) =>
        navigation.replace(value === null ? 'Auth' : 'DrawerNavigationRoutes'),
      );
    }, 5000);
  }, []); 

  return (
    <View style={styles.container}>

      <Image
                source={require('../Images/logo_icon_tagline.png')}
        style={{width: '50%', resizeMode: 'contain', margin: 30}}
      />

      <ActivityIndicator
        animating={animating}
        color="#DB3133"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
    color: '#DB3133'
  },
  Txt:{
    fontSize:80
  },
});
 