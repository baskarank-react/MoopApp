import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons'; 
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import {DrawerActions} from '@react-navigation/native';

import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import AsyncStorage from '@react-native-community/async-storage'; 

function CustomHeader(props) {
  const toggleDrawer = () =>
    props.navigation.dispatch(DrawerActions.toggleDrawer());

    const CustomMenu = (props) => {
      let _menu = null;
      return (
        <View style={props.menustyle}>
          <Menu
            ref={(ref) => (_menu = ref)}
            button={
              props.isIcon ? (
                <TouchableOpacity onPress={() => _menu.show()}>
                 <Icon  style={{ paddingLeft: 10 }} color="#ffffff"  name="more-vert"  size={30}  />  
                </TouchableOpacity>
              ) : (
                <Text
                  onPress={() => _menu.show()}
                  style={{color: 'red'}}>
                  {props.menutext}
                </Text>
              )
            }>
            <MenuItem onPress={() => {AsyncStorage.setItem('ordertype', "cmorder");}}>
             Completed Order
            </MenuItem>
    
            <MenuItem >Current Order</MenuItem>
    
            <MenuDivider />
    
            <MenuItem onPress={() => {Alert.alert('PopUp Menu Button Clicked...')}}>
              Accepted Order
            </MenuItem>
    
            <MenuItem onClick={() => {this._menu.hide()}}>
              Cancel
            </MenuItem>
    
          </Menu>
        </View>
      );
    };
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={toggleDrawer}
            style={styles.leftButton}
            testID="CustomHeader-toggleDrawer">
           <Icon  style={{ paddingLeft: 10 }}   color="#ffffff" name="md-menu"  size={30}  />  
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <Text style={styles.headerTxt}>HEADER</Text>
        </View>
        <View>
            <TouchableOpacity
            style={styles.leftButton}
            testID="CustomHeader-toggleDrawer">  
        <Icon    type="ionicon"  color="#ffffff" name="award"  size={30}  />  
        <CustomMenu/>
        </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#222222',
    minHeight: 40,
  },
  headerLeft: {
    flexDirection: 'row',
  },
  headerRight: {
    flexDirection: 'row',
  },
  leftButton: {
    marginLeft: 10,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight: 40,
  },
  buttonTxt: {
    color: '#ddd',
    fontWeight: 'bold',
  },
  headerTxt: {
    color: '#ddd',
  },
});

export default CustomHeader;
