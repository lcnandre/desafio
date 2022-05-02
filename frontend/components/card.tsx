import { Paragraph, Card, Chip } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function InsightCard() {
  return (
    <Card style={styles.cards}>
      <Card.Content>
        <Paragraph style={styles.cardText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in varius nunc. Pellentesque fringilla nec est fermentum convallis. Sed dignissim placerat elit, sed tempor purus maximus quis.</Paragraph>
        <Chip style={styles.tags} textStyle={styles.tagsText}>Example Chip</Chip>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  cards: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 'fit-content',
    marginBottom: 8,
  },
  cardText: {
    textAlign: 'center'
  },
  tags: {
    backgroundColor: '#fff',
    borderColor: '#ee4c78',
    borderRadius: 4,
    width: 'fit-content',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
  },
  tagsText: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#ee4c78',
  },
});
