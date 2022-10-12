import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { AudioContext } from '../context/AudioProvider'
import { RecyclerListView , LayoutProvider } from 'recyclerlistview'
import AudioListItem from '../components/AudioListItem'
import Screen from '../components/Screen'
import OptionModal from '../components/OptionModal'
import { Audio } from 'expo-av';
import {play, pause, resume, playNext} from '../misc/AudioController'

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
    const {playbackObj, soundObj, currentAudio,updateState, audioFiles} = this.context
    // playing audio
    if(soundObj === null){
      const playbackObj = new Audio.Sound()
      const status = await play(playbackObj, audio.uri)
      const index = audioFiles.indexOf(audio)
        console.log('Play audio pressed', index);
        return updateState(
          this.context, {
            currentAudio: audio,
            playbackObj: playbackObj,
            soundObj: status,
            isPlaying: true,
            currentAudioIndex: index
          }
        )

      }

      // Pause audio
    if(soundObj.isLoaded && soundObj.isPlaying && currentAudio.id === audio.id){
      // AudioController.pause()
      const status = await pause(playbackObj)
      return updateState(
        this.context,
        {
          soundObj: status,
          isPlaying: false
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
          soundObj: status,
          isPlaying: true
        }
      )

    }


    // Select another audio
    if(soundObj.isLoaded && currentAudio.id !== audio.id){
      const status = await playNext(playbackObj, audio.uri)
      const index = audioFiles.indexOf(audio)
      return updateState(
        this.context,
        {
          currentAudio: audio,
          soundObj: status,
          isPlaying: true,
          currentAudioIndex: index
        }
      )
    }
      // console.log('Play audio pressed', audio);
    }


  rowRenderer = (type, item, index, extendedState) =>{
    // console.log(extendedState);
    return <AudioListItem
              title={item.filename}
              isPlaying= {extendedState.isPlaying}
              activeListItem={this.context.currentAudioIndex === index}
              duration={item.duration}
              onAudioPress ={()=>this.handleAudioPress(item)}
              onOptionPress = {() => {
                this.currentItem = item
                this.setState({ ...this.state, optionModalVisible: true})
                // console.log("Opening option");
              }}
              />
    // <Text>{item.filename}</Text>
  }
  render() {
    return <AudioContext.Consumer>
      {({dataProvider, isPlaying}) => {
        return <Screen>
            <RecyclerListView
                dataProvider={dataProvider}
                layoutProvider={this.layoutProvider}
                rowRenderer={this.rowRenderer}
                extendedState = {{isPlaying}}
                />
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