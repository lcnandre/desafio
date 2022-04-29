import { StatusBar } from 'expo-status-bar';
import { DefaultTheme, Provider as PaperProvider, Avatar, Appbar, Title, Caption, Card, Paragraph, Chip, Searchbar, IconButton } from 'react-native-paper';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ee4c78',
    accent: '#420a49',
  },
};

export default function App() {
  const logo = (
    <Image source={require('./assets/logo.svg')} style={styles.logo}  />
  );

  return (
    <PaperProvider theme={theme}>
      <ImageBackground source={require('./assets/background.svg')}>
        <Appbar.Header style={styles.appBar}>
            <Appbar.Content title={logo} />
            <View style={styles.topBar}>
              <Avatar.Image size={64} source={require('./assets/avatar.png')} style={styles.avatar} />
              <Title style={styles.userName}>Olá, André</Title>
              <Caption style={styles.userEmail}>lcn.andre@gmail.com</Caption>
              <View style={styles.ruler}/>
              <Title style={styles.title}>Feed de Insights</Title>
            </View>
            <Appbar.Action icon='plus' color='#ee4c78' />
        </Appbar.Header>
      </ImageBackground>

      <View style={styles.container}>
        <StatusBar style='auto' backgroundColor='#420a49' />
        <View style={styles.cardsContainer}>
          <Card style={styles.cards}>
            <Card.Content>
              <Paragraph style={styles.cardText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in varius nunc. Pellentesque fringilla nec est fermentum convallis. Sed dignissim placerat elit, sed tempor purus maximus quis.</Paragraph>
              <Chip style={styles.tags} textStyle={styles.tagsText}>Example Chip</Chip>
            </Card.Content>
          </Card>
        </View>

        <View style={styles.loadMore}>
          <IconButton icon='dots-horizontal' size={20} color='#ccc' style={styles.loadMoreIcon} />
          <Paragraph style={styles.loadMoreText}>Toque para exibir mais insights</Paragraph>
        </View>

        <View style={styles.searchBar}>
          <Searchbar
            placeholder="Pesquise por termos ou categorias"
          />
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardsContainer: {
    overflow: 'visible',
    width: '94%',
    top: -70
  },
  avatar: {
    borderColor: '#ee4c78',
    borderWidth: 2,
    borderRadius: 64,
  },
  logo: {
    width: 60,
    height: 36,
  },
  cards: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 'fit-content',
    marginBottom: 8,
  },
  cardText: {
    textAlign: 'center'
  },
  loadMore: {
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadMoreIcon: {
    margin: 0,
    padding: 0
  },
  loadMoreText: {
    color: '#999',
    fontWeight: 'bold'
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
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    left: '-7%',
  },
  searchBar: {
    padding: '8px 8px',
    width: '95%',
    position: 'absolute',
    bottom: 6
  }
});
