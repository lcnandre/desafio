import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';

import FeedTopBar from './components/feed-top-bar';
import GenericTopBar from './components/generic-top-bar';
import Feed from './screens/feed';
import AddInsight from './screens/add-insight';
import store from './store';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ee4c78',
    accent: '#420a49',
  },
};

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <StatusBar style='auto' backgroundColor='#420a49' />
          <Stack.Navigator initialRouteName='feed' screenOptions={screenOptions}>
            <Stack.Screen name='feed' component={Feed} />
            <Stack.Screen name='add-insight' component={AddInsight} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

const screenOptions: NativeStackNavigationOptions = {
  header: (props: any) => {
    const route = props.navigation.getState().routes[props.navigation.getState().index].name;

    if (route === 'feed') {
      return <FeedTopBar {...props}></FeedTopBar>;
    }

    return <GenericTopBar {...props}></GenericTopBar>
  },
};
