import { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import InsightWriter from '../components/insight-writer';

export default class AddInsight extends Component {
  private styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      backgroundColor: '#f0f0f0',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 12
    },
  });

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <View style={this.styles.container}>
        <InsightWriter></InsightWriter>
      </View>
    );
  }
}
