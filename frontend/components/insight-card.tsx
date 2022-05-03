import { Paragraph, Card, Chip } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Component } from 'react';

import { Insight } from '../services/cards';

type InsightCardProps = {
  insight: Insight;
}

export default class InsightCard extends Component<InsightCardProps> {
  render() {
    return (
      <Card style={styles.cards}>
        <Card.Content style={{width: '90vw'}}>
          <Paragraph style={styles.cardText}>{this.props.insight.text}</Paragraph>
          <View style={styles.tagContainer}>
            {this.props.insight.tags?.map((tag, i) => {
              return (<Chip style={styles.tags} textStyle={styles.tagsText} key={`tag-${i}`}>{tag.name}</Chip>);
            })}
          </View>
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
    width: '100%',
  },
  cardText: {
    textAlign: 'center',
    width: '100%',
  },
  tagContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: 'fit-content',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  tags: {
    backgroundColor: '#fff',
    borderColor: '#ee4c78',
    borderRadius: 4,
    width: 'fit-content',
    marginTop: 10,
    marginLeft: 2,
    marginRight: 2
  },
  tagsText: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#ee4c78',
  },
});
