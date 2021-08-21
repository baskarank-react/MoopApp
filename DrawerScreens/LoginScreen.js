// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import CheckConnection from './CheckConnection';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import Loader from '../Components/Loader';
import PasswordInputView from './PasswordInputView';
import { color } from 'react-native-reanimated';
import { CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons';




const LoginScreen = ({navigation}) => {
  
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [state, setState] = useState([]);
  const [checked, setChecked] = useState(false);
  const passwordInputRef = createRef();

  
  //import {useNetInfo} from "@react-native-community/netinfo";

const YourComponent = () => {
  //const netInfo = NetInfo();

  // return (
  //   //Alert.alert("str")
  // );
};

useEffect(() => {  
  console.log(useEffect)
  
  if(checked == true){
    console.log("checked", checked)
    setChecked(!checked)
  }
  else{
    console.log("checked", checked)
    setChecked(!checked)
    getEmail()
  }
  
}, [navigation]);


  const net = () => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    });
    
    // Unsubscribe
    unsubscribe();
  }

  // useEffect(() => {
  //     // Subscribe
  //     net();
  //   YourComponent();
  //   }, []);
  
   const handlePassword = (password) => {
      setUserPassword(password);
      
  }

  const handleSubmitPress = () => {
    
    setErrortext('');
    console.log(userPassword)
    console.log(userEmail)
    if (!userEmail) {
      //navigation.replace('DrawerNavigationRoutes');
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
    let dataToSend = {user_email: userEmail, user_password: userPassword};
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch(`http://139.59.65.210/moop/api/index.php/service/user/login?X-API-KEY=MoopApp2021@!&email=${userEmail}&password=${userPassword}`, {
      method: 'GET',
      
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
    //    Alert.alert(responseJson.status)
        //console.log(responseJson);
        //console.log(responseJson.status);
        // If server response message same as Data Matched
        if (responseJson.status === 'success') {
          console.log(responseJson.data)
          console.log(responseJson.data)
          var dataFinal = responseJson.data;
          console.log("dataFinal", JSON.stringify(dataFinal));
          AsyncStorage.setItem('finalData', JSON.stringify(dataFinal));
          // AsyncStorage.setItem('user_id', responseJson.data['id']);
          // AsyncStorage.setItem('first_name', responseJson.data['first_name']);
          // AsyncStorage.setItem('last_name', responseJson.data['last_name']);
          // AsyncStorage.setItem('email', responseJson.data['email']);
          // AsyncStorage.setItem('role_id', responseJson.data['roles_id']);
          //console.log(responseJson.data['id']);
          
          displayData();


          navigation.replace('DrawerNavigationRoutes');

        } else {
          //setErrortext('Please check your email id or password');
          console.log(responseJson.message);
          console.log('Please check your email id or password');
          Alert.alert('Please check your email id or password');
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        Alert.alert(error)
        console.error(error);
      });
    
  };

  const rememberFunc = () => {
    console.log("Remember Function 1")
    setChecked(!checked)
    console.log(checked)
    if(checked == true)
    { 
      AsyncStorage.removeItem('rememberEmail')
    }
    else{      
      console.log("Remember checked ")
      AsyncStorage.setItem('rememberEmail', JSON.stringify(userEmail));      
      getEmail()
    }
  }


  const getEmail = async () => {
    try {
      let getRememberEmail = await AsyncStorage.getItem('rememberEmail');
      const parseData = JSON.parse(getRememberEmail)
      console.log("RememberFunc",parseData)
      setUserEmail(parseData);   
      if(parseData == null)  {
        console.log("null")
        setChecked(false)
      }       
    } catch (error) {
      Alert.alert(error);
    }
  }

  const displayData = async () => {
    try {

      let getData = await AsyncStorage.getItem('finalData');
      const parseData = JSON.parse(getData)
      console.log("ParseData -", parseData)
   // const mapData = new Map(parseData)

   // console.log(mapData);
    //get a list of IDs
   // console.log(Array.from(mapData.keys()));
      //let user_id = await AsyncStorage.getItem('user_id');
      // let first_name = await AsyncStorage.getItem('first_name');
      // let last_name = await AsyncStorage.getItem('last_name');
      // let email = await AsyncStorage.getItem('email');
      // let role = await AsyncStorage.getItem('roles_id');

      // let userID = JSON.parse(user_id);
      // let firstName = JSON.parse(first_name);
      // let lastName = JSON.parse(last_name);
      // let emailID = JSON.parse(email);
      // let roleID = JSON.parse(role_id);

      // console.log("userID ***",userID);
      // console.log("firstName ***",firstName);
      // console.log("lastName ***",lastName);
      // console.log("email ***",emailID);
      // console.log("role ***",roleID)
    //  console.warn('fff' + this.state.token + this.state.username);      
    } catch (error) {
      Alert.alert(error);
    }
  };




  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../Images/logo_icon_tagline.png')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
              <Text style={styles.loginText}>Login</Text>
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                //value="dd"
                value={userEmail}
                placeholder="Email" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            

                  

            <PasswordInputView             
                ref={passwordView => { passwordView = passwordView }}                 
                callback={handlePassword} 
                label={'Password'} />


                <View style = {styles.checkbox}>
                  <CheckBox              
                    title="Remember Login"
                    checkedColor='black'
                    checked={checked}
                    onPress={rememberFunc}
                  />
                </View>
            


            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>

            <View style={styles.forgot} >
              <Text style={styles.forgot} 
              onPress={() => navigation.navigate('ForgotPass')}>
                Forgot Password
              </Text>
            </View>
            
            
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    alignContent: 'center',
  },
  checkbox:{
    marginLeft: 35,
    marginRight: 35,
  },
  loginText:{
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
    top: -5,
    borderBottomWidth: 2,
    borderBottomColor: 'red'
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#52B366',
    borderWidth: 0,
    color: 'black',
    borderColor: '#7DE24E',
    height: 40,
    width:170,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 100,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#dadae8',
  },
  
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },

  forgot:{
    fontSize:14,
    color:'black',
    //marginLeft:200,
    alignItems: 'center',
    alignContent: 'center',
  },
  createtxt:
  {
    fontSize:16,
    color:'#fff',
    textAlign:'center',
    top:10
  },
});
