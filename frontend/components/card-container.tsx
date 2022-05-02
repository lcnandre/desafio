import { StyleSheet, View } from 'react-native';
import InsightCard from './card';

export default function CardContainer() {
  return (
    <View style={styles.cardsContainer}>
      <InsightCard></InsightCard>
    </View>
  );
}

const styles = StyleSheet.create({
  cardsContainer: {
    overflow: 'visible',
    width: '94%',
    top: -70
  },
});
