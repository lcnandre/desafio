import { Searchbar } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

export default function SearchBar() {
  return (
    <View style={styles.searchBar}>
      <Searchbar placeholder="Pesquise por termos ou categorias"/>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    padding: '8px 8px',
    width: '95%',
    position: 'absolute',
    bottom: 6
  }
});
