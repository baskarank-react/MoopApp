// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React,{ useState } from 'react';
import {View, Button,Text,StyleSheet, SafeAreaView} from 'react-native';
import { List } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';

const MenuScreen = () => {
  const [isSelected, setSelection] = useState(false);

  return (
    <List.AccordionGroup>
  <List.Accordion title="Category 1" id="1"
    left={
      props =>  
      <Checkbox.Item label="Item" status="checked"  disabled={false} />
    }
  >
     <List.Item title="Menu Item 1" />
     <List.Item title="Menu Item 2" />
   </List.Accordion>
    <List.Accordion title="Category 2" id="2"
     left={props =>  
      <Checkbox.Item label="Item" status="unchecked"  disabled={true}/>}>
     <List.Item title="Menu Item 1" />
     <List.Item title="Menu Item 2" />
   </List.Accordion>
   <List.Accordion title="Category 3" id="3"
     left={props =>  
      <Checkbox.Item label="Item" status="unchecked"  disabled={true}/>}
   >
     <List.Item title="Menu Item 1" />
     <List.Item title="Menu Item 2" />
   </List.Accordion>
   <List.Accordion title="Category 4" id="4"
     left={props =>  
      <Checkbox.Item label="Item" status="unchecked"  disabled={true}/>}
   >

     <List.Item title="Menu Item 1" />
     <List.Item title="Menu Item 2" />
   </List.Accordion>
   <List.Accordion title="Category 5" id="5"
     left={props =>  
      <Checkbox.Item label="Item" status="unchecked"  disabled={true}/>}
   >
     <List.Item title="Menu Item 1" />
     <List.Item title="Menu Item 2" />
   </List.Accordion>
   <List.Accordion title="Category 6" id="6"
     left={props =>  
      <Checkbox.Item label="Item" status="unchecked"  disabled={true}/>}
   >
     <List.Item title="Menu Item 1" />
     <List.Item title="Menu Item 2" />
   </List.Accordion>
 </List.AccordionGroup>
  );
};

const styles = StyleSheet.create({
  bigblue: {
          color: 'blue',
          fontWeight: 'bold',
          fontSize: 20,
          borderColor: 'black',
          borderWidth: 1
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
});
export default MenuScreen;
