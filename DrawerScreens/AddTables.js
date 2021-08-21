import React, { Component } from 'react';
 
import { StyleSheet, Alert, View, Button, Picker,Text,TextInput,TouchableOpacity,Modal} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
 
export default class AddTables extends Component
{
  constructor(props){ 
    super(props); 
    var tableInfo;
    var seatInfo;
    var tableIdInfo;

    this.state={ 
      PickerValueHolder : '' 
    }
    this.state = {
      TextInputValue: ''
    }
    this.state = {
      TextInputValue1: '',      
    }    
  }
 
  componentWillMount()
  {
    this.props.navigation.addListener('focus', () => {
      console.log("componentWillMount") 
      this.oper = this.props.route.params?.operation ?? 'add'
      if(this.oper === "update")
      {
        console.log("update")
        
        this.tableIdInfo = this.props.route.params?.data.item.id ?? '0';
        this.tableInfo = this.props.route.params?.data.item.tablename ?? 'Table Name';
        this.seatInfo = this.props.route.params?.data.item.seats ?? 'Seats';
                
        this.setState({table_id: this.tableIdInfo});        
        this.setState({seats: this.seatInfo});
        this.setState({name: this.tableInfo});
        }
        else{
          console.log("add")
          this.setState({table_id: ''}); 
          this.setState({name: ''});
          this.setState({seats: ''});
        }
    });    
  }

  componentDidMount() {        
    this.props.navigation.addListener('focus', () => {
      console.log("componentDidMount")   
      console.log("data1", this.tableInfo)
      console.log("data1", this.seatInfo)
      console.log("data1", this.tableIdInfo)      
    });
    //this.fetchData();     
  }
  
  GetSelectedPickerItem=()=>{ 
    Alert.alert(this.state.PickerValueHolder);
  }

  state = {  
    isVisible: true, //state of modal default false  
    name: '',
    seats:'',
    table_id:'',
  }  
  buttonClickListener = () =>{
    const { TextInputValue }  = this.state;       
    const {TextInputValue1} = this.state;
}

addOrder =()=>{
  console.log("Add Operation", this.oper)
  if(this.oper === "add")
  {
    console.log('AddMenuType'+ this.state.tableNo)
    var dataToSend = {
      user_id:251,
      rest_id:3,
      seats:this.state.seats,
      status:0,
      isavailable:'yes',
      seatsbooked:'0',
      name:this.state.name,
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    console.log(formBody)
      fetch('http://testweb.izaap.in/moop/api/index.php/service/tables/add?X-API-KEY=MoopApp2021@!', {
        method: 'POST',
        body: formBody,
        headers: {
          //Header Defination
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        //setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status == "success") {
          Alert.alert('Table has been Added successfully');
          console.log('Table has been Added successfully');
          this.props.navigation.navigate('tablesStack',{Screen:'Tables'})
        } else {
          setErrortext('Error');
        }
      })
      .catch((error) => {
        //Hide Loader
        //setLoading(false);
        console.error(error);
      });
  }
  else{
    console.log('Update Operation')
    var dataToSend = {
      user_id:251,
      rest_id:3,
      seats:this.state.seats,
      status:0,
      isavailable:'yes',
      seatsbooked:'0',
      name:this.state.name,
      table_id:this.state.table_id
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    console.log(formBody)
      fetch('http://testweb.izaap.in/moop/api/index.php/service/tables/update?X-API-KEY=MoopApp2021@!', {
        method: 'POST',
        body: formBody,
        headers: {
          //Header Defination
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        //setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status == "success") {
          Alert.alert('Table has been Updated successfully');
          console.log('Table has been Updated successfully');
          this.props.navigation.navigate('tablesStack',{Screen:'Tables'})
        } else {
          setErrortext('Error');
        }
      })
      .catch((error) => {
        //Hide Loader
        //setLoading(false);
        console.error(error);
      });
  }
}

 render() {
   return (
        <View style={styles.container}>
        <View>
        <ScrollView> 
              <View style={{flexDirection: 'row',top:20}}>
                    <Text style={{  flex: 1, padding: 10, fontSize:18, fontWeight:'bold'}}>
                    {'Name'}
                    </Text>   
                    <TextInput
                        placeholder='Name'
                        placeholderTextColor='#303030'
                        onChangeText={(name) => this.setState({ name })}
                        value={this.state.name}
                        style={{
                        borderWidth: 1,
                        borderRadius:10,
                        borderColor: '#000',
                        flex: 1,
                        padding: 15,
                        //right:70,
                        width:100,
                        height:50   
                        }}
                    />
              </View>

              <View style={{height: 10}} />

              <View style={{flexDirection: 'row',top:20}}>
                    <Text style={{  flex: 1, padding: 10, fontSize:18, fontWeight:'bold'}}>
                    {'Seats'}
                    </Text>   
                    <TextInput
                        placeholder='Seats'
                        keyboardType='numeric'
                        placeholderTextColor='#303030'
                        onChangeText={(seats) => this.setState({ seats })}
                        value={this.state.seats}
                        style={{
                        borderWidth: 1,
                        borderRadius:10,
                        borderColor: '#000',
                        flex: 1,
                        padding: 15,
                        //right:70,
                        width:100,
                        height:50   
                        }}
                    />
              </View>

              <View style={{height: 10}} />

              <View style={{flexirection:'row', top:35}}>                         
        </View>

        
            <TouchableOpacity style={styles.btn1}>
                <Text style={styles.btnTxt} onPress = {this.addOrder}>Add/Update Table</Text>
            </TouchableOpacity>
            </ScrollView>
            </View>

	    </View>
    );
   }
  }        
 

 
const styles = StyleSheet.create({ 
  MainContainer: 
  {
    top:20,
     width:250,
    height:120,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius:10,
    borderColor: 'black',
    left:50,
    marginTop: (Platform.OS === 'ios') ? 20 : 0
  },
 container: {
  flex: 1,
  alignItems: 'center',
  backgroundColor: 'white',
  //marginTop: 10,
  marginRight:1, 
},
btn1:{
  height:40,
  width:250,    
  fontWeight:'bold',        
  borderWidth:2,
  borderRadius:10,
  marginLeft:50,
  bottom:20,
  marginTop:100,
  justifyContent:'center',
  alignItems:'center',
},
btnTxt:{
color:'black',
fontWeight:'bold',
fontSize:20,
},
btn:{
    height:40,
    width:120,            
    borderWidth:2,
    borderRadius:80,
    fontWeight:'bold',        
    marginLeft:100,
    marginTop:90,
    justifyContent:'center',
    alignItems:'center',
},
conta: {  
  alignItems: 'center',  
  justifyContent: 'center',  
  backgroundColor: '#ecf0f1',  
},  
modal: {  
justifyContent: 'center',  
alignItems: 'center',   
backgroundColor : "#00BCD4",   
height: 250 ,  
width: '70%',  
borderRadius:10,  
borderWidth: 2,  
borderColor: '#fff',    
marginTop: 80,  
marginLeft: 40,  
top:50, 
 },  
 text: {  
    color: '#3f2949',  
    marginTop: 10 ,
    bottom:30,
    fontSize:20,    
   } ,
});
 
