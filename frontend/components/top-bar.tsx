import { Avatar, Appbar, Title, Caption } from 'react-native-paper';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';

export default function TopBar() {
  const logo = (
    <Image source={require('../assets/logo.svg')} style={styles.logo}  />
  );

  return(
    <ImageBackground source={require("../assets/background.svg")}>
      <Appbar.Header style={styles.appBar}>
        <Appbar.Content title={logo} />
        <View style={styles.topBar}>
          <Avatar.Image size={64} source={require("../assets/avatar.png")} style={styles.avatar}/>
          <Title style={styles.userName}>Olá, André</Title>
          <Caption style={styles.userEmail}>lcn.andre@gmail.com</Caption>
          <View style={styles.ruler} />
          <Title style={styles.title}>Feed de Insights</Title>
        </View>
        <Appbar.Action icon="plus" color="#ee4c78" />
      </Appbar.Header>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderColor: '#ee4c78',
    borderWidth: 2,
    borderRadius: 64,
  },
  logo: {
    width: 60,
    height: 36,
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
    flex: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
