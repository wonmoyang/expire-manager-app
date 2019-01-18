
import React from 'react';
import { Platform } from 'react-native';
import { Header, Item, Input, Icon, Button, Text } from 'native-base';

const SearchBar = ({ toggle, search }) => {
    return(
        <Header searchBar rounded>
            <Item>
                <Icon name={Platform.OS === 'ios' ? 'ios-search' : 'md-search' }/>
                    <Input 
                        placeholder="Search" 
                        autoFocus
                        onChangeText={search.bind(this)}/>
            </Item>
            <Button transparent onPress={toggle.bind(this)}>
                <Text>닫기</Text>
            </Button>
        </Header>
    );
};

export default SearchBar;