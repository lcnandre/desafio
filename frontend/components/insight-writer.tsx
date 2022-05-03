import { Component } from 'react';
import { DefaultTheme, Card, Paragraph, Chip, TextInput, Caption } from 'react-native-paper';
import { StyleSheet } from 'react-native';

import TagPicker from './tag-picker';

export default class InsightWriter extends Component {
  private styles = StyleSheet.create({
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
    characterLimit: {
      textAlign: 'right'
    },
    insightInput: {
      height: 160,
      backgroundColor: '#fff',
      paddingVertical: 0,
      paddingHorizontal: 0,
    },
    tagPicker: {
      backgroundColor: '#fff',
    }
  });

  render() {
    const theme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: '#bbb',
      },
    };

    return (
      <Card style={this.styles.cards}>
        <Card.Content>
        <Paragraph style={this.styles.cardText}>Insight</Paragraph>
        <TextInput theme={theme} multiline={true} mode='flat' placeholder='Escreva aqui o seu insight...' style={this.styles.insightInput}></TextInput>
        <Caption style={this.styles.characterLimit}>Limite de caracteres: 400</Caption>
        <Paragraph style={this.styles.cardText}>Categoria</Paragraph>
        <TextInput theme={theme} mode='flat' style={this.styles.tagPicker} render={props => <TagPicker {...props}></TagPicker>}></TextInput>
        <Chip style={this.styles.tags} textStyle={this.styles.tagsText}>Example Chip</Chip>
        </Card.Content>
      </Card>
    );
  }
}
