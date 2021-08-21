import React, { useState } from 'react';

import { StyleSheet, Text, TouchableOpacity, TouchableHighlight, View, Modal,Dimensions, Alert} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';

const { width } = Dimensions.get("window");


export default function Basic({navigation}) {

  const [isModalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
    };

  const [listData, setListData] = useState(

    Array(25).fill('').map((_, i) => ({ key: `${i}`, text: `Item ${++i}` }))

  );


  const closeItem = (rowMap, rowKey) => {

    if (rowMap[rowKey]) {

      rowMap[rowKey].closeRow();

    }

  };


  const deleteItem = (rowMap, rowKey) => {

    closeItem(rowMap, rowKey);

    const newData = [...listData];

    const prevIndex = listData.findIndex(item => item.key === rowKey);

    newData.splice(prevIndex, 1);

    setListData(newData);

  };


  const onItemOpen = rowKey => {

    console.log('This row opened', rowKey);

  };

  
  const renderItem = data => (

    <TouchableHighlight

      onPress={() =>{toggleModalVisibility}}

      style={styles.rowFront}

      underlayColor={'#fff'}
>

      <View>

        <Text style={styles.list} onPress={toggleModalVisibility}>This Is {data.item.text} Of Swipe List View</Text>
        <Modal
        transparent visible={isModalVisible}
        animationType='none'
        transparent={true}
        >
        <View style={styles.viewWrapper}>
          <View style={styles.modalView}>
          <Text style={{fontSize:30}}>Orders</Text>
          <Text style={{fontSize:20}}>Date and Time: 29.04.2021</Text>
          <Text style={{fontSize:20,right:20}}>Created By: Baskarank</Text>
          <Text style={{fontSize:20,right:55}}>Table No: 1001</Text>
          <Text style={{fontSize:20,right:10}}>Status: Completed </Text>
          <Text style={{fontSize:20}}>Speicial Instructions: xxxxx</Text>
          <View style={{borderWidth: 3,
              borderRadius:10,
              borderColor: '#000',
              padding: 15,
              width:200,
              height:110,
              bottom:20,
              top:8}}>
            <Text style={styles.itmtxt}>Item1: $100</Text>
            <Text style={styles.itmtxt}>Item2: $200</Text>
            <Text style={styles.itmtxt}>Item3: $300</Text>

          </View>
            <TouchableOpacity style={{top:15,borderWidth:4,borderRadius:10,width:100,backgroundColor:'#307ecc'}} onPress={toggleModalVisibility}>
              <Text style={{fontSize:20,left:30}}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </View>

    </TouchableHighlight>

  );


  const renderHiddenItem = (data, rowMap) => (

    <View style={styles.rowBack}>


      <TouchableOpacity

        style={[styles.actionButton, styles.closeBtn]}

         onPress={() =>navigation.navigate('AddUpdatePageStack',{Screen:'AddUpdatePage'})}>
      
        <Text style={styles.btnText}>Update</Text>

      </TouchableOpacity>

      <TouchableOpacity

        style={[styles.actionButton, styles.deleteBtn]}

        onPress={() => deleteItem(rowMap, data.item.key)}

      >

        <Text style={styles.btnText}>Delete</Text>

      </TouchableOpacity>


     

    </View>

  );


  return (

    <View style={styles.container}>

      <SwipeListView

        data={listData}

        renderItem={renderItem}

        renderHiddenItem={renderHiddenItem}

        leftOpenValue={75}

        rightOpenValue={-150}

        previewRowKey={'0'}

        previewOpenValue={-40}

        previewOpenDelay={3000}

        onRowDidOpen={onItemOpen}

      />
 <TouchableOpacity style={styles.addButton}
                    onPress={() =>navigation.navigate('AddUpdatePageStack',{Screen:'AddUpdatePage'})}>
                    <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
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
  },

  rowFront: {
    alignItems: 'center',
    backgroundColor: 'lightcoral',
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    height: 50,
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
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },

  closeBtn: {
    backgroundColor: 'blue',
    right: 75,
  },

  deleteBtn: {
    backgroundColor: 'red',
    right: 0,
  },
  addButton:{
    position:'absolute',
    zIndex:11,
    right:20,
    bottom:50,
    backgroundColor:'grey',
    width:60,
    height:60,
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center',
    elevation:8,
      
  },
  addButtonText:{
    fontSize: 30,  
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
});

