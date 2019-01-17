import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
  Platform,
  Alert,
  RefreshControl
} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

import { WebBrowser, SQLite } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './FoodStyle';
import { SearchBar, List, ListItem } from 'react-native-elements'


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

  _toggleSearchBar = () => {
    debugger;
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

  render() {
    const { data } = this.state;
    
    return (
      <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>Header</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => this.props.navigation.navigate('FoodCreate')}>
            <Icon name='menu' />
          </Button>
        </Right>
      </Header>
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