import React, { useState, useEffect, Component} from 'react';

import { SafeAreaView, Button,StyleSheet, Text, TouchableOpacity, TouchableHighlight, View, Modal,Dimensions, Alert, TextInput} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';
import {Card} from 'react-native-shadow-cards';
import moment from 'moment';
const { width } = Dimensions.get("window");


export default function Basic({navigation}) {
  const [isModalVisible, setModalVisible] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const toggleModalVisibility = () => {
		setModalVisible(!isModalVisible);
    };


  const [listData, setListData] = useState([]);
  const [search, setSearch] = useState('');


  useEffect(() => {                   
    const unsubscribe = navigation.addListener('focus', () => {
      fetch('http://testweb.izaap.in/moop/api/index.php/service/orders/lists?X-API-KEY=MoopApp2021@!&user_id=251',{
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
    let id="", tableid="",seats="",amount="",orderdatetime="",updatedatetime="",completeddatetime="",specialInstruction="", comments="", tipAmount=""; 
    try{   
      tableid=item.tableid;
      seats=item.seats;
      amount=item.amount;
      orderdatetime=item.orderdatetime;
      updatedatetime=item.updatedatetime;
      completeddatetime=item.completeddatetime;
      specialInstruction=item.special_instruction;
      comments=item.comments;
      tipAmount=item.tip_amount;
      id=item.id;
            
    } catch(e) { console.error(e); } 
    return (            
        <View>                
          <Card style={{width: '95%', padding: 10, margin: 10, backgroundColor:'#F6FAFE'}}>
            <TouchableOpacity onPress={() =>{toggleModalVisibility}} style={styles.rowFront} underlayColor={'#fff'}>
              <Text style={styles.itemStyle}>{"Table Number : "+ tableid }</Text>  
              <Text style={styles.itemStyle}>{"Seats : "+ seats}</Text>
              <Text style={styles.itemStyle}>{"Amount : $"+ amount }</Text>
              <Text style={styles.itemStyle}>{"Comments : "+ comments }</Text>            
              <Text style={styles.itemStyle}>{"Special Instruction : "+ specialInstruction}</Text>
              <Text style={styles.itemStyle}>{"Tip Amount : $"+ tipAmount}</Text>
              <Text style={styles.itemStyle}>{"Order Date Time : "+ moment(orderdatetime).format("MM-DD-YYYY hh:mma")}</Text>
              <Text style={styles.itemStyle}>{"Update Date Time : "+ moment(updatedatetime).format("MM-DD-YYYY hh:mma")}</Text>
              <Text style={styles.itemStyle}>{"Completed Date Time : "+ moment(completeddatetime).format("MM-DD-YYYY hh:mma")}</Text>
            </TouchableOpacity>
          </Card>          
        </View>
    );
  };


  const deleteOrder = (data) => {      
    console.log('Delete Order',data.item.id);
    let dataToSend = {order_id: data.item.id};
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch(`http://testweb.izaap.in/moop/api/index.php/service/orders/remove?X-API-KEY=MoopApp2021@!&order_id=${data.item.id}`, {
      method: 'GET',
      
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        
        console.log(responseJson);        
        if (responseJson.status === 'success') {         

        } else {          
          if(responseJson.message === 'No Orders Found!')
          {
            Alert.alert('Order Deleted Successfully')
          }            
        }
      })
      .catch((error) => {
        //Hide Loader
       // setLoading(false);
        Alert.alert(error)
        console.error(error);
      });
  };
 

  const deleteItem = (rowMap, rowKey, data) => { 
    console.log('RowKey delete item**-',data.item.id)
    closeItem(rowMap, rowKey);
    const newData = [...listData];    
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    console.log(rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);    
    deleteOrder(data);
  };


  const getOrderDetail = (rowMap, rowKey, data) => {
    console.log('Order Get Detail - Delete **-', data.item.id)
    console.log('Order Key', rowKey)
    navigation.navigate('AddUpdatePageStack',{
        screen: 'AddUpdatePage', 
        params: {data: data, operation: 'update'},
    });
    // navigation.navigate('SecondPage', {
    //   paramKey: userName,
    // })
    //
    // fetch(`http://testweb.izaap.in/moop/api/index.php/service/orders/view?X-API-KEY=MoopApp2021@!&order_id=${data.item.id}`,{
    //     method: 'GET'
    //     //Request Type 
    //     })
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //       //console.log(responseJson);
    //       return responseJson.data;
    //     })
    //     .then( data  => {
    //           //setListData(data);    
    //           console.log('OrderDetails',data);
    //           if(data != undefined){ 
    //                  // data.map((item, index)=>{                          
    //                   //const obj = JSON.parse(item.menujson);      
    //               //     obj.map((objitem, index)=>{       
    //               // })       
    //              // })
    //           }
    //           else
    //           {
    //             console.log('No Data Found');
    //             Alert.alert('No Data Found');
    //           } 
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });

    //console.log('RowMap - *** ', rowMap._dispatchInstances._debugOwner)
    //console.log('Order Get Detail - Row Key', rowMap)
    
  }


  const renderHiddenItem = (data, rowMap) => {
    console.log("Data Item ID", data.item.id);
    console.log("Row Map", rowMap);
    console.log("Data", data);

    return (
    <View style={styles.rowBack}>
      <TouchableOpacity style={[styles.actionButton, styles.closeBtn]} onPress={() => {getOrderDetail(rowMap, data.item.key, data)}}>      
        <Text style={styles.btnText}>Update</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.actionButton, styles.deleteBtn]} onPress={() => {        
        Alert.alert(
          'Alert',
          'Are you sure you want to delete ?',
          [
            {text:'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text:'Yes', onPress: ()=> {
              deleteItem(rowMap, data.item.key, data);
            }}
          ],
          { cancelable: true }
        );
        }
      }
      >
        <Text style={styles.btnText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}


  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>      
      <TextInput
            style={styles.textInputStyle}
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search Here"
          />
          

        <View  style={styles.headerView}>
          <Text style={styles.txt}>
              Orders
          </Text>
        </View>
          
      <SwipeListView
            data={listData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={ItemView}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={200}
            rightOpenValue={-150}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowDidOpen={onItemOpen}   
            disableRightSwipe={true}         
      />
      <TouchableOpacity style={styles.addButton} onPress={() =>navigation.navigate('AddUpdatePageStack',{Screen:'AddUpdatePage', params: {operation:'add'}})}>
          <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
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
  txt:{
    //paddingLeft:100,
    fontSize:22,
    fontWeight:'bold',    
  },
  headerView:{    
    alignItems: 'center',    
  },
  textInputStyle: {
    height: 40,
    borderWidth: 2,
    paddingLeft: 20,
    borderRadius:10,
    margin: 5,
    borderColor: '#5F6160',
    backgroundColor: '#F6FAFE',
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
  padding: 3,
  fontSize: 10,
},
});
