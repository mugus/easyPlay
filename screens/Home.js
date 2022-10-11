import React from 'react'
import { Audio } from 'expo-av';
import { Text, Button,StyleSheet, View } from 'react-native'

const Home = () => {
      const [sound, setSound] = React.useState();




const playSound = async()  => {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
        require('../assets/Katapilla.mp3'),
      {
        shouldPlay: true,
        isLooping: true,
        isPlaying: true
      },
       
    );
    setSound(sound);

    console.log('Playing Sound', sound);
    await sound.playAsync();
}

const PauseAudio = async () => {
    
    try {
        const result = await sound.pauseAsync();
        if (result.isPlaying === false) {
            console.log('Paused Sound');
        }else{
            console.log('Audio played');
        }
    } catch (error) {
        console.log(error);
    }
  };

  const ResumeAudio = async () => {
    try {
       await sound.resumeAsync();
        // if (result.isPlaying === false) {
        //     console.log('Paused Sound');
        // }else{
        //     await sound.playAsync();
        //     console.log('Audio played');
        // }
    } catch (error) {
        console.log(error);
    }
  }
const StopAudio = async() => {
    console.log('Log: Stop is ready');
    await await sound.unloadAsync();
}


  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
        <Text>Play</Text>
        <Button title="Play Sound" onPress={playSound} />
        <Button title="Pause Song" onPress={PauseAudio} />
        <Button title="Play again Song" onPress={ResumeAudio} />
        <Button title="Stop Song" onPress={StopAudio} />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 20
    },
  });
