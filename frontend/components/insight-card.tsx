import { Paragraph, Card, Chip } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { Component } from 'react';

export default class InsightCard extends Component {
  private styles = StyleSheet.create({
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

  render() {
    return (
      <Card style={this.styles.cards}>
        <Card.Content>
          <Paragraph style={this.styles.cardText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in varius nunc. Pellentesque fringilla nec est fermentum convallis. Sed dignissim placerat elit, sed tempor purus maximus quis.</Paragraph>
          <Chip style={this.styles.tags} textStyle={this.styles.tagsText}>Example Chip</Chip>
        </Card.Content>
      </Card>
    );
  }
}
