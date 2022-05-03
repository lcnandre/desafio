import { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';

import InsightCard from './insight-card';
import { RootState } from '../reducers';
import { fetchCards } from '../services/cards';

class CardContainerComponent extends Component<CardContainerProps> {
  componentDidMount() {
    this.props.fetchCards();
  }

  render() {
    return (
      <View style={styles.cardsContainer}>
        {this.props.insights.map((insight, i) => {
          return (<InsightCard insight={insight} key={`card-${i}`}></InsightCard>)
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardsContainer: {
    overflow: 'visible',
    width: '94%',
    top: -70
  },
});

const mapState = (state: RootState) => ({
  loading: state.insightReducer.loading,
  insights: state.insightReducer.insights,
});

const mapDispatch = {
  fetchCards,
};

const connector = connect(mapState, mapDispatch);
type CardContainerProps = ConnectedProps<typeof connector>;

export const CardContainer = connector(CardContainerComponent);
