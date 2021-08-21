/*Example of Expandable ListView in React Native*/
import React, { Component  } from 'react';
//import react in our project
import {
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Image,
} from 'react-native';

import { Container, Header,Button,Title } from 'native-base';

//import { Icon } from 'react-native-elements'
import { Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swipeout from 'react-native-swipeout';
import { createStackNavigator } from 'react-navigation';

//import basic react native components
let temp=[];
let tmpitems=[];
class ExpandableItemComponent extends Component {
  //Custom Component for the Expandable List
  constructor() {
    super();
    this.state = {
      layoutHeight: 0,
      list: [],
     status:"unchecked",
    // temp:[],
    };
    
  }
  strCompare(str1,str2){
    return str1 === str2 ;
  }

  updatestatus = () => {
    if(this.strCompare(this.state.status,'checked'))
    {
      this.setState({status:'unchecked'});
      temp.filter(this.props.item.category_id);
   }else{
    this.setState({status:'checked'});
      temp.push(this.props.item.category_id);
   }
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.item.isExpanded) {
      this.setState(() => {
        return {
          layoutHeight: null,
        };
      });
    } else {
      this.setState(() => {
        return {
          layoutHeight: 0,
        };
      });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    //alert('Edit Clicked!'+ this.props.updatecheckbox;
    //if (this.state.layoutHeight !== nextState.layoutHeight) {
     
      return true;
    //}
    //return false;
  }

  swipeBtns =id =>  [{
    text: 'Delete',
    backgroundColor: 'red',
    underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
    onPress: () => { 
      this.props.removecategoryid(id);
 },
    
  }];

 
  render() {
   
    return (
      <View>
        {/*Header of the Expandable List Item*/}
        <Swipeout right={this.swipeBtns(this.props.item.category_id)}
             autoClose='true'
             backgroundColor= 'transparent'>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.props.onClickFunction}
          style={styles.header}>
          <View style={styles.containers}>  

            <View >{this.props.updatecheckbox ?  <Checkbox.Item  status={this.state.status} color='black' style={{ width: 50, height: 40 }} onPress={()=>this.updatestatus()} /> : null}  
           </View>
           
          <Text style={styles.headerText}>{this.props.item.category_name}</Text>
         
          <Icon name="angle-down"  size={20}   style={{
                alignSelf: 'flex-end',
          }}>
          </Icon>
          </View> 
        </TouchableOpacity>
        </Swipeout>
        <View
          style={{
            height: this.state.layoutHeight,
            overflow: 'hidden',
          }}>
          {/*Content under the header of the Expandable List Item*/}
          {this.props.item.subcategory.map((item, key) => (
            <TouchableOpacity
              key={key}
              style={styles.content}
              onPress={() => alert('Id: ' + item.id + ' val: ' + item.val)}>
              <Text style={ styles.text}>
                {item.val}
              </Text>
            
            </TouchableOpacity>
          ))}
        </View>
        
      </View>
    );
  }
}
 


export default class MenuScreen extends React.Component {
  //Main View defined under this Class
  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.state = { 
      listDataSource: CONTENT,
      currentoption:"Bulk Edit",
      showcheckbox:false,
      list:[],
     };
     this.removecategoryid = this.removecategoryid.bind(this)
  }

   strCompare(str1,str2){
    return str1 === str2 ;
  }
  
 handleClick = () => {
  if(this.strCompare(this.state.currentoption,'Bulk Edit'))
  {
    this.setState({currentoption:'Delete'});
    this.setState({showcheckbox:true});
 
 }else{

  this.setState({currentoption:'Bulk Edit'});
  this.setState({showcheckbox:false}); 
  this.removecategory();
 }
 
}

