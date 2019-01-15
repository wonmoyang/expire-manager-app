import React from 'react';
import { ScrollView, Text } from 'react-native';

import Barcode from '../shared/camera/Barcode';

export default class FoodCreateScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: '유통기한 - 바코드',
    }
  };

  render() {
      
    return (
        <React.Fragment>

            <Barcode></Barcode>

        </React.Fragment>
    );
  }
};
