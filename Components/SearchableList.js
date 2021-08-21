
import React, { Component } from "react";
import { View, Text,StyleSheet, FlatList,TouchableHighlight,TouchableOpacity, Image,Alert, Button } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer  } from 'react-navigation';
import OrderDetail from './OrderDetail'
import AsyncStorage from '@react-native-community/async-storage';  
import Modal from 'react-native-modal'; 
import { Item } from "native-base";
import AddOrder from './AddOrder'
import { useNavigation } from '@react-navigation/native';


class FlatListDemo extends Component {
 
  constructor(props) {
    super(props);

 this.render=this.render.bind(this);
    this.state = {
      enable: true,
      loading: false,
      data: [],
      error: null,
      arrayholder : [],
      username: '',  
      visibleModal: null,
    }
    
  };

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

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
   // const fetchtype = AsyncStorage.getItem('fetchtype'); 
    console.log("fetchtype");
    const response = await fetch("https://randomuser.me/api?results=500");
    const json = await response.json();
    this.setState({
       data: json.results ,
       arrayholder:json.results,
    });
  };

  
  searchFilterFunction = text => {
    this.setState({
      value: text,
    });
      const newData = this.state.arrayholder.filter(item => {
      const itemData = `${item.name.first.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };
   swipeBtns =id =>  [{
    text: 'Delete',
    backgroundColor: 'red',
    underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
    onPress: () => { 
      const filteredData = this.state.data.filter(item => item.id !== id);
      this.setState({ data: filteredData }); }
  }];

  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={{fontSize : 20 ,marginTop:20}}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );
  _renderModalContent = () => (
    <View style={styles.modalContent}>
          <View style={{ flex: 1}}>  
                <View > 
                <Text style={{fontSize : 30,textAlign:'center',marginTop:20}}>ORDER</Text>  
                </View>
                <Text style={{fontSize : 20 ,marginTop:20}}>Date and Time :__18.03.2021__</Text>  
                <Text style={{fontSize : 20 ,marginTop:20}}>Created By    :__XXXXXXXXXX__</Text>  
                <Text style={{fontSize : 20 ,marginTop:20}}>Table No       :___4______ </Text>  
                <Text style={{fontSize : 20 ,marginTop:20}}>Status         :___gdfgdfgdfg___</Text>  
                <Text style={{fontSize : 20 ,marginTop:20}}>Special ins    :____aaaaaa____ </Text>  
                <Text style={{fontSize : 20 ,marginTop:20,marginBottom:20}}>Items and Prices </Text>
            </View>  
      {this._renderButton('Close', () => this.setState({ visibleModal: null }))}
    </View>
  );    

  render() {
  
    const navigation = useNavigation();

    return (
      <View style={{ flex: 1 }}>


      <SearchBar
          placeholder="Type Here..."
          lightTheme
          round
          onChangeText={text => this.searchFilterFunction(text)}
          autoCorrect={false}
          value={this.state.value}
      />
      <FlatList
          data={this.state.data}
          keyExtractor={(x, i) => i.toString()}
          renderItem={({ item }) => 
          <Swipeout right={this.swipeBtns(item.id)}
          autoClose='true'
          backgroundColor= 'transparent'>
         <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() => 
           {
             this.setState({ visibleModal: 1 })
           }
          }>
           <View style={styles.container}>
            <View style={styles.container_text}>
           
            <Image source={{ uri: `${item.picture.thumbnail}` }} style={styles.photo} />
  
           <Text style={styles.title}>
               {`${item.name.first} ${item.name.last}`}
           </Text>
           <Text style={styles.description}>
               {"description"}
           </Text>
       </View>
       <Icon  style={{ paddingLeft: 10 }}  name="md-person-add"  onPress={() => {navigation.navigate('OrderDetail')}} size={30}  />  
      </View>
      </TouchableHighlight>
      </Swipeout>
       
       }
      />
       <Modal isVisible={this.state.visibleModal === 1}>
       {this._renderModalContent()}
     </Modal>
    </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'row',
      padding: 10,
      marginLeft:16,
      marginRight:16,
      marginTop: 8,
      marginBottom: 8,
      borderRadius: 5,
      backgroundColor: '#FFF',
      elevation: 2,
  },
  contextcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    backgroundColor: '#ecf0f1',
  },
  title: {
      fontSize: 16,
      color: '#000',
  },
  container_text: {
      flex: 1,
      flexDirection: 'column',
      marginLeft: 12,
      justifyContent: 'center',
  },
  description: {
      fontSize: 11,
      fontStyle: 'italic',
  },
  photo: {
      height: 50,
      width: 50,
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
});




export default  FlatListDemo;


