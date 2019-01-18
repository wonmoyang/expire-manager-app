import React from 'react';
import {
  Platform,
  Alert,
  RefreshControl,
  ListView,
  ScrollView,
  TouchableOpacity 
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

const datas = [
  'Simon Mignolet',
  'Nathaniel Clyne',
  'Dejan Lovren',
  'Mama Sakho',
  'Alberto Moreno',
  'Emre Can',
  'Joe Allen',
  'Phil Coutinho',
];

const datas2 = [
  {id:1, name: 'test', date: '2018-0101'}, {id:2, name: 'test2', date: '2018-0101'}
]

export default class FoodScreen extends React.Component {

  state = {
    data: [],
    refreshing: false,
    isSearchBar: false,

    basic: false,
    listViewData: []
  }

  constructor(props){
    super(props);
    
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: datas2,
    };
    this.selectedRow;
    this.component=[];

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

  deleteRow(secId, rowId, rowMap) {
    debugger;
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }

  render() {
    const { data, isSearchBar } = this.state;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <Container style={{flex: 1}}>
        
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

        <Content contentContainerStyle={{flex: 1}}
          bounces={false}
          on
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}/>}>
              {
                 (data && data.length > 0)
                   ? (
                      <React.Fragment>
                      <List 
                        leftOpenValue={75}
                        rightOpenValue={-75}
                        dataSource={this.ds.cloneWithRows(this.state.data)}
                        renderRow={(data2, secId, rowId, rowMap) =>{
                          debugger;
                          return (
                          <ListItem button onPress={() => {Alert.alert('dd')}} key={data2.id} style={{height:80}}>
                            <Body>
                              <Text> {data2.name} </Text>
                              <Text note> {data2.date} </Text>
                            </Body>
                          </ListItem>      
                          )
                          }
                        }
                        onRowOpen={(a,b) => {
                          Alert.alert(a);
                          Alert.alert(b);
                        }}
                        renderLeftHiddenRow={data2 =>
                          <Button full onPress={() => alert(data2)}>
                            <Icon active name="information-circle" />
                          </Button>}
                        renderRightHiddenRow={(data2, secId, rowId, rowMap) =>
                          <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                            <Icon active name="trash" />
                          </Button>}
                      />
                      <Button style={{ margin: 20 }} onPress={() => this.selectedRow._root.closeRow()}><Text>Close row</Text></Button>
                      </React.Fragment>
                      // <List>
                      //   {
                      //     data.map(item => {
                      //       return (
                      //         <ListItem subtitle key={item.id}>
                      //         <Body>
                      //           <Text>{item.name}</Text>
                      //           <Text note>{item.note}</Text>
                      //         </Body>
                      //         <Right>
                      //           <Text note>{item.date}</Text>
                      //         </Right>
                      //         </ListItem>
                      //       )
                      //     })
                      //   }
                      // </List>

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