import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import TopBar from '../components/top-bar';
import LoadMore from '../components/load-more';
import SearchBar from '../components/search-bar';
import CardContainer from '../components/card-container';

export default function Feed() {
  return (
    <View style={{height: '100vh' }}>
      <TopBar></TopBar>

      <View style={styles.container}>
        <StatusBar style='auto' backgroundColor='#420a49' />
        <CardContainer></CardContainer>
        <LoadMore></LoadMore>
        <SearchBar></SearchBar>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
