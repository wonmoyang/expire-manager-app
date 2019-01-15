import React from 'react';
import { ScrollView, Text, Button, Alert } from 'react-native';

export default class FoodCreateScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: '유통기한 - 작성',
      headerRight: (
        <Button 
          title={'저장'}
          onPress={ async () => {
            await Alert.alert('저장되었습니다.');
            await navigation.navigate('Food');
          }}>
          
        </Button>
      )
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
