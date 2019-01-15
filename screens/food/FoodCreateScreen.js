import React from 'react';
import { ScrollView, Text, Button, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class FoodCreateScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: '유통기한 - 직접 입력',
    }
  };

  render() {
      
    return (
      <ScrollView>
        <Text>{'Food Create.'}</Text>
      </ScrollView>
    );
  }
};
