import { Component } from 'react';
import { Paragraph, IconButton } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';

import { fetchCards } from '../services/cards';
import { incrementPage } from '../store/insights';
import { RootState } from '../reducers';

export default class LoadMoreComponent extends Component<LoadMoreProps> {
  constructor(props: LoadMoreProps) {
    super(props)
    this.loadMoreInsights = this.loadMoreInsights.bind(this);
  }

  loadMoreInsights() {
    this.props.incrementPage();
    this.props.fetchCards();
  }

  render() {
    return (
      <View style={styles.loadMore} onTouchEnd={this.loadMoreInsights}>
        <IconButton icon='dots-horizontal' size={20} color='#ccc' style={styles.loadMoreIcon} />
        <Paragraph style={styles.loadMoreText}>Toque para exibir mais insights</Paragraph>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadMore: {
    color: '#fff',
    flexGrow: 1,
    alignItems: 'center',
    position: 'relative'
  },
  loadMoreIcon: {
    margin: 0,
    padding: 0
  },
  loadMoreText: {
    color: '#999',
    fontWeight: 'bold'
  },
});

const mapState = (state: RootState) => ({
  loading: state.insightReducer.loading,
});

const mapDispatch = {
  fetchCards,
  incrementPage,
};

const connector = connect(mapState, mapDispatch);
type LoadMoreProps = ConnectedProps<typeof connector>;

export const LoadMore = connector(LoadMoreComponent);
