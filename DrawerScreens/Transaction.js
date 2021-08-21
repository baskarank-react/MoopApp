import React, { useState, useEffect, Component} from 'react';

import { StyleSheet, Text, TouchableOpacity, TouchableHighlight, View, Modal,Dimensions, Alert} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';
import {Card} from 'react-native-shadow-cards';

const { width } = Dimensions.get("window");


export default function Basic({navigation}) {
  const [isModalVisible, setModalVisible] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const toggleModalVisibility = () => {
		setModalVisible(!isModalVisible);
    };

  const [listData, setListData] = useState([]);


  useEffect(() => {                   
    const unsubscribe = navigation.addListener('focus', () => {
      fetch('http://testweb.izaap.in/moop/api/index.php/service/transaction/lists?X-API-KEY=MoopApp2021@!',{
        method: 'GET'
        //Request Type 
        })
        .then((response) => response.json())
        .then((responseJson) => {
          //console.log(responseJson);
          return responseJson.data;
        })
        .then( data  => {
              setListData(data);    
              console.log('data 1',data);
              if(data != undefined){ 
                      data.map((item, index)=>{  
                        
                      //const obj = JSON.parse(item.menujson);      
                  //     obj.map((objitem, index)=>{       
                   })       
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

  
  const ItemView = ({item}) => 
  {        
    let transactionId="", transactedTo="",transactedFrom="",transactionAmount="",transactionMode="",transactionStatus="",transactionComment="",transactionFee="", referenceID=""; 
    try{   
      transactionId=item.transaction_id;
      transactedTo=item.transacted_to;
      transactedFrom=item.transacted_from;
      transactionAmount=item.transaction_amount;
      transactionMode=item.transaction_mode;
      transactionStatus=item.transaction_status;
      transactionComment=item.transaction_comment;
      transactionFee=item.transaction_fee;
      referenceID=item.referenceid;                  
    } catch(e) { console.error(e); } 
    return (      
      
        <View>
                
                <Card style={{width: '95%', padding: 10, margin: 10, backgroundColor:'#F6FAFE'}}>
          <TouchableOpacity onPress={() =>{toggleModalVisibility}} style={styles.rowFront} underlayColor={'#fff'}>
            <Text style={styles.itemStyle}>{"Transaction ID : "+ transactionId }</Text>  
            <Text style={styles.itemStyle}>{"Transacted To : "+ transactedTo}</Text>
            <Text style={styles.itemStyle}>{"Transacted From : "+ transactedFrom }</Text>
            <Text style={styles.itemStyle}>{"Transacted Amount : $"+ transactionAmount }</Text>            
            <Text style={styles.itemStyle}>{"Trasaction Mode : "+ transactionMode}</Text>
            <Text style={styles.itemStyle}>{"Transaction Status : "+ transactionStatus}</Text>
            <Text style={styles.itemStyle}>{"Transaction Comment : "+ transactionComment}</Text>
            <Text style={styles.itemStyle}>{"Transaction Fee : $"+ transactionFee}</Text>
            <Text style={styles.itemStyle}>{"Reference ID : "+ referenceID}</Text>
          </TouchableOpacity>
          </Card>
          
        </View>
    );
  };


  



  


  return (
    <View style={styles.container}>
      <SwipeListView
            data={listData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={ItemView}           
            
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowDidOpen={onItemOpen}
            disableRightSwipe={true} 
      />
      
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
  addButtonText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
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
  padding: 3,
  fontSize: 10,
},
});
