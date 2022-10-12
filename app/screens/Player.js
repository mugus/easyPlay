import React, { useContext } from 'react'
import { View, StyleSheet, Text, Dimensions} from 'react-native';
import Screen from '../components/Screen'
import color from '../misc/color';
import { Fontisto } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import PlayerButton from '../components/PlayerButton';
import { AudioContext } from '../context/AudioProvider';
const {width} = Dimensions.get('window');

const Player = ()=> {
  const context = useContext(AudioContext);
  const { playbackPosition, playbackDuration } = context

  const calculateSeebBar =()=> {
    if(playbackPosition !== null && playbackDuration !== null){
      return playbackPosition / playbackDuration
    }
    return 0
  }

  return <Screen>
      <View style={styles.container}>
        <Text style={styles.audioCount}>{`${context.currentAudioIndex + 1}/ ${context.totalAudioCount}`}</Text>
        <View style={styles.midBannerContainer}>
          <Fontisto name="music-note" size={300} color={context.isPlaying ? color.ACTIVE_BG : color.FONT_MEDIUM} />
        </View>
        <View style={styles.audioPlayerContainer}>
          <Text numberOfLines={1} style={styles.audioPlayerText}>
            {context.currentAudio.filename}
          </Text>
          <Slider
            style={{width: width, height: 40}}
            minimumValue={0}
            maximumValue={1}
            value={calculateSeebBar()}
            minimumTrackTintColor={color.FONT_MEDIUM}
            maximumTrackTintColor={color.ACTIVE_BG}
          />
          <View style={styles.audioControllers} >

            <PlayerButton iconType='PREVIOUS' />
            <PlayerButton
              onPress={() => console.log("Data")}
              style={{marginHorizontal: 25}} 
              iconType={context.isPlaying ? 'PLAY' : 'PAUSE'} />
            <PlayerButton iconType='NEXT' />

          </View>
        </View>
      </View>
  </Screen>
}
const styles =  StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    audioCount: {
      textAlign: 'right',
      padding: 5,
      color: color.FONT_LIGHT,
      fontSize: 14,
    },
    midBannerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    audioPlayerContainer: {

    },
    audioPlayerText: {
      fontSize: 16,
      color: color.FONT,
      padding: 15
    },
    audioControllers: {
      width: width,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 20
    }
})
export default Player;