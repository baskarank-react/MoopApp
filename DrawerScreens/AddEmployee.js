import React, { Component } from 'react';
 
import { StyleSheet, Alert, View, Button, Picker,Text,TextInput,TouchableOpacity,Modal} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';



export default class AddEmployee extends Component{
 
  constructor(props){ 
    
    var emailInfo;
    var passwordInfo;
    var first_nameInfo;
    var last_nameInfo;
    var bioInfo;
    var genderInfo;
    var addressInfo;
    var countryInfo;
    var titleInfo;
    var stateInfo;
    var cityInfo;
    var zipInfo;
    var phoneInfo;
    var roleInfo;
    var employeeIdInfo

    super(props); 
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
        this.employeeIdInfo = this.props.route.params?.data.item.id ?? '0';
        this.emailInfo = this.props.route.params?.data.item.email ?? 'Email';
        this.passwordInfo = this.props.route.params?.data.item.password ?? 'Password';
        this.first_nameInfo = this.props.route.params?.data.item.first_name ?? 'First Name';
        this.last_nameInfo = this.props.route.params?.data.item.last_name ?? 'Last Name';
        this.bioInfo = this.props.route.params?.data.item.bio ?? 'Bio';
        this.genderInfo = this.props.route.params?.data.item.gender ?? 'Gender';
        this.addressInfo = this.props.route.params?.data.item.address ?? 'Address';
        this.countryInfo = this.props.route.params?.data.item.country ?? 'Country';
        this.titleInfo = this.props.route.params?.data.item.title ?? 'Title';
        this.stateInfo = this.props.route.params?.data.item.state ?? 'State';
        this.cityInfo = this.props.route.params?.data.item.city ?? 'City';
        this.zipInfo = this.props.route.params?.data.item.zip ?? 'Zip';
        this.phoneInfo = this.props.route.params?.data.item.role ?? 'Phone';
        this.roleInfo = this.props.route.params?.data.item.phone ?? 'Role';


        this.setState({employee_id: this.employeeIdInfo}); 
        this.setState({email: this.emailInfo});
        this.setState({password: this.passwordInfo});
        this.setState({first_name: this.first_nameInfo});
        this.setState({last_name: this.last_nameInfo});
        this.setState({bio: this.bioInfo});
        this.setState({gender: this.genderInfo});
        this.setState({address: this.addressInfo});
        this.setState({country: this.countryInfo});
        this.setState({title: this.titleInfo});
        this.setState({state: this.stateInfo});
        this.setState({city: this.cityInfo});
        this.setState({zip: this.zipInfo});
        this.setState({phone: this.phoneInfo});
        this.setState({role: this.roleInfo});
        }
        else{
          console.log("add")
          this.setState({employee_id: ''}); 
          this.setState({email: ''});
          this.setState({password: ''});
          this.setState({first_name: ''});
          this.setState({last_name: ''});
          this.setState({bio: ''});
          this.setState({gender: ''});
          this.setState({address: ''});
          this.setState({country: ''});
          this.setState({title: ''});
          this.setState({state: ''});
          this.setState({city: ''});
          this.setState({zip: ''});
          this.setState({phone: ''});
          this.setState({role: ''});
        }
    });    
  }

  componentDidMount() {        
    this.props.navigation.addListener('focus', () => {
      console.log("componentDidMount")   
      
    });
    //this.fetchData();     
  }

 
  GetSelectedPickerItem=()=>{ 
    Alert.alert(this.state.PickerValueHolder);
  }

  state = {  
    isVisible: true, //state of modal default false  
    email:'',
    password:'',
    confirm_password:'',
    first_name:'',
    last_name:'',
    bio:'',
    gender:'',
    address:'',
    country:'',
    title:'',
    states:'',
    city:'',
    zip:'',
    phone:'',
    role:'',
    employee_id:'',
  }  
  buttonClickListener = () =>{
    const { TextInputValue }  = this.state;       
    const {TextInputValue1} = this.state;
}

