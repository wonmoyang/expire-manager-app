import React from 'react';
import { ScrollView, Text } from 'react-native';

export default class SettingScreen extends React.Component {

  static navigationOptions = {
    title: 'Setting',
  };

  render() {
      
    return (
      <ScrollView>
        <Text>{'Setting Screen.'}</Text>
      </ScrollView>
    );
  }
};
