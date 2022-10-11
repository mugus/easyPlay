import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigator';
import AudioProvider from './app/context/AudioProvider';
import AudioListItem from './app/components/AudioListItem';
import { Text, View, StyleSheet, Button } from 'react-native';
// import { Audio } from 'expo-av';
// import { Provider } from 'react-redux';

// import { configureStore } from './redux/configureStore';
// import ReduxLearn from './screens/ReduxLearn';
// import Home from './screens/Home';

export default function App() {
  return <AudioProvider>
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  </AudioProvider>

  // return <View style={{paddingTop: 70}}>
  //   <AudioListItem />
  //   <AudioListItem />
  //   <AudioListItem />
  //   <AudioListItem />
  //   <AudioListItem />
  //   <AudioListItem />
  //   <AudioListItem />
  // </View>
  // const [sound, setSound] = React.useState();




  // async function playSound() {
  //   console.log('Loading Sound');
  //   const { sound } = await Audio.Sound.createAsync(
  //      require('./assets/Katapilla.mp3')
  //   );
  //   setSound(sound);

  //   console.log('Playing Sound');
  //   await sound.playAsync(); }

  // React.useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log('Unloading Sound');
  //         sound.unloadAsync(); }
  //     : undefined;
  // }, [sound]);

  // return (
    // <Provider store={configureStore}>
    //   <Home />
    // </Provider>
  // );
}


