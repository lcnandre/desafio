import { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { connect, ConnectedProps } from 'react-redux';

import { InsightWriter } from '../components/insight-writer';
import { RootState } from '../reducers';
import { createCard } from '../services/cards';

export default class AddInsightComponent extends Component<AddInsightProps> {
  constructor(props: any) {
    super(props);
    this.publishInsight = this.publishInsight.bind(this);
  }

  publishInsight() {
    if (this.props.newInsight) {
      this.props.createCard();
    }
    this.props.navigation.navigate('feed');
  }

  render() {
    return (
      <View style={styles.container}>
        <InsightWriter></InsightWriter>
        <Button
          mode='contained'
          uppercase
          style={styles.publishButton}
          labelStyle={styles.publishButtonText}
          onPress={this.publishInsight}
          loading={this.props.creating}
          disabled={this.props.creating || !!!this.props.newInsight?.text || !!!this.props.newInsight?.tagIds || this.props.newInsight.tagIds.length === 0}
        >
          Publicar
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 12
  },
  publishButton: {
    width: '95%',
    position: 'absolute',
    bottom: 0,
    marginBottom: 6,    
  },
  publishButtonText: {
    color: '#fff',
    fontStyle: 'italic'
  },
});

const mapState = (state: RootState) => ({
  creating: state.insightReducer.creating,
  newInsight: state.insightReducer.newInsight,
});

const mapDispatch = {
  createCard,
};

const connector = connect(mapState, mapDispatch);
type AddInsightProps = ConnectedProps<typeof connector>;

export const AddInsight = connector(AddInsightComponent);
