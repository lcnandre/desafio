import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Feed from './screens/feed';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ee4c78',
    accent: '#420a49',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Feed></Feed>
    </PaperProvider>
  );
}


