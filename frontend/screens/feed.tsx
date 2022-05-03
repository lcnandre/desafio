import { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { Portal, ActivityIndicator } from 'react-native-paper';

import SearchBar from '../components/search-bar';
import { LoadMore } from '../components/load-more';
import { CardContainer } from '../components/card-container';
import { RootState } from '../reducers';

export default class FeedComponent extends Component<FeedProps> {
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
            {this.props.loading && <ActivityIndicator animating={true} />}
            {!this.props.loading && <LoadMore></LoadMore>}
            <SearchBar></SearchBar>
          </View>
        </Portal>
      }
      </>
    );
  }
}

const mapState = (state: RootState) => ({
  loading: state.insightReducer.loading,
});

const connector = connect(mapState);
type FeedProps = ConnectedProps<typeof connector>;

export const Feed = connector(FeedComponent);
