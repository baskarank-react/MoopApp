import { Row } from 'native-base';
import React from 'react';  
import { StyleSheet, View, Text, Button,TouchableOpacity } from 'react-native';  
import { round } from 'react-native-reanimated';
  
export default class OrderDetail extends React.Component { 
    
    state = {
        names: [
           {
              id: 0,
              name: 'order1',
              price:'$10'
           },
           {
              id: 1,
              name: 'order2',
              price:'$20'
           },
           {
              id: 2,
              name: 'order3',
              price:'$10'
           },
           {
              id: 3,
              name: 'order4',
              price:'$15'
           }
        ]

        
     }
    static navigationOptions = {  
        title: 'Profile',  
        headerStyle: {  
            backgroundColor: '#f4511e',  
        },  
        //headerTintColor: '#0ff',  
        headerTitleStyle: {  
            fontWeight: 'bold',  
        }, 
        
        headerShown: false,
    };  


    render() {  
        {/*Using the navigation prop we can get the 
              value passed from the previous screen*/}  
        const { navigation } = this.props;  
        const user_name = navigation.getParam('userName', 'NO-User');  
        const other_param = navigation.getParam('otherParam', 'some default value');  
        return (  
               <View style={{ flex: 1}}>  
                <View > 
                <Text style={{fontSize : 30,textAlign:'center',marginTop:20}}>ORDER</Text>  
                </View>
                <Text style={styles.textStyle}>Date and Time :___________</Text>  
                <Text style={styles.textStyle}>Created By    :___________</Text>  
                <Text style={styles.textStyle}>Table No       :___________ </Text>  
                <Text style={styles.textStyle}>Status         :___________</Text>  
                <Text style={styles.textStyle}>Special ins    :___________ </Text>  
                <Text style={styles.textStyle}>Items and Prices </Text>

                <View>
                {
               this.state.names.map((item, index) => (
                  <TouchableOpacity
                     key = {item.id}
                     style = {styles.container}
                     onPress = {() => this.alertItemName(item)}>
                    <View >
                     <Text style = {styles.textStyle}>
                     {`${item.name}  ${item.price}`}
                     </Text>
                   </View>
                  </TouchableOpacity>
               ))
                }
            </View>

            </View>  
        );  
    }  
}  
const styles = StyleSheet.create({  

    textStyle: {  
        fontSize: 23,  
        textAlign: 'center',  
        color: '#000',  
        marginTop: 30,  
    },  
  
    buttonStyle:{  
        width: "93%",  
        marginTop: 50,  
        backgroundColor: "red",  
    }  
});  