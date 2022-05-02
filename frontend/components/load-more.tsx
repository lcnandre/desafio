import { Paragraph, IconButton } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

export default function LoadMore() {
  return (
    <View style={styles.loadMore}>
      <IconButton icon='dots-horizontal' size={20} color='#ccc' style={styles.loadMoreIcon} />
      <Paragraph style={styles.loadMoreText}>Toque para exibir mais insights</Paragraph>
    </View>
  );
}

const styles = StyleSheet.create({
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