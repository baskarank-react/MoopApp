import React, { Component } from 'react';
 
import { StyleSheet, Alert, View, Button, Picker,Text,TextInput,TouchableOpacity,Modal} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
 
export default class AddModifierGroup extends Component{
 
  constructor(props){ 
    super(props); 
    var modifierGroupNameInfo;
    var minRequiredInfo;  
    var maxAllowedInfo; 
    var modifier_group_idInfo;   

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

  componentWillMount(){
    
    this.props.navigation.addListener('focus', () => {
      console.log("componentWillMount") 
      this.oper = this.props.route.params?.operation ?? 'add'
      if(this.oper === "update")
      {
        console.log("update")
        this.modifier_group_idInfo = this.props.route.params?.data.item.id ?? 'defaultValue';
        this.modifierGroupNameInfo = this.props.route.params?.data.item.modifier_group_name ?? '0';
        this.minRequiredInfo = this.props.route.params?.data.item.min_required ?? 'Enter Table No';
        this.maxAllowedInfo = this.props.route.params?.data.item.max_allowed ?? 'Special Instruction';        

        this.setState({modifier_group_id: this.modifier_group_idInfo}); 
        this.setState({modifierGroupName: this.modifierGroupNameInfo});
        this.setState({minRequired: this.minRequiredInfo});
        this.setState({maxAllowed: this.maxAllowedInfo});        
        }
        else{
          console.log("add")
          this.setState({modifier_group_idInfo: ''}); 
          this.setState({modifierGroupName: ''});
          this.setState({minRequiredInfo: ''});
          this.setState({maxAllowedInfo: ''});
          
        }
    });    
  }

  componentDidMount() {        
    this.props.navigation.addListener('focus', () => {
      console.log("componentDidMount")   
      console.log("data1", this.modifier_group_idInfo)
      console.log("data1", this.minRequired)
      console.log("data1", this.maxAllowed)
      console.log("data1", this.modifierGroupName)
     
    });
    //this.fetchData();     
  }

 
  GetSelectedPickerItem=()=>{ 
    Alert.alert(this.state.PickerValueHolder);
  }

  state = {  
    isVisible: true, //state of modal default false  
    modifierGroupName: '',
    minRequired:'',  
    maxAllowed:'', 
    modifier_group_id:'',   
  }  
  buttonClickListener = () =>{
    const { TextInputValue }  = this.state;       
    const {TextInputValue1} = this.state;
}

addOrder =()=>{
  //console.log('AddLabel'+ this.state.labelName)
  console.log("Operation", this.oper)
  if(this.oper === "add")
  {
      console.log("Add Operation")
      var dataToSend = {
        user_id:251,
        rest_id:3,
        modifier_group_name:this.state.modifierGroupName,
        min_required:this.state.minRequired,
        max_allowed:this.state.maxAllowed,
      };
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
    
      fetch('http://testweb.izaap.in/moop/api/index.php/service/modifier_group/add?X-API-KEY=MoopApp2021@!&', {
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
            Alert.alert('Modifier Group has been Added successfully');
            console.log('Modifier Group has been Added successfully');
            this.props.navigation.navigate('ModifierGroupStack',{Screen:'ModifierGroup'})
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
    var dataToSend = {
      user_id:251,
      rest_id:3,
      modifier_group_name:this.state.modifierGroupName,
      min_required:this.state.minRequired,
      max_allowed:this.state.maxAllowed,
      modifier_id:this.state.modifier_group_id,
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
  
    fetch('http://testweb.izaap.in/moop/api/index.php/service/modifier_group/update?X-API-KEY=MoopApp2021@!&', {
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
          Alert.alert('Modifier Group has been Updated successfully');
          console.log('Modifier Group has been Updated successfully');
          this.props.navigation.navigate('ModifierGroupStack',{Screen:'ModifierGroup'})
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
                    <Text style={{  flex: 1, padding: 5, fontSize:18, fontWeight:'bold'}}>
                    {'Modifier Group Name'}
                    </Text>   
                    <TextInput
                        placeholder='Modifier Group Name'
                        placeholderTextColor='#303030'
                        onChangeText={(modifierGroupName) => this.setState({ modifierGroupName })}
                        value={this.state.modifierGroupName}
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
                    <Text style={{  flex: 1, padding: 5, fontSize:18, fontWeight:'bold'}}>
                    {'Minimum Required'}
                    </Text>   
                    <TextInput
                        placeholder='Minimum Required'
                        keyboardType='numeric'
                        placeholderTextColor='#303030'
                        onChangeText={(minRequired) => this.setState({ minRequired })}
                        value={this.state.minRequired}
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

              <View style={{flexDirection: 'row',top:20}}>
                    <Text style={{  flex: 1, padding: 5, fontSize:18, fontWeight:'bold'}}>
                    {'Maximum Allowed'}
                    </Text>   
                    <TextInput
                        placeholder='Maximum Allowed'
                        keyboardType='numeric'
                        placeholderTextColor='#303030'
                        onChangeText={(maxAllowed) => this.setState({ maxAllowed })}
                        value={this.state.maxAllowed}
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
                   
        </View>

        
            <TouchableOpacity style={styles.btn1}>
                <Text style={styles.btnTxt} onPress = {this.addOrder}>Add/Update ModifierGroup</Text>
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
 
