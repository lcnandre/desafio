import { Component } from 'react';
import { Appbar } from 'react-native-paper';
import { ImageBackground, StyleSheet } from 'react-native';

export default class FeedTopBar extends Component {
  private styles = StyleSheet.create({
    appBar: {
      backgroundColor: 'transparent',
      zIndex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: 4,
    },
    title: {
      color: '#ee4c78',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      textTransform: 'uppercase',
      fontWeight: 'lighter',
      fontStyle: 'italic',
      fontSize: 16,
      marginTop: 6,
      marginLeft: '-10%'
    },
    subtitle: {
      color: '#ee4c78',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      fontStyle: 'italic',
      marginLeft: '-10%'
    },
  });

  constructor(props: any) {
    super(props);
  }

  render() {
    return(
      <ImageBackground source={require('../assets/background.svg')}>
        <Appbar.Header style={this.styles.appBar}>
          <Appbar.BackAction color='#ee4c78' onPress={this.props.navigation.goBack} />
          <Appbar.Content title='Criar' subtitle={'Insight'} titleStyle={this.styles.title} subtitleStyle={this.styles.subtitle} />
        </Appbar.Header>
      </ImageBackground>
    );
  }
}
