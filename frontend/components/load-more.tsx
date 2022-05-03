import { Paragraph, IconButton } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Component } from 'react';

export default class LoadMore extends Component {
  private styles = StyleSheet.create({
    loadMore: {
      color: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
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

  render() {
    return (
      <View style={this.styles.loadMore}>
        <IconButton icon='dots-horizontal' size={20} color='#ccc' style={this.styles.loadMoreIcon} />
        <Paragraph style={this.styles.loadMoreText}>Toque para exibir mais insights</Paragraph>
      </View>
    );
  }
}