removecategory() {
  temp.forEach((tempid) => {
    this.setState(prevState => ({ 
      listDataSource : prevState.listDataSource.filter(item => item.category_id !== tempid), 
    }));
  })
 // console.log(this.state.listDataSource);
}                      

 removecategoryid(id){
  const items = this.state.listDataSource.filter(item => item.category_id !== id);
  this.setState({ listDataSource: items } ,() => console.log(this.state));
 }
  updateLayout = index => {
    console.log('inside update')
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...this.state.listDataSource];
    array.map((value, placeindex) =>
      placeindex === index
        ? (array[placeindex]['isExpanded'] = !array[placeindex]['isExpanded'])
        : (array[placeindex]['isExpanded'] = false)
    );
    this.setState(() => {
      return {
        listDataSource: array,
      };
    });
  };
 


  render() {
    return (      
      <View style={styles.container}>        
        <ScrollView style={styles.scrollViews}>
          {this.state.listDataSource.map((item, key) => (
            <ExpandableItemComponent
              key={item.category_name}
              onClickFunction={this.updateLayout.bind(this, key)}
              item={item}
              updatecheckbox={this.state.showcheckbox}
              removecategoryid = {this.removecategoryid} 
            />
          ))}
        </ScrollView>
        <Text style={styles.headerText} onPress={this.handleClick}>{this.state.currentoption}</Text>
      </View>
    );
  }
}

 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#F5FCFF',
  },
  scrollViews:{
    marginTop: 50,
  },
  containers:{  
    flex: 1,  
    flexDirection: 'row',// set elements horizontally, try column.  
},  
  topHeading: {
    paddingLeft: 10,
    fontSize: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 16,
  },
  headerText: {
    fontSize: 16,
    width: '70%',
    fontWeight: '100',
    marginTop:10,
    paddingLeft:20,
  },
  separator: {
    height: 0.5,
    backgroundColor: '#808080',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    fontSize: 16,
    color: '#606070',
    padding: 10,
    marginLeft:60,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#F5FCFF',
  },
  buttonStyle: {
    width: '100%',
    height: 40,
    padding: 10,
    backgroundColor: '#808080',
    borderRadius: 2,
    marginTop: 12,
  },
  TextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
});

//Dummy content to show
//You can also use dynamic data by calling webservice
const CONTENT = [
  {
    isExpanded: false,
    category_name: 'Category 1',
    category_id: '1',
    subcategory: [{ id: 1, val: 'Menu item 1' }, { id: 3, val: 'Menu item 2' }],
  },
  {
    isExpanded: false,
    category_name: 'Category 2',
    category_id: '2',
    subcategory: [{ id: 4, val: 'Menu item 3' }, { id: 5, val: 'Menu item 4' }],
  },
  {
    isExpanded: false,
    category_name: 'Category 3',
    category_id: '3',
    subcategory: [{ id: 7, val: 'Menu item 7' }, { id: 9, val: 'Menu item 9' }],
  },
  {
    isExpanded: false,
    category_name: 'Category 4',
    category_id: '4',
    subcategory: [{ id: 10, val: 'Menu item 10' }, { id: 12, val: 'Menu item 12' }],
  },
  {
    isExpanded: false,
    category_name: 'Category 5',
    category_id: '5',
    subcategory: [{ id: 13, val: 'Menu item 13' }, { id: 15, val: 'Menu item 15' }],
  },
  {
    isExpanded: false,
    category_name: 'Category 6',
    category_id: '6',
    subcategory: [{ id: 17, val: 'Menu item 16' }, { id: 18, val: 'Menu item 17' }],
  },
  {
    isExpanded: false,
    category_name: 'Category 7',
    category_id: '7',
    subcategory: [{ id: 20, val: 'Menu item 20' }],
  },
  {
    isExpanded: false,
    category_name: 'Category 8',
    category_id: '8',
    subcategory: [{ id: 22, val: 'Menu item 22' }],
  },
  {
    isExpanded: false,
    category_name: 'Category 9',
    category_id: '9',
    subcategory: [{ id: 26, val: 'Menu item 26' }, { id: 27, val: 'Menu item 7' }],
  },
  {
    isExpanded: false,
    category_name: 'Category 10',
    category_id: '10',
    subcategory: [{ id: 28, val: 'Menu item 28' }, { id: 30, val: 'Menu item 29' }],
  },
  {
    isExpanded: false,
    category_name: 'Category 11',
    category_id: '11',
    subcategory: [{ id: 31, val: 'Menu item 31' }],
  },
  {
    isExpanded: false,
    category_name: 'Category 12',
    category_id: '12',
    subcategory: [{ id: 34, val: 'Menu item 34' }],
  },
  {
    isExpanded: false,
    category_name: 'Category 13',
    category_id: '13',
    subcategory: [{ id: 38, val: 'Menu item 38' }, { id: 39, val: 'Menu item 9' }],
  },
  {
    isExpanded: false,
    category_name: 'Category 14',
    category_id: '14',
    subcategory: [{ id: 40, val: 'Menu item 40' }, { id: 42, val: 'Menu item 2' }],
  },
  {
    isExpanded: false,
    category_name: 'Category 15',
    category_id: '15',
    subcategory: [{ id: 43, val: 'Menu item 43' }, { id: 44, val: 'Menu item 44' }],
  },
];