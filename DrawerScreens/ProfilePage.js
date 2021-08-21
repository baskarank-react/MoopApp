import React, { useState, useEffect, Component} from 'react';

import { StyleSheet, Text, TouchableOpacity, TouchableHighlight, View, Modal,Dimensions, Alert} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';
import {Card} from 'react-native-shadow-cards';
import { set } from 'react-native-reanimated';

const { width } = Dimensions.get("window");


export default function Basic({navigation}) {
  const [isModalVisible, setModalVisible] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const toggleModalVisibility = () => {
		setModalVisible(!isModalVisible);
    };

  //const [listData, setListData] = useState([]);
  const[id, setId] = useState("");
  const[rolesId, setRolesId] = useState("");
  const[email, setEmail] = useState("");
  const[title, setTitle] = useState("");
  const[firstName, setFirstName] = useState("");
  const[lastName, setLastName] = useState("");
  const[gender, setGender] = useState("");
  const[address, setAddress] = useState("");
  const[country, setCountry] = useState("");

 

  useEffect(() => {                   
    const unsubscribe = navigation.addListener('focus', () => {
      fetch('http://139.59.65.210/moop/api/index.php/service/user/profile?X-API-KEY=MoopApp2021@!&user_id=251',{
        method: 'GET'
        //Request Type 
        })
        .then((response) => response.json())
        .then((responseJson) => {
          //console.log(responseJson);
          return responseJson.data;
        })
        .then( data  => {
              //setListData(data);    
              console.log('data 1',data.id);
              setId(data.id);
              setRolesId(data.roles_id);
              setEmail(data.email);
              setTitle(data.title);
              setFirstName(data.first_name);
              setLastName(data.last_name);
              setGender(data.gender);
              setAddress(data.address);
              setCountry(data.country);
              if(data != undefined){ 
                     // data.map((item, index)=>{  
                        
                      //const obj = JSON.parse(item.menujson);      
                  //     obj.map((objitem, index)=>{       
                   //})       
                 // })
              }
              else
              {
                console.log('No Data Found');
                Alert.alert('No Data Found');
              } 
        })
        .catch((error) => {
          console.error(error);
        });
    });  
return unsubscribe;      
}, [navigation]);


  const closeItem = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };


  const onItemOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  
  

  


  return (
    <View style={styles.container}>
      <View>  
                <Text style={styles.itemStyle}>{"Employee Role: "+ id }</Text>  
                <Text style={styles.itemStyle}>{"Roles ID: "+ rolesId}</Text>
                <Text style={styles.itemStyle}>{"Email: "+ email }</Text>
                <Text style={styles.itemStyle}>{"Title: "+ title }</Text>            
                <Text style={styles.itemStyle}>{"First Name: "+ firstName}</Text>
                <Text style={styles.itemStyle}>{"Last Name: "+ lastName}</Text>                
                <Text style={styles.itemStyle}>{"Address: "+ address}</Text>
        </View>
      
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  list: {
    color: '#FFF',
  },

  btnText: {
    color: '#FFF',
    textShadowColor: 'white',    
  },

  rowFront: {
    //alignItems: 'center',
    //backgroundColor: 'lightcoral',
    //borderBottomColor: 'black',
    //borderBottomWidth: 0.5,
    //justifyContent: 'center',
    height: 180,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
  },
  actionButton: {
    alignItems: 'center',
    bottom: 20,
    justifyContent: 'center',
    position: 'absolute',
    top: 20,
    right:60,
    width: 75,
  },
  closeBtn: {
    backgroundColor: 'blue',
    //bottom: 40,
    right: 80,
    //width: 75,
    
    //top: 20,
    // height: '100%'
  },
  deleteBtn: {
    backgroundColor: 'red',
    right: 10,
  },
  addButtonText:{
fontSize: 20,
fontWeight: 'bold',
color: 'white'
  },
  addButton:{
    position:'absolute',
    zIndex:11,
    right:20,
    bottom:50,
    backgroundColor:'#DB3133',
    width:80,
    height:80,
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center',
    elevation:8,
  },
  viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    right:"25%",
    elevation: 5,
    transform: [{ translateX: -(width * 0.4) },
          { translateY: -90 }],
    height: 370,
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  itmtxt:{
    fontSize:20
},
itemStyle: {
  padding: 10,
  fontSize: 20,
},
});
