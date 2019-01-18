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
import SearchBar from '../../components/SearchBar';
import * as service from './food.service';

import { WebBrowser, SQLite } from 'expo';
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

  componentDidMount(){
    db.transaction(tx => {
      tx.executeSql('select * from expire', [], (_, { rows }) =>
        this.setState({
          data: rows._array
        })
      );
    });
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  
  _search = async (name='') => {
    let expires = [];
    expires = await service.search(name);

    this.setState({
      data: expires
    });
  }
  _toggleSearchBar = async () => {

    if(this.state.isSearchBar)
      this._findAll();
      
    this.setState({
      isSearchBar: !this.state.isSearchBar
    })
  }

  /**
   * 스크롤 refresh
   */
  _onRefresh = async () => {
    this.setState({refreshing: true});

    let expires = await service.findAll();
    this.setState({
      data: expires,
      refreshing: false
    });
  }


  /**
   * 상품입력 성공
   */
  _findAll = async () => {
    let expires = await service.findAll();
    this.setState({
      data: expires
    });
  }

  render() {
    const { data, isSearchBar } = this.state;
    
    return (
      <Container>
        
        {
          isSearchBar 
            ? (
              <SearchBar 
                toggle={this._toggleSearchBar}
                search={this._search}/>) 
            : (
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
                <Button transparent onPress={() => {this._toggleSearchBar()}}>
                  <Icon name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} />
                </Button>
                <Button transparent onPress={() => this.props.navigation.navigate('FoodCreate', {success: this._findAll})}>
                  <Icon name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'} />
                </Button>
              </Right>
            </Header>)
        }

        <Content 
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}/>}>
              {
                (data.length > 0)
                  ? (
                      <List>
                        {
                          data.map(item => {
                            return (
                              <ListItem subtitle key={item.id}>
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
                    )
                    : (
                        <View flex height={500} justifyContent={'center'} alignItems={'center'}>
                          <Text style={{fontSize: 16}}>
                            검색 결과가 없습니다.
                          </Text>
                        </View>
                      )
              }
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