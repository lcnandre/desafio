import { Component } from 'react';
import { DefaultTheme, Card, Paragraph, TextInput, Caption } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';

import { TagPicker } from './tag-picker';
import { RootState } from '../reducers';
import { setNewInsightTags, setNewInsightText } from '../store/insights';
import { Tag } from '../services/tags';

export default class InsightWriterComponent extends Component<InsightWriterProps> {
  constructor(props: any) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeTags = this.onChangeTags.bind(this);
  }

  onChangeText(text: string) {
    this.props.setNewInsightText(text);
  }

  onChangeTags(tags: Tag[]) {
    this.props.setNewInsightTags(tags);
  }

  render() {
    const theme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: '#bbb',
      },
    };

    return (
      <Card style={styles.cards}>
        <Card.Content>
          <Paragraph style={styles.cardText}>Insight</Paragraph>
          <TextInput
            theme={theme}
            multiline={true}
            mode='flat'
            placeholder='Escreva aqui o seu insight...'
            style={styles.insightInput}
            onChangeText={this.onChangeText}
            editable={!this.props.creating}
          />
          <Caption style={styles.characterLimit}>Limite de caracteres: 400</Caption>
          <Paragraph style={styles.cardText}>Categoria</Paragraph>
          <TagPicker
            onChange={this.onChangeTags}
            editable={!this.props.creating}
            placeholder='Adicione uma categoria (opcional)...'
          />
        </Card.Content>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  cards: {
    height: 'fit-content',
    width: '100%'
  },
  cardText: {
    textAlign: 'left',
    textTransform: 'uppercase',
    fontStyle: 'italic',
    fontSize: 12
  },
  tagsText: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#ee4c78',
  },
  characterLimit: {
    textAlign: 'right'
  },
  insightInput: {
    height: 160,
    backgroundColor: '#fff',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});

const mapState = (state: RootState) => ({
  creating: state.insightReducer.creating,
  newInsight: state.insightReducer.newInsight,
});

const mapDispatch = {
  setNewInsightText,
  setNewInsightTags,
};

const connector = connect(mapState, mapDispatch);
type InsightWriterProps = ConnectedProps<typeof connector>;

export const InsightWriter = connector(InsightWriterComponent);
