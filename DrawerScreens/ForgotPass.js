import React,{Component,useState} from 'react';

import{StyleSheet,Text,View,TextInput,TouchableOpacity,Keyboard,KeyboardAvoidingView, Alert} 
from 'react-native';

export default class ForgotPass extends Component
{         
    render()
    {
        return(
            <View style={styles.container}>    
                <View style={styles.subview}>
                    <Text style={styles.subTxt}>Forgot Password</Text>

                    <TextInput style={styles.nameInput} placeholder=" Enter Your Email Address"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                        autoCorrect={false}/>   

                    <Text style={styles.forgot} onPress={()=>this.props.navigation.navigate('LoginScreen')}>
                        Login
                    </Text>

                    <TouchableOpacity style={styles.btn} onPress={()=>Alert.alert('Enter Valid Email Address')}>
                        <Text style={styles.btnTxt}>SEND</Text>
                    </TouchableOpacity>
                </View>
            </View>    
        );
    }
}

const styles=StyleSheet.create(
    {
        container:{
            flex:1,
             backgroundColor:'#307ecc',             
             justifyContent:'center',
             height:700,
        },
        subview: {
            backgroundColor:'white',
            height:430,
            marginTop:300,
            borderTopRightRadius:40,
            borderTopLeftRadius:40,
            //justifyContent: 'center',
            alignItems: 'center',
        },
        headerTxt:{
            fontWeight:'bold',
            color:'white',
            position:'absolute'
        },
        subTxt:{
            fontSize:30,
            color:'black',
            marginTop:30,
            fontWeight:'bold',
            //marginLeft:40,
        },
        nameInput:{
            height:40,
            width:270,
            borderBottomWidth:2,
            marginTop:30,
            color: 'white',
            paddingLeft: 15,
            paddingRight: 15,
            borderWidth: 1,
            borderRadius: 20,
            borderColor: '#000000',            
        },
        btn:{
            height:40,
            width:200,            
            backgroundColor:'#7DE24E',
            borderRadius:80,
            borderWidth:1,        
            //marginLeft:90,
            marginTop:100,
            justifyContent:'center',
            alignItems:'center',
        },
        btnTxt:{
            color:'white',
            fontWeight:'bold',
            fontSize:18,
        },
        endTxt:{
            fontSize:15,
            marginTop:30,
            marginLeft:30,
            fontWeight:'bold',            
        },
        endView:{
            flexDirection:'row',
            justifyContent:'space-between',
            bottom:50,
        },
        endBtn:{
            marginRight:80,
        },
        loginTxt:{
            fontSize:22,
            marginTop:30,
            bottom:20,
            color:'red',
            marginLeft:20,
        },
        forgot:{
            marginLeft:210,
            top:40,
            fontSize:17,
            color:'black',
        },   
        buttonStyle: {
            backgroundColor: '#7DE24E',
            borderWidth: 0,
            color: '#FFFFFF',
            borderColor: '#7DE24E',
            height: 40,
            width:170,
            alignItems: 'center',
            borderRadius: 30,
            marginLeft: 100,
            marginRight: 35,
            marginTop: 20,
            marginBottom: 25,
          },
    }
);