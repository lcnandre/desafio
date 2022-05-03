import { Searchbar } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Component } from 'react';

export default class SearchBar extends Component {
  private styles = StyleSheet.create({
    searchBar: {
      padding: '8px 8px',
      width: '95%',
      position: 'absolute',
      bottom: 6
    }
  });

  render() {
    return (
      <View style={this.styles.searchBar}>
        <Searchbar placeholder='Pesquise por termos ou categorias'/>
      </View>
    );
  }
}
