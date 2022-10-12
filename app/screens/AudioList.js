import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { AudioContext } from '../context/AudioProvider'
import { RecyclerListView , LayoutProvider } from 'recyclerlistview'
import AudioListItem from '../components/AudioListItem'
import Screen from '../components/Screen'
import OptionModal from '../components/OptionModal'
import { Audio } from 'expo-av';
import {play, pause, resume} from '../misc/AudioController'

export default class AudioList extends Component {
  static contextType = AudioContext

  constructor(props){
    super(props);
    this.state = {
      optionModalVisible: false,
    }
    this.currentItem = {}
  }



  layoutProvider = new LayoutProvider((i)=> 'audio', (type, dim) => {
    dim.width = Dimensions.get('window').width
    dim.height = 70
  })


  handleAudioPress = async audio => {
    const {playbackObj, soundObj, currentAudio,updateState} = this.context
    // playing audio
    if(soundObj === null){
      const playbackObj = new Audio.Sound()
      const status = await play(playbackObj, audio.uri)
        // console.log('Play audio pressed');
        return updateState(
          this.context,
          {
            currentAudio: audio,
            playbackObj: playbackObj,
            soundObj: status
          }
        )

      }

      // Pause audio
    if(soundObj.isLoaded && soundObj.isPlaying){
      // AudioController.pause()
      const status = await pause(playbackObj)
      return updateState(
        this.context,
        {
          soundObj: status
        }
      )

      // console.log("Audio already playing");
    }

    // resume audio
    if(soundObj.isLoaded && !soundObj.isPlaying && 
      currentAudio.id === audio.id){
      const status = await resume(playbackObj);
      return updateState(
        this.context,
        {
          soundObj: status
        }
      )

    }

      // console.log('Play audio pressed', audio);
    }


  rowRenderer = (type, item) =>{
    return <AudioListItem
              title={item.filename} 
              duration={item.duration}
              onAudioPress ={()=>this.handleAudioPress(item)}
              onOptionPress = {() => {
                this.currentItem = item
                this.setState({ ...this.state, optionModalVisible: true})
                console.log("Opening option");
              }}
              />
    // <Text>{item.filename}</Text>
  }
  render() {
    return <AudioContext.Consumer>
      {({dataProvider}) => {
        return <Screen>
            <RecyclerListView dataProvider={dataProvider} layoutProvider={this.layoutProvider} rowRenderer={this.rowRenderer} />
            <OptionModal
              onPlayPress={() => console.log("Audio Playing")}
              onPlaylistPress= {() => console.log("Add to Playlist")}
              currentItem = {this.currentItem}
              onClose={()=> this.setState({ ...this.state, optionModalVisible: false})}
              visible={this.state.optionModalVisible}/>
          </Screen>
      }}
    </AudioContext.Consumer>

  }
}

const styles =  StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})