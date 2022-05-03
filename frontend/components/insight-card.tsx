import { Paragraph, Card, Chip } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { Component } from 'react';

import { Insight } from '../services/cards';

type InsightCardProps = {
  insight: Insight;
}

export default class InsightCard extends Component<InsightCardProps> {
  render() {
    return (
      <Card style={styles.cards}>
        <Card.Content>
          <Paragraph style={styles.cardText}>{this.props.insight.text}</Paragraph>
          {this.props.insight.tags?.map((tag, i) => {
            return (<Chip style={styles.tags} textStyle={styles.tagsText} key={`tag-${i}`}>{tag.name}</Chip>);
          })}
        </Card.Content>
      </Card>
    );
  }
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
