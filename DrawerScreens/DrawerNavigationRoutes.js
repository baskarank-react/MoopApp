// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React,{ useState }  from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

// Import Screens
import HomeScreen from './HomeScreen';
import ProfilePage from './ProfilePage';
import MenuScreen from './MenuScreen';
import MenuType from './MenuType';
import MenuItem from './MenuItem';
import Categories from './Categories';
import Labels from './Labels';
import Modifiers from './Modifiers';
import orderScreen from './OrderScreen';
import ReportsScreen from './ReportsScreen';
import Employee from './Employee';
import ModifierGroup from './ModifierGroup';
import ExpandableViewSeparate from './ExpandableViewSeparate';
import CustomSidebarMenu from '../Components/CustomSidebarMenu';
import NavigationDrawerHeader from '../Components/NavigationDrawerHeader';
import OrderNavigationDrawer from '../Components/OrderNavigationDrawer';
import DefaultNavDrawerHeader from '../Components/DefaultNavDrawerHeader';
import Tables from './Tables';
import Transaction from './Transaction';
import AddUpdatePage from '../DrawerScreens/AddUpdatePage';
import AddMenuItem from './AddMenuItem';
import AddMenuType from './AddMenuType';
import AddModifier from './AddModifier';
import AddCategory from './AddCategory';
import AddTable from './AddTables';
import AddLabel from './AddLabel';
import AddEmployee from './AddEmployee';
import AddModifierGroup from './AddModifierGroup';
import {Button, StyleSheet, Image,View, Linking} from 'react-native';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const homeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home', //Set Header Title
          headerLeft: () => (
            <DefaultNavDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#DB3133', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const employeeStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Employee"
      screenOptions={{
        headerLeft: () => (
          <DefaultNavDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#DB3133', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="Employee"
        component={Employee}
        options={{
          title: 'Employee', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const modifierGroupStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="ModifierGroup"
      screenOptions={{
        headerLeft: () => (
          <DefaultNavDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#DB3133', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="ModifierGroup"
        component={ModifierGroup}
        options={{
          title: 'ModifierGroup', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const tablesStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Tables"
      screenOptions={{
        headerLeft: () => (
          <DefaultNavDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#DB3133', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="Tables"
        component={Tables}
        options={{
          title: 'Tables', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const transactionScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Transaction"
      screenOptions={{
        headerLeft: () => (
          <DefaultNavDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#DB3133', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="Transaction"
        component={Transaction}
        options={{
          title: 'Transaction', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const orderScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="orderScreen"
      screenOptions={{
        headerLeft: () => (
          
          <OrderNavigationDrawer navigationProps={navigation} />
          
        ),
        headerStyle: {
          backgroundColor: '#DB3133', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="orderScreen"
        component={orderScreen}
        options={{
          title: 'OrderList', //Set Header Title
          
        }}
      />
    </Stack.Navigator>
  );
};


const menuScreenStack = ({navigation}) => { 
  return (
    <Stack.Navigator
      initialRouteName="MenuScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#DB3133', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
        headerRight: () => (
          <View>
             <View >{global.isEdit?<Button title="Delete" color="#307ecc"/>:null}</View>
            <Button title="Bulk Edit" color="#307ecc" onPress={navigation.navigate(' MenuScreen')}/>
         </View>  
        ),}}>
      <Stack.Screen
        name="MenuScreen"
        component={MenuScreen}
        options={({ navigation, route }) => ({
        
        })}
      />
    </Stack.Navigator>
  );
};


const reportsScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="ReportsScreen"
      screenOptions={{
        headerLeft: () => (
          <DefaultNavDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#DB3133', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="ReportsScreen"
        component={ReportsScreen}
        options={{
          title: 'Reports', //Set Header Title
          
        }}
      />
    </Stack.Navigator>
  );
};

const menuTypeStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="MenuType"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#DB3133', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="MenuType"
        component={MenuType}
        options={{
          title: 'Menu Type', //Set Header Title
          
        }}
      />
    </Stack.Navigator>
  );
};

const menuItemStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="MenuItem"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#DB3133', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="MenuItem"
        component={MenuItem}
        options={{
          title: 'Menu Item', //Set Header Title
          
        }}
      />
    </Stack.Navigator>
  );
};

const CategoriesStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Categories"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#DB3133', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{
          title: 'Categories', //Set Header Title
          
        }}
      />
    </Stack.Navigator>
  );
};

const LabelsStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Labels"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#DB3133', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="Labels"
        component={Labels}
        options={{
          title: 'Labels', //Set Header Title          
        }}
      />
    </Stack.Navigator>
  );
};

const ModifiersStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Modifiers"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#DB3133', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="Modifiers"
        component={Modifiers}
        options={{
          title: 'Modifier', //Set Header Title
          
        }}
      />
    </Stack.Navigator>
  );
};

const AddUpdatePageStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="AddUpdatePage"
      screenOptions={{
        headerLeft: () => (
          <OrderNavigationDrawer navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#DB3133', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="AddUpdatePage"
        component={AddUpdatePage}
        
      />
    </Stack.Navigator>
  );
};

const AddMenuItemStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="AddMenuItem"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#DB3133', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="AddMenuItem"
        component={AddMenuItem}
        options={{
          title: 'Add/Update Menu Item', //Set Header Title          
        }}
      />
    </Stack.Navigator>
  );
};

const AddMenuTypeStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="AddMenuType"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#DB3133', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="AddMenuType"
        component={AddMenuType}
        options={{
          title: 'Add/Update Menu Type', //Set Header Title          
        }}
      />
    </Stack.Navigator>
  );
};

const AddModifierStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="AddModifier"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#DB3133', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="AddModifier"
        component={AddModifier}
        options={{
          title: 'Add/Update Modifier', //Set Header Title          
        }}
      />
    </Stack.Navigator>
  );
};

const AddCategoryStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="AddCategory"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#DB3133', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="AddCategory"
        component={AddCategory}
        options={{
          title: 'Add/Update Category', //Set Header Title          
        }}
      />
    </Stack.Navigator>
  );
};

const AddTableStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="AddTable"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#DB3133', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="AddTable"
        component={AddTable}
        options={{
          title: 'Add/Update Table', //Set Header Title          
        }}
      />
    </Stack.Navigator>
  );
};


const AddLabelStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="AddLabel"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#DB3133', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="AddLabel"
        component={AddLabel}
        options={{
          title: 'Add/Update Label', //Set Header Title          
        }}
      />
    </Stack.Navigator>
  );
};


const AddEmployeeStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="AddEmployee"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#DB3133', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="AddEmployee"
        component={AddEmployee}
        options={{
          title: 'Add/Update Employee', //Set Header Title          
        }}
      />
    </Stack.Navigator>
  );
};


const AddModifierGroupStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="AddModifierGroup"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#DB3133', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="AddModifierGroup"
        component={AddModifierGroup}
        options={{
          title: 'Add/Update ModifierGroup', //Set Header Title          
        }}
      />
    </Stack.Navigator>
  );
};

const ProfilePageStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="ProfilePage"
      screenOptions={{
        headerLeft: () => (
          <DefaultNavDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#DB3133', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{
          title: 'Profile Page', //Set Header Title          
        }}
      />
    </Stack.Navigator>
  );
};

function getExpandableView(props){
  return (
      <ExpandableViewSeparate navObj={props.navigation}/>
    );
};

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      {getExpandableView(props)}
      
    </DrawerContentScrollView>
  );
}

const DrawerNavigatorRoutes = (props) => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: '#cee1f2',
        color: '#cee1f2',
        itemStyle: {marginVertical: 3, color: 'white'},
        labelStyle: {
          color: 'black',fontSize:16,
        },
      }}
      screenOptions={{headerShown: false}}
      drawerContent={props => <CustomDrawerContent {...props} />}>

      <Drawer.Screen
        name="homeScreenStack"
        options={{drawerLabel: 'Home Screen'}}      
        component={homeScreenStack}
      />

      <Drawer.Screen
      name="orderScreenStack"
      options={{drawerLabel:"Order Screen"}}
      component={orderScreenStack}
      />

      <Drawer.Screen
        name="menuScreenStack"
        options={{drawerLabel: 'Menu Screen'}}      
        component={menuScreenStack}
      />

      <Drawer.Screen
        name="reportsScreenStack"
        options={{drawerLabel: 'Reports'}}
        component={reportsScreenStack}
      />

      <Drawer.Screen
        name="employeeStack"
        options={{drawerLabel: 'Employee'}}
        component={employeeStack}
      />

      <Drawer.Screen
      name="tablesStack"
      options={{drawerLabel:'Tables'}}
      component={tablesStack}/>

      <Drawer.Screen
      name="transactionScreenStack"
      options={{drawerLabel:"Transaction"}}
      component={transactionScreenStack}
      />

      <Drawer.Screen
      name="MenuTypeStack"
      options={{drawerLabel:"MenuType"}}
      component={menuTypeStack}
      />  

      <Drawer.Screen
      name="MenuItemStack"
      options={{drawerLabel:"MenuItem"}}
      component={menuItemStack}
      />

      <Drawer.Screen
      name="ModifierStack"
      options={{drawerLabel:"Modifiers"}}
      component={ModifiersStack}
      />

    <Drawer.Screen
      name="ModifierGroupStack"
      options={{drawerLabel:"ModifierGroup"}}
      component={modifierGroupStack}
      />

      <Drawer.Screen
      name="CategoriesStack"
      options={{drawerLabel:"Categories"}}
      component={CategoriesStack}
      />

      <Drawer.Screen
      name="LabelsStack"
      options={{drawerLabel:"Labels"}}
      component={LabelsStack}
      />

      <Drawer.Screen
      name="AddUpdatePageStack"
      options={{drawerLabel:()=>null}}
      component={AddUpdatePageStack}/>

      <Drawer.Screen
      name="AddMenuItemStack"
      options={{drawerLabel:()=>null}}
      component={AddMenuItemStack}/>

      <Drawer.Screen
      name="AddMenuTypeStack"
      options={{drawerLabel:()=>null}}
      component={AddMenuTypeStack}/>

      <Drawer.Screen
      name="AddModifierStack"
      options={{drawerLabel:()=>null}}
      component={AddModifierStack}/>

      <Drawer.Screen
      name="AddCategoryStack"
      options={{drawerLabel:()=>null}}
      component={AddCategoryStack}/>

    <Drawer.Screen
      name="AddTableStack"
      options={{drawerLabel:()=>null}}
      component={AddTableStack}/>

    <Drawer.Screen
      name="AddLabelStack"
      options={{drawerLabel:()=>null}}
      component={AddLabelStack}/>

    <Drawer.Screen
        name="AddEmployeeStack"
        options={{drawerLabel:()=>null}}
        component={AddEmployeeStack}/>


    <Drawer.Screen
        name="AddModifierGroupStack"
        options={{drawerLabel:()=>null}}
        component={AddModifierGroupStack}/>

    <Drawer.Screen
      name="ProfilePageStack"
      options={{drawerLabel:()=>null}}
      component={ProfilePageStack}/>
     </Drawer.Navigator>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#307ecc',
  },
})
export default DrawerNavigatorRoutes;