addOrder =()=>{
  
  if(this.oper === "add")
  {
      console.log("Add Operation")
      if(typeof this.state.email === 'undefined' || typeof this.state.password === 'undefined' || typeof this.state.first_name === 'undefined' || typeof this.state.last_name === 'undefined' || typeof this.state.bio === 'undefined' || typeof this.state.gender === 'undefined' || typeof this.state.address === 'undefined' || typeof this.state.country === 'undefined' || typeof this.state.title === 'undefined' || typeof this.state.states === 'undefined' || typeof this.state.city === 'undefined' || typeof this.state.zip === 'undefined' || typeof this.state.phone === 'undefined' || typeof this.state.role === 'undefined')
      {
          Alert.alert('Please Input Required Fields')
      }
      else
      {
        if(this.state.password === this.state.confirm_password){
    
            console.log('AddEmployee'+ this.state.email + "\n" + this.state.password + "\n" + this.state.first_name + "\n" + this.state.last_name + "\n" + this.state.bio + "\n" + this.state.gender + "\n" + this.state.address + "\n" + this.state.country + "\n" + this.state.title + "\n" + this.state.states + "\n" + this.state.city + "\n" + this.state.zip + "\n" + this.state.phone + "\n" + this.state.role)
            var dataToSend = {    
              email:this.state.email,
              password:this.state.password,
              first_name:this.state.first_name,
              last_name:this.state.last_name,
              bio:this.state.bio,
              gender:this.state.gender,
              address:this.state.address,
              country:this.state.country,
              title:this.state.title,
              state:this.state.states,
              city:this.state.city,
              zip:this.state.zip,
              phone:this.state.phone,
              role:this.state.role,
            };
            var formBody = [];
            for (var key in dataToSend) {
              var encodedKey = encodeURIComponent(key);
              var encodedValue = encodeURIComponent(dataToSend[key]);
              formBody.push(encodedKey + '=' + encodedValue);
            }
            formBody = formBody.join('&');
          
            fetch('http://139.59.65.210/moop/api/index.php/service/user/register', {
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
                  Alert.alert('Employee has been Added successfully');
                  console.log('Employee has been Added successfully');
                  this.props.navigation.navigate('employeeStack',{Screen:'Employee'})
                } else {
                  //setErrortext('Error');
                  Alert.alert(responseJson.message)
                }
              })
              .catch((error) => {
                //Hide Loader
                //setLoading(false);
                console.error(error);
                Alert.alert(responseJson.message)
              });  
          }
          else{
              Alert.alert("Password Mismatch")
          }
      }
  }
  else
  {
    console.log("Update Operation")
    if(typeof this.state.email === 'undefined' || typeof this.state.password === 'undefined' || typeof this.state.first_name === 'undefined' || typeof this.state.last_name === 'undefined' || typeof this.state.bio === 'undefined' || typeof this.state.gender === 'undefined' || typeof this.state.address === 'undefined' || typeof this.state.country === 'undefined' || typeof this.state.title === 'undefined' || typeof this.state.states === 'undefined' || typeof this.state.city === 'undefined' || typeof this.state.zip === 'undefined' || typeof this.state.phone === 'undefined' || typeof this.state.role === 'undefined')
    {
        Alert.alert('Please Input Required Fields')
    }
    else{
      if(this.state.password === this.state.confirm_password){
  
          console.log('AddEmployee'+ this.state.email + "\n" + this.state.password + "\n" + this.state.first_name + "\n" + this.state.last_name + "\n" + this.state.bio + "\n" + this.state.gender + "\n" + this.state.address + "\n" + this.state.country + "\n" + this.state.title + "\n" + this.state.states + "\n" + this.state.city + "\n" + this.state.zip + "\n" + this.state.phone + "\n" + this.state.role)
          var dataToSend = {    
            email:this.state.email,
            password:this.state.password,
            first_name:this.state.first_name,
            last_name:this.state.last_name,
            bio:this.state.bio,
            gender:this.state.gender,
            address:this.state.address,
            country:this.state.country,
            title:this.state.title,
            state:this.state.states,
            city:this.state.city,
            zip:this.state.zip,
            phone:this.state.phone,
            role:this.state.role,
          };
          var formBody = [];
          for (var key in dataToSend) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
          }
          formBody = formBody.join('&');
        
          fetch('http://139.59.65.210/moop/api/index.php/service/user/register', {
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
                Alert.alert('Employee has been Added successfully');
                console.log('Employee has been Added successfully');
                this.props.navigation.navigate('employeeStack',{Screen:'Employee'})
              } else {
                //setErrortext('Error');
                Alert.alert(responseJson.message)
              }
            })
            .catch((error) => {
              //Hide Loader
              //setLoading(false);
              console.error(error);
              Alert.alert(responseJson.message)
            });  
        }
        else{
            Alert.alert("Password Mismatch")
        }
    }
  }   
}

 render() {
  //const netInfo = useNetInfo();
   return (
        <View style={styles.container}>
        <View>
        <ScrollView> 
              <View style={{flexDirection: 'row',top:20}}>
                    <Text style={{  flex: 1, padding: 10, fontSize:18, fontWeight:'bold'}}>
                    {'Email'}
                    </Text>   
                    <TextInput
                        placeholder='Email'
                        placeholderTextColor='#303030'
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
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
                    {'Password'}
                    </Text>   
                    <TextInput
                        placeholder='Password'
                        placeholderTextColor='#303030'
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
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
                    {'Confirm Password'}
                    </Text>   
                    <TextInput
                        placeholder='Confirm Password'
                        placeholderTextColor='#303030'
                        onChangeText={(confirm_password) => this.setState({ confirm_password })}
                        value={this.state.confirm_password}
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
                    {'First Name'}
                    </Text>   
                    <TextInput
                        placeholder='First Name'
                        placeholderTextColor='#303030'
                        onChangeText={(first_name) => this.setState({ first_name })}
                        value={this.state.first_name}
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
                    {'Last Name'}
                    </Text>   
                    <TextInput
                        placeholder='Last Name'
                        placeholderTextColor='#303030'
                        onChangeText={(last_name) => this.setState({ last_name })}
                        value={this.state.last_name}
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
                    {'Bio'}
                    </Text>   
                    <TextInput
                        placeholder='Bio'
                        placeholderTextColor='#303030'
                        onChangeText={(bio) => this.setState({ bio })}
                        value={this.state.bio}
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
                    {'Gender'}
                    </Text>   
                    <TextInput
                        placeholder='Gender'
                        placeholderTextColor='#303030'
                        onChangeText={(gender) => this.setState({ gender })}
                        value={this.state.gender}
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
                    {'Address'}
                    </Text>   
                    <TextInput
                        placeholder='Address'
                        placeholderTextColor='#303030'
                        onChangeText={(address) => this.setState({ address })}
                        value={this.state.address}
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
                    {'Country'}
                    </Text>   
                    <TextInput
                        placeholder='Country'
                        placeholderTextColor='#303030'
                        onChangeText={(country) => this.setState({ country })}
                        value={this.state.country}
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
                    {'Title'}
                    </Text>   
                    <TextInput
                        placeholder='Title'
                        placeholderTextColor='#303030'
                        onChangeText={(title) => this.setState({ title })}
                        value={this.state.title}
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
                    {'State'}
                    </Text>   
                    <TextInput
                        placeholder='State'
                        placeholderTextColor='#303030'
                        onChangeText={(states) => this.setState({ states })}
                        value={this.state.states}
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
                    {'City'}
                    </Text>   
                    <TextInput
                        placeholder='City'
                        placeholderTextColor='#303030'
                        onChangeText={(city) => this.setState({ city })}
                        value={this.state.city}
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
                    {'Zip'}
                    </Text>   
                    <TextInput
                        placeholder='Zip'
                        placeholderTextColor='#303030'
                        onChangeText={(zip) => this.setState({ zip })}
                        value={this.state.zip}
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
                    {'Phone'}
                    </Text>   
                    <TextInput
                        placeholder='Phone'
                        placeholderTextColor='#303030'
                        onChangeText={(phone) => this.setState({ phone })}
                        value={this.state.phone}
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
                    {'Role'}
                    </Text>   
                    <TextInput
                        placeholder='Role'
                        placeholderTextColor='#303030'
                        onChangeText={(role) => this.setState({ role })}
                        value={this.state.role}
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
                <Text style={styles.btnTxt} onPress = {this.addOrder}>Add/Update Employee</Text>
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
 
