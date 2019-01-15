import React from 'react';
import { ScrollView, Text } from 'react-native';

export default class BeautyScreen extends React.Component {

  static navigationOptions = {
    title: 'Beauty',
  };

  render() {
      
    return (
      <ScrollView>
        <Text>{'Beauty Screen.'}</Text>
      </ScrollView>
    );
  }
};
