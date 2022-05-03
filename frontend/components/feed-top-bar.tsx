import { Component } from 'react';
import { Avatar, Appbar, Title, Caption } from 'react-native-paper';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';

export default class FeedTopBar extends Component {
  private styles = StyleSheet.create({
    avatar: {
      borderColor: '#ee4c78',
      borderRadius: 64,
      borderWidth: 2,
      width: 'auto',
      height: 'auto'
    },
    logo: {
      width: 60,
      height: 39,
    },
    appBar: {
      height: '294px',
      backgroundColor: 'transparent',
      zIndex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: 40,
    },
    userName: {
      color: '#f0f0f0'
    },
    userEmail: {
      color: '#fff'
    },
    ruler: {
      borderBottomColor: '#ee4c78',
      borderBottomWidth: 1,
      width: 20,
      marginTop: 8,
      marginBottom: 8,
    },
    title: {
      color: '#ee4c78',
    },
    topBar: {
      flex: 2,
      alignItems: 'center',
      justifyContent: 'center',
      left: '-10%'
    },
  });

  constructor(props: any) {
    super(props);
    this.addInsight = this.addInsight.bind(this);
  }

  addInsight() {
    this.props.navigation.navigate('add-insight');
  }

  render() {
    const logo = (
      <Image source={require('../assets/logo.svg')} style={this.styles.logo}  />
    );
  
    return(
      <ImageBackground source={require('../assets/background.svg')} style={{height: '294px'}}>
        <Appbar.Header style={this.styles.appBar}>
          <Appbar.Content title={logo} />
          <View style={this.styles.topBar}>
            <Avatar.Image size={64} source={require('../assets/avatar.png')} style={this.styles.avatar}/>
            <Title style={this.styles.userName}>Olá, André</Title>
            <Caption style={this.styles.userEmail}>lcn.andre@gmail.com</Caption>
            <View style={this.styles.ruler} />
            <Title style={this.styles.title}>Feed de Insights</Title>
          </View>
          <Appbar.Action icon='plus' color='#ee4c78' onPress={this.addInsight} />
        </Appbar.Header>
      </ImageBackground>
    );
  }
}
