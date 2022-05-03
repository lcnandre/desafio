import { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import InsightCard from './insight-card';

export default class CardContainer extends Component {
  private styles = StyleSheet.create({
    cardsContainer: {
      overflow: 'visible',
      width: '94%',
      top: -70
    },
  });

  render() {
    return (
      <View style={this.styles.cardsContainer}>
        <InsightCard></InsightCard>
      </View>
    );
  }
}
