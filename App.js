import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';
import { Provider } from 'react-redux';

import { configureStore } from './redux/configureStore';
import ReduxLearn from './screens/ReduxLearn';

export default function App() {
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

  return (
    <Provider store={configureStore}>
      <ReduxLearn />
    </Provider>
  );
}


