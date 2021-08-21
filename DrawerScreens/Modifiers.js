// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, {useState, useEffect,Component} from 'react';
       
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

const Modifiers = ({navigation}) => 
{  
  const [isModalVisible, setModalVisible] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const toggleModalVisibility = () => {
		setModalVisible(!isModalVisible);
    };
  const [count, setCount] = React.useState(0);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [menuitem, setMenuitems] = useState([]);

  const [listData, setListData] = useState([]);

    const item=()=>{
      Alert.alert('hi')
    }


    useEffect(() => {       
            
      const unsubscribe = navigation.addListener('focus', () => {
        fetch('http://testweb.izaap.in/moop/api/index.php/service/modifiers/lists?X-API-KEY=MoopApp2021@!&user_id=251',{
          method: 'GET'
          //Request Type 
          })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            return responseJson.data;
          })
          .then( data  => {
                setListData(data);   
                if(data != undefined){     
                    data.map((item, index)=>{  
                      
                    //const obj = JSON.parse(item.menujson);      
                    //obj.map((objitem, index)=>{       
                //})       
                })
              }
              else{
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

  const getModifierDetail = (rowMap, rowKey, data) => {
    console.log('Order Get Detail - Delete **-', data.item.id)
    console.log('Order Key', rowKey)
    navigation.navigate('AddModifierStack',{
        screen: 'AddModifier', 
        params: {data: data, operation: 'update'},
    });
  }


  const deleteItems = (rowMap, rowKey, data) => { 
    console.log('RowKey delete item**-',data.item.id)
    closeItem(rowMap, rowKey);
    const newData = [...listData];    
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    console.log(rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);    
    deleteModifier(data);
  };


  const deleteModifier = (data) => {      
    console.log('Delete Modifier',data.item.id);
    let dataToSend = {modifier_id: data.item.id};
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch(`http://testweb.izaap.in/moop/api/index.php/service/modifiers/remove?X-API-KEY=MoopApp2021@!&modifier_id=${data.item.id}`, {
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
          if(responseJson.message === 'No Modifiers Found!')
          {
            Alert.alert('Modifier Deleted Successfully')
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


  const renderHiddenItem = (data, rowMap) => {
    console.log("renderHiddenItem", data.item.id);
    console.log(rowMap, data);
    return(
    <View style={styles.rowBack}>
      <TouchableOpacity style={[styles.actionButton, styles.closeBtn]} onPress={() =>{getModifierDetail(rowMap, data.item.key, data)}}>      
        <Text style={styles.btnText}>Update</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.actionButton, styles.deleteBtn]} onPress={() => {
        
        Alert.alert(
          'Alert',
          'Are you sure you want to delete ?',
          [
            {text:'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text:'Yes', onPress: ()=> {
              deleteItems(rowMap, data.item.key, data);
            }}
          ],
          { cancelable: true}
        );
        }
      }>
        <Text style={styles.btnText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}


  const ItemView = ({item}) => 
  {  
    let modifierGroupName="",modifierName="", modifierPrice="", minRequired="", maxAllowed=""; 
    try{   
        modifierGroupName=item.modifier_group_name;
        modifierName=item.modifier_name;
        modifierPrice=item.modifier_price;
        minRequired=item.min_required;
        maxAllowed=item.max_allowed;
      // obj.map((objitem, index)=>{
      //   modifierGroupName=objitem.modifierGroupName;
      //   modifierName=objitem.modifierName;
      //   modifierPrice=item.modifierPrice;
      //   })       
    } catch(e) { console.error(e); } 
  
    

    return (      
        <View>
          <Card style={{width: '95%', padding: 10, margin: 10, backgroundColor:'#F6FAFE'}}>
          <TouchableOpacity onPress={() => getItem(item)} >
            <Text style={styles.itemStyle}>{"Modifier Group Name :"+ modifierGroupName}</Text>  
            <Text style={styles.itemStyle}>{"Modifier Name :"+ modifierName }</Text>
            <Text style={styles.itemStyle}>{"Modifier Price :"+ modifierPrice }</Text>
            <Text style={styles.itemStyle}>{"Minimum Required :"+ minRequired }</Text>
            <Text style={styles.itemStyle}>{"Maximum Allowed :"+ maxAllowed }</Text>
          </TouchableOpacity>
          </Card>
        </View>
    );
  };

  const ItemSeparatorView = () => 
  {
    return (
      // Flat List Item Separator
      <View style={{height: 0,width: '100%',backgroundColor: '#C8C8C8'}}/> 
    );
  };

  const getItem=(item)=>
  {
    Alert.alert('Id : ' + item.id + '\n'+'Title : ' + item.title);
  };


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
              Modifiers
          </Text>
          </View>
          <SwipeListView
            data={listData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={ItemView}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={75}
            rightOpenValue={-150}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowDidOpen={onItemOpen}  
            disableRightSwipe={true}           
          />
        </View>

      <TouchableOpacity style={styles.addButton} onPress={() =>navigation.navigate('AddModifierStack',{Screen:'AddModifier', params: {operation:'add'}})}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
    },
    itemStyle: {
      padding: 10,
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
    container2:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    txt:{
      //paddingLeft:100,
      fontSize:22,
      fontWeight:'bold',    
    },
    headerView:{    
      alignItems: 'center',    
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
      right: 80,      
    },
    btnText: {
      color: '#FFF',
      textShadowColor: 'white',    
    },
    deleteBtn: {
      backgroundColor: 'red',
      right: 10,
    },
});

export default Modifiers;