import React from 'react';
import { ScrollView, Alert } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Container, Header, Title, Body, Content, Left, Right, Form, Item, Input, Label, Icon, Button, Text } from 'native-base';
import { getYear } from '../shared/common/DateUtil';

import { SQLite } from 'expo';

import { createStyle } from './FoodStyle';

const db = SQLite.openDatabase('db.db');
import { Query } from '../../config/Database';

export default class FoodCreateScreen extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      name: '',
      date: getYear()+'',
      note: '',

      error: {
        name: false,
        date: false
      }
    }
  }

  static navigationOptions = {
    header: null
  }

  _save = async () => {
    db.transaction(tx => {
      tx.executeSql(Query.EXPIRE.SAVE, [
        this.state.name,
        this.state.note,
        this.state.date]);
    });

    this.props.navigation.state.params.success();
    this.props.navigation.navigate('Food');
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

  _onChangeNote = (v) => {
    this.setState({
      note: v
    });
  }

  render() {
    const styles = createStyle; 
    const { name, date, error } = this.state;
    return (
      <Container>
        <Header>
        <Left>
            <Button 
              transparent
              onPress={() => {this.props.navigation.goBack()}}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>상품 입력</Title>
          </Body>
        
          <Right>
            <Button 
              hasText 
              transparent
              onPress={() => {this._save()}}>
              <Text>저장</Text>
            </Button>
          </Right>
        </Header>

        <Content>
          <Form>
            <Item stackedLabel>
              <Label>상품명</Label>
              <Input 
                onChangeText={(v) => {this._onChangeName(v)}}
                />
            </Item>
            <Item stackedLabel>
              <Label>날짜</Label>
              <Input
                defaultValue={date}
                maxLength={10}
                keyboardType={'number-pad'}
                onChangeText={(v) => {this._onChangeDate(v)}}
               />
            </Item>
            <Item stackedLabel last>
              <Label>메모</Label>
              <Input 
                onChangeText={(v) => {this._onChangeNote(v)}}
              />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
};
