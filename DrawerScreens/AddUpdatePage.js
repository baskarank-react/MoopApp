import React, { Component } from 'react';
 
import { StyleSheet, Alert, View, Button, Picker,Text,TextInput,TouchableOpacity,Modal} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
 

export default class AddUpdatePage extends Component{
 
  static navigationOptions = ({ navigation }) => {
    navigation.route.navigationOptions ={
      title: 'Add/Update', //Set Header Title
      
    }
  
  };
  
  constructor(props){ 
    super(props); 
    var data1;

    var orderId;
    var tableId;
    var specialInstruction;
    var comments;
    var oper;

    //const { navigation } = this.props;  
    this.state = {
      data:''
    }
    this.state = {user_id: ''}
    this.state = {order_id: ''}
    this.state = {table_id: ''}
    this.state = {special_instruction: ''}
    this.state = {comments_txt: ''}
    this.state = {operation: ''}

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
        this.data1 = this.props.route.params?.data.item.id ?? 'defaultValue';
        this.orderId = this.props.route.params?.data.item.id ?? '0';
        this.tableId = this.props.route.params?.data.item.tableid ?? 'Enter Table No';
        this.specialInstruction = this.props.route.params?.data.item.special_instruction ?? 'Special Instruction';
        this.comments = this.props.route.params?.data.item.comments;

        this.setState({data: this.data1}); 
        this.setState({order_id: this.orderId});
        this.setState({table_id: this.tableId});
        this.setState({special_instruction: this.specialInstruction});
        this.setState({comments_txt: this.comments});
        }
        else{
          console.log("add")
          this.setState({data: ''}); 
          this.setState({order_id: ''});
          this.setState({table_id: ''});
          this.setState({special_instruction: ''});
          this.setState({comments_txt: ''});
        }
    });    
  }

  componentDidMount() {        
    this.props.navigation.addListener('focus', () => {
      console.log("componentDidMount")   
      console.log("data1", this.data1)
      console.log("data1", this.orderId)
      console.log("data1", this.tableId)
      console.log("data1", this.specialInstruction)
      console.log("data1", this.comments)
    });
    //this.fetchData();     
  }


  fetchData = async () => {
    console.log("Fetch Data -", this.state.order_id)     
    fetch(`http://testweb.izaap.in/moop/api/index.php/service/orders/view?X-API-KEY=MoopApp2021@!&order_id=${this.state.order_id}`,{
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
              console.log('OrderDetails',data);
              if(data != undefined){ 
                     // data.map((item, index)=>{                          
                      //const obj = JSON.parse(item.menujson);      
                  //     obj.map((objitem, index)=>{       
                  // })       
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
  }
 
  GetSelectedPickerItem=()=>{ 
    Alert.alert(this.state.PickerValueHolder);
  }

  state = {  
    isVisible: true, //state of modal default false  
    // specialIns: '',
    // tableNo:'',
  }  
  buttonClickListener = () =>{
    const { TextInputValue }  = this.state ;
    //Alert.alert(TextInputValue);    
    const {TextInputValue1} = this.state;
}

addOrder =()=>{
  console.log("Operation", this.oper)
  if(this.oper === "add")
  {
      console.log("Add Operation")
      var dataToSend = {
        user_id:'251',
        rest_id:'3',
        table_id:this.state.table_id,
        seats:'3',
        menujson:[{}],
        paymentjson:[{}],
        amount:'500',
        paymentmode:'Apple',
        status:this.state.PickerValueHolder,
        transactionid:'1',
        transactiontag:'1',
        comments:this.state.comments_txt,
        orderjson:[{}],
        orderfee :'100',
        special_instruction:this.state.special_instruction,
        tip_amount:10,    
      };
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
    
      fetch('http://testweb.izaap.in/moop/api/index.php/service/orders/place?X-API-KEY=MoopApp2021@!', {
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
            Alert.alert('Order has been placed successfully');
            console.log('Order has been placed successfully');
            this.props.navigation.navigate('orderScreenStack',{Screen:'orderScreen'})
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

    console.log("OrderId -", this.state.order_id)
    var dataToSend = {
      user_id:'251',
      rest_id:'3',
      table_id:this.state.table_id,
      seats:'3',
      menujson:[{}],
      paymentjson:[{}],
      amount:'500',
      paymentmode:'Apple',
      status:this.state.PickerValueHolder,
      transactionid:'1',
      transactiontag:'1',
      comments:this.state.comments_txt,
      orderjson:[{}],
      orderfee :'100',
      special_instruction:this.state.special_instruction,
      tip_amount:10,  
      order_id:this.state.order_id  
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
  
    fetch('http://testweb.izaap.in/moop/api/index.php/service/orders/place?X-API-KEY=MoopApp2021@!', {
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
          Alert.alert('Order has been Updated successfully');
          console.log('Order has been Updated successfully');
          this.props.navigation.navigate('orderScreenStack',{Screen:'orderScreen'})
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
               {'Table No :'}
             </Text>   
             <TextInput
                placeholder='Enter Table No'
                keyboardType="numeric"
                placeholderTextColor='#303030'
                onChangeText={(table_id) => this.setState({ table_id })}
                value={this.state.table_id}
                style={{
                 borderWidth: 3,
                 borderRadius:10,
                 borderColor: '#000',
                 flex: 1,
                 padding: 15,
                 right:70,
                 width:100,
                 height:50   
                }}/>
          </View>
      
        <View style={{height: 30}}/>

        <View style={{flexDirection:'row',}}>
          <Text style={{fontSize:18,left:10,top:10,fontWeight:'bold'}}>
            Special Instructions
          </Text>
          <TextInput
              placeholder='Enter Instructions Here '
                placeholderTextColor='#303030'                
                onChangeText={(special_instruction) => this.setState({ special_instruction })}
                value={this.state.special_instruction}
                style={{
                  borderWidth: 2,
                  borderRadius:10,
                  flexDirection:'row',
                  borderColor: '#000',
                  padding: 15,
                  width:300,
                  height:100,
                  right:160,
                  top:60,
                  fontWeight:'bold',
                  fontSize:18,                  
                }}
                />
        </View>

    <View>
    <TouchableOpacity style={styles.btn} onPress = {() => {this.setState({ isVisible: true})}}>

    <Text style={styles.btnTxt}>AddItem</Text>
    </TouchableOpacity>

    </View>
    <View style={styles.MainContainer}>

    <Text style={{fontSize:20}}>ITEM:{this.state.TextInputValue}</Text>
    <Text style={{fontSize:20,top:10}}>PRICE: ${this.state.TextInputValue1}</Text>

    </View>

    <TouchableOpacity style={styles.btn1}>
        <Text style={styles.btnTxt} onPress = {this.addOrder}>Add/Update</Text>
    </TouchableOpacity>

    <View style = {styles.conta}>  
        <Modal animationType = {"fade"} transparent = {true} visible = {this.state.isVisible}  
          onRequestClose = {() =>{ console.log("Modal has been closed.") } }>  
              <View style = {styles.modal}>  
                <Text style = {styles.text}>ADD ITEM PRICE</Text> 
                <TextInput 
                  style={{height:40,width:200,borderWidth:1,bottom:20,borderRadius:10}}
                  onChangeText={TextInputValue => this.setState({TextInputValue})}
                  placeholder="Item">
                </TextInput>

                <TextInput 
                    style={{height:40,width:200,borderWidth:1,bottom:10,borderRadius:10}}
                    onChangeText={TextInputValue1 => this.setState({TextInputValue1})}
                    placeholder="Price">
                </TextInput>

                <Button 
                    style={styles.bu} title="ADD" onPress = {() => {this.setState({ isVisible:!this.state.isVisible})}}                 
                />  
              </View>  
        </Modal>  

        </View>
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
 
