// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, {useState, useEffect,Component} from 'react';
import moment from 'moment';      
// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Modal,
  Button,
  Alert,
  TouchableOpacity
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Card} from 'react-native-shadow-cards';

const Tablesscreen = ({navigation}) => 
{  
  const [isModalVisible, setModalVisible] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const toggleModalVisibility = () => {
		setModalVisible(!isModalVisible);
    };
  const [count, setCount] = React.useState(0);
  const [listData, setListData] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [menuitem, setMenuitems] = useState([]);

    const item=()=>{
      Alert.alert('hi')
    }


    
    useEffect(() => {       
            
      const unsubscribe = navigation.addListener('focus', () => {
        fetch('http://testweb.izaap.in/moop/api/index.php/service/tables/lists?X-API-KEY=MoopApp2021@!&user_id=251',{
          method: 'GET'
          //Request Type 
          })
          .then((response) => response.json())
          .then((responseJson) => {
            return responseJson.data;
          })
          .then( data  => {
                setListData(data);  
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
    let  tableid="", tablename="", seats="", userid="", restid="", status="", isavailable="", seatsbooked="", bookedtime=""; 
    try{   
      tableid=item.id;
      tablename=item.tablename;
      seats=item.seats;
      userid=item.userid;
      restid=item.restid;
      status=item.status;
      isavailable=item.isavailable;
      seatsbooked=item.seatsbooked;
      bookedtime=item.bookedtime; 
    } catch(e) { console.error(e); } 

    return (      
        <View>
          {(
                (status === "0") ? 
                <Card style={{width: '95%', padding: 2, margin: 10, backgroundColor:'white'}}>
                  <TouchableOpacity onPress={() => getItem(item)}>                        
                  <Text style={styles.itemStyle}>{"TableName: "+ tablename }</Text>
                  <Text style={styles.itemStyle}>{"Seats: "+ seats }</Text>
                  <Text style={styles.itemStyle}>{"Table Manager: "+ userid }</Text>
                    <Text style={styles.itemStyle}>{"Status: Available"}</Text> 
                    <Text style={styles.itemStyle}>{"Seats Booked: "+ seatsbooked }</Text>   
                  <Text style={styles.itemStyle}>{"Booked Time: "+ moment(bookedtime).format("MM-DD-YYYY hh:mma") }</Text>   
                </TouchableOpacity>  
                </Card>
                :
                <Card style={{width: '95%', padding: 2, margin: 10, backgroundColor:'#DB3133'}}>
                  <TouchableOpacity onPress={() => getItem(item)}>                        
                    <Text style={styles.itemStyleWhite}>{"TableName: "+ tablename }</Text>
                    <Text style={styles.itemStyleWhite}>{"Seats: "+ seats }</Text>
                    <Text style={styles.itemStyleWhite}>{"Table Manager: "+ userid }</Text> 
                      <Text style={styles.itemStyleWhite}>{"Status: Occupied"}</Text>         
                      <Text style={styles.itemStyleWhite}>{"Seats Booked: "+ seatsbooked }</Text>   
                    <Text style={styles.itemStyleWhite}>{"Booked Time: "+ moment(bookedtime).format("MM-DD-YYYY hh:mma") }</Text>   
                </TouchableOpacity> 
                </Card>
          )}
          
        </View>
    );
  };

  const ItemSeparatorView = () => 
  {
    return (
      <View style={{height: 0, width: '100%', backgroundColor: '#C8C8C8'}}/> 
    );
  };

  const getItem=(item)=>
  {
    Alert.alert('TableName : ' + item.tablename + '\n' +'Seats Booked : ' + item.seatsbooked + '\n' +'TableNo : ' + item.table);
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

    fetch(`http://testweb.izaap.in/moop/api/index.php/service/tables/remove?X-API-KEY=MoopApp2021@!&table_id=${data.item.id}`, {
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
          if(responseJson.message === 'No Tables Found!')
          {
            Alert.alert('Table Deleted Successfully')
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


  const getTableDetail = (rowMap, rowKey, data) => {
    console.log('Order Get Detail - Delete **-', data.item.id)
    console.log('Order Key', rowKey)    
    navigation.navigate('AddTableStack',{
        screen: 'AddTable', 
        params: {data: data, operation: 'update'},
    });
  }


  const renderHiddenItem = (data, rowMap) => {
    console.log("Data Item ID", data.item.id);
    console.log("Row Map", rowMap);
    console.log("Data", data);

    return (
    <View style={styles.rowBack}>
      <TouchableOpacity style={[styles.actionButton, styles.closeBtn]} onPress={() => {getTableDetail(rowMap, data.item.key, data)}}>      
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
        </View>

      <TouchableOpacity style={styles.addButton} onPress={() =>navigation.navigate('AddTableStack',{Screen:'AddTable', params: {operation:'add'}})}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
    },
    itemStyle: {
      padding: 10,
    },
    itemStyleWhite: {
      padding: 10,
      color: 'white'
    },
    textInputStyle: {
      height: 40,
      borderWidth: 3,
      paddingLeft: 20,
      borderRadius:10,
      margin: 5,
      borderColor: '#009688',
      backgroundColor: 'yellow',
    },
    container2:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    txt:{
      paddingLeft:100,
      fontSize:22,
      fontWeight:'bold'
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
    modalContent: {
      backgroundColor: 'white',
      padding: 22,
      justifyContent: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      height:450,
      width:360,
      alignSelf:'center'
    },
    note: {
      position:'relative',
      padding:20,
      paddingRight:100,
      borderBottomWidth:2,
      borderBottomColor:'#bdb76b',    
    },
    btnText:{
      color: 'white'
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
});

export default Tablesscreen;