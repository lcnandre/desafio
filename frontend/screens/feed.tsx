import { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Portal } from 'react-native-paper';

import LoadMore from '../components/load-more';
import SearchBar from '../components/search-bar';
import CardContainer from '../components/card-container';

export default class Feed extends Component {
  private styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      backgroundColor: '#f0f0f0',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: 294
    },
  });

  constructor(props: any) {
    super(props);
    this.state = {
      show: true,
    };
    
    const self = this;
    const unsubscribe = props.navigation.addListener('state', () => {
      const route = self.props.navigation.getState().routes[props.navigation.getState().index].name;
      self.setState({show: route === 'feed'});
      props.navigation.removeListener(unsubscribe);
    });
  }

  render() {
    return (
      <>
      {this.state.show &&
        <Portal>
          <View style={this.styles.container}>
            <CardContainer></CardContainer>
            <LoadMore></LoadMore>
            <SearchBar></SearchBar>
          </View>
        </Portal>
      }
      </>
    );
  }
}
