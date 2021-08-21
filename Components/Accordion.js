import  React ,{ Component } from 'react';
import { View,StyleSheet, Text } from 'react-native';
import { List } from 'react-native-paper';


export default class MyComponent extends React.Component
{
    render() {  
        return (   
        <List.AccordionGroup>
        <Text style={styles.bigblue}> 
        Orders
        </Text>
        <List.Accordion title="Menu" id="2">
         <List.Item title="Item 2.1" />
         <List.Item title="Item 2.2" />
       </List.Accordion>
        <Text style={styles.bigblue}  onPress={() => 
                 {
                    this.props.navigation.navigate('Menus')
                 }
                }>
        Reports
        </Text>
        <Text style={styles.bigblue}>
        Employee
        </Text>
       
       <View>
    
       </View>
     </List.AccordionGroup>
        );
    }
}

class Menus extends Component {  
    static navigationOptions = {  
         title: 'Moop Application',  
    };  
  
    render() {  
        return (  
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>  
                <Text>MenuScreen</Text>  
            </View>  
        );  
    }  
}  


const styles = StyleSheet.create({
    bigblue: {
            color: 'blue',
            fontWeight: 'bold',
            fontSize: 20,
            borderColor: 'black',
            borderWidth: 1
    }
});