import React from 'react';
import { ScrollView, Button, Alert, AsyncStorage } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Icon } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import { getYear } from '../shared/common/DateUtil';

import { createStyle } from './FoodStyle';

export default class FoodCreateScreen extends React.Component {

  constructor(props){
    super(props);

    this.props.navigation.setParams({
      _save: this._save
     })

    this.state = {
      name:'',
      date: getYear()+'',

      error: {
        name: false,
        date: false
      }
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: '상품 입력',
      headerRight: (
        <Button
          onPress={() => {
            navigation.state.params._save();
          }}
          title="저장"
        />
      )
    }
  };

  _save = async () => {
    Alert.alert('save.');
    console.log(this.state);

    let expire = {
      name: this.state.name,
      date: this.state.date
    }



    try {
      const expired = await AsyncStorage.getItem('@expires');
      if(null === expired){
        await AsyncStorage.setItem('@expires', JSON.stringify({1: expire}));
      }else{
        let num = Object.keys(JSON.parse(expired)).length + 1;
        let data = {};
        data[num] = expire;
        await AsyncStorage.setItem('@expires', JSON.stringify(data));
      }

      const tt = await AsyncStorage.getItem('@expires');
      console.log(tt);
      debugger;
    } catch (error) {
      console.log(error)
    }
  }

  _onChangeName = (v) => {
    this.setState({
      name: v
    });
  }

  _onBlurName = () => {
    let errors = this.state.error;
    const isError = this.state.name.length < 1 ? true : false;

    errors.name = isError;
    this.setState({
      error: errors
    });
  }

  _onChangeDate = (v) => {
    if(v.slice(-1) !== '-')
      if(v.length === 5){
        v = v.substring(0, 4) + '-' +v.substring(v.length-1, v.length);
      }else if(v.length === 8){
        v = v.substring(0, 7) + '-' +v.substring(v.length-1, v.length);
      }

    this.setState({
      date: v
    });
  }

  _onBlurDate = () => {
    let errors = this.state.error;
    const isError = this.state.date.length !== 10 ? true : false;

    errors.date = isError;
    this.setState({
      error: errors
    });
  }

  render() {
    const styles = createStyle; 
    const { name, date, error } = this.state;
    return (
      <ScrollView style={styles.container}>
        <FormLabel>상품명 {name}</FormLabel>
        <FormInput autoFocus onChangeText={(v) => {this._onChangeName(v)}} onBlur={() => {this._onBlurName()}}/>
        {
          error.name ? (<FormValidationMessage>Error message</FormValidationMessage>) : null
        }

        <FormLabel>날짜</FormLabel>
        <FormInput keyboardType={'number-pad'} onChangeText={(v) => {this._onChangeDate(v)}} onBlur={() => {this._onBlurDate()}} defaultValue={date} maxLength={10}/>
        {
          error.date ? (<FormValidationMessage>Error message</FormValidationMessage>) : null
        }
        
      </ScrollView>
    );
  }
};
