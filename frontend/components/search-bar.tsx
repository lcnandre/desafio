import { Searchbar } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../reducers';
import { setFilterText } from '../store/insights';
import { fetchCards } from '../services/cards';

export default class SearchBarComponent extends Component<SearchBarProps> {
  constructor(props: any) {
    super(props);
    this.onSearchPress = this.onSearchPress.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  onSearchPress() {
    this.props.fetchCards();
  }

  onTextChange(text: string) {
    this.props.setFilterText(text);
  }

  render() {
    return (
      <View style={styles.searchBar}>
        <Searchbar
          placeholder='Pesquise por termos ou categorias'
          onIconPress={this.onSearchPress}
          onChangeText={this.onTextChange}
          value={this.props.filterText}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBar: {
    padding: '8px 8px',
    width: '95%',
    position: 'fixed',
    bottom: 6
  }
});

const mapState = (state: RootState) => ({
  loading: state.insightReducer.loading,
  filterText: state.insightReducer.filterText,
});

const mapDispatch = {
  fetchCards,
  setFilterText,
};

const connector = connect(mapState, mapDispatch);
type SearchBarProps = ConnectedProps<typeof connector>;

export const SearchBar = connector(SearchBarComponent);
