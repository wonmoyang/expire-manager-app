import React from 'react';
import {
  Platform,
  Alert,
  RefreshControl
} from 'react-native';
import { 
  Container, 
  Header, 
  Left, 
  Body, 
  Right, 
  Button, 
  Icon, 
  Title, 
  List, 
  ListItem, 
  Text, 
  Content,
  SwipeRow,
  View
} from 'native-base';

import { WebBrowser, SQLite } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './FoodStyle';


const db = SQLite.openDatabase('db.db');
import { Query } from '../../config/Database';

export default class FoodScreen extends React.Component {

  state = {
    data: [],
    refreshing: false,
    isSearchBar: false
  }
  static navigationOptions = {
    header: null,
    bottom: null
  };

  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     title: '유통기한',
  //     headerBackTitle: '',
  //     headerLeft: (
  //       <Ionicons
  //         name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu '}
  //         onPress={() => {
  //           Alert.alert('메뉴');
  //         }}
  //         size={32}
  //         style={{ paddingLeft: 10 }}
  //       />
  //     ),
  //     headerRight: (
  //       <React.Fragment>
  //       <Ionicons
  //         name={Platform.OS === 'ios' ? 'ios-barcode' : 'md-barcode'}
  //         onPress={() => navigation.navigate('FoodBarcode')}
  //         size={32}
  //         style={{ paddingRight: 10 }}
  //       />
  //       <Ionicons
  //         name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
  //         onPress={() => navigation.navigate('FoodCreate')}
  //         size={32}
  //         style={{ paddingRight: 10 }}
  //       />
  //       </React.Fragment>
  //     )
  //   };
  // };

  componentDidMount(){
    db.transaction(tx => {
      tx.executeSql('select * from expire', [], (_, { rows }) =>
        this.setState({
          data: rows._array
        })
      );
    });

    this.props.navigation.setParams({
      _toggleSearchBar: this._toggleSearchBar
    })
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return true;
}

  _toggleSearchBar = () => {
    this.setState({
      isSearchBar: !this.state.isSearchBar
    })
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    db.transaction(tx => {
      tx.executeSql('select * from expire', [], (_, { rows }) =>
        this.setState({
          data: rows._array,
          refreshing: false
        })
      );
    });
  }

  _success = () => {
    db.transaction(tx => {
      tx.executeSql('select * from expire', [], (_, { rows }) =>
        this.setState({
          data: rows._array,
          refreshing: false
        })
      );
    });
  }

  render() {
    const { data } = this.state;
    console.log(data)
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => {Alert.alert('메뉴')}}>
              <Icon name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu '} />
            </Button>
          </Left>

          <Body>
            <Title>유통기한</Title>
          </Body>
        
          <Right>
            <Button transparent onPress={() => this.props.navigation.navigate('FoodCreate', {success: this._success})}>
              <Icon name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'} />
            </Button>
          </Right>
        </Header>

        <Content 
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}/>}>

          <List>
            {
              data && data.map(item => {
                return (
                  <ListItem subtitl key={item.id}>
                  <Body>
                    <Text>{item.name}</Text>
                    <Text note>{item.note}</Text>
                  </Body>
                  <Right>
                    <Text note>{item.date}</Text>
                  </Right>
                  </ListItem>
                )
              })
            }
          </List>
        </Content>

    </Container>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}