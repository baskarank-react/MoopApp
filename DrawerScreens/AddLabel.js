import React, { Component } from 'react';
 
import { StyleSheet, Alert, View, Button, Picker,Text,TextInput,TouchableOpacity,Modal} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
 

export default class AddLabel extends Component{
 
  constructor(props){ 
    super(props);
    var labelNameInfo;
    var printerNameInfo;
    var labelIdInfo;    
    
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
 
  GetSelectedPickerItem=()=>{ 
    Alert.alert(this.state.PickerValueHolder);
  }

  componentWillMount(){
    
    this.props.navigation.addListener('focus', () => {
      console.log("componentWillMount") 
      this.oper = this.props.route.params?.operation ?? 'add'
      if(this.oper === "update")
      {
        console.log("update")
        this.labelIdInfo = this.props.route.params?.data.item.id ?? 'labelinfo';
        this.labelNameInfo = this.props.route.params?.data.item.name ?? 'labelname';
        this.printerNameInfo = this.props.route.params?.data.item.printer_name ?? 'printer name';
        

        this.setState({labelId: this.labelIdInfo}); 
        this.setState({labelName: this.labelNameInfo});
        this.setState({printerName: this.printerNameInfo});
       
        }
        else{
          console.log("add")
          this.setState({labelId: ''}); 
          this.setState({labelName: ''});
          this.setState({printerName: ''});
          
        }
    });    
  }

  componentDidMount() {        
    this.props.navigation.addListener('focus', () => {
      console.log("componentDidMount")   
      console.log("data1", this.labelIdInfo)
      console.log("data1", this.labelNameInfo)
      console.log("data1", this.printerNameInfo)
      
    });
    //this.fetchData();     
  }


  state = {  
    isVisible: true, //state of modal default false  
    labelName: '',
    printerName:'',    
    labelId:'',  
  }  
  buttonClickListener = () =>{
    const { TextInputValue }  = this.state;       
    const {TextInputValue1} = this.state;
}

addOrder =()=>{
  console.log("Operation", this.oper)
  if(this.oper === "add")
  {
      console.log("Add Operation")
      //console.log('AddLabel'+ this.state.labelName)
  var dataToSend = {
    name:this.state.labelName,
    printer_name:this.state.printerName 
  };
  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');

  fetch('http://testweb.izaap.in/moop/api/index.php/service/labels/add?X-API-KEY=MoopApp2021@!', {
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
        Alert.alert('Label has been Added successfully');
        console.log('Label has been Added successfully');
        this.props.navigation.navigate('LabelsStack',{Screen:'Labels'})
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
    console.log("Update Operation")
    //console.log('AddLabel'+ this.state.labelName)
  var dataToSend = {
    name:this.state.labelName,
    printer_name:this.state.printerName,
    label_id:this.state.labelId,
  };
  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');

  fetch('http://testweb.izaap.in/moop/api/index.php/service/labels/update?X-API-KEY=MoopApp2021@!', {
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
        Alert.alert('Label has been Updated successfully');
        console.log('Label has been Updated successfully');
        this.props.navigation.navigate('LabelsStack',{Screen:'Labels'})
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
                    {'Label Name'}
                    </Text>   
                    <TextInput
                        placeholder='Label Name'
                        placeholderTextColor='#303030'
                        onChangeText={(labelName) => this.setState({ labelName })}
                        value={this.state.labelName}
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
                    {'Printer Name'}
                    </Text>   
                    <TextInput
                        placeholder='Printer Name'
                        placeholderTextColor='#303030'
                        onChangeText={(printerName) => this.setState({ printerName })}
                        value={this.state.printerName}
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


              <View style={{flexirection:'row', top:20, alignContent: 'center'}}>                         
        </View>

        
            <TouchableOpacity style={styles.btn1}>
                <Text style={styles.btnTxt} onPress = {this.addOrder}>Add/Update Label</Text>
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
 
