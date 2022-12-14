import React, { Component,  createContext } from 'react'
import { Text, View, Alert } from 'react-native'
import * as MediaLibrary from 'expo-media-library'
import { getPermissionsAsync } from 'expo-av/build/Audio'
import { DataProvider } from 'recyclerlistview'
import { AsyncStorage } from '@react-native-community/async-storage';
// {
//     "canAskAgain": true,
//     "expires": "never",
//     "granted": false,
//     "status": "undetermined",
// }
export const AudioContext = createContext()
export default class AudioProvider extends Component {
    constructor (props) {
        super(props)
        this.state = {
            audioFiles: [],
            permissionError: false,
            dataProvider: new DataProvider((r1, r2) => r1 !== r2),
            playbackObj: null,
            soundObj: null,
            currentAudio: {},
            isPlaying: false,
            currentAudioIndex: null,
            playbackPosition: null,
            playbackDuration: null
        }
        this.totalAudioCount = 0
    }

    permissionAlert = () => {
        Alert.alert("Permission required", "This app needs Permission to read audio files", [
            {
                text: 'I am ready',
                onPress: () => this.getPermission()
            },{
                text: 'Cancel',
                onPress: () => this.permissionAlert()
            }
        ])
    }


    // Get Audio
    getAudioFiles = async () => {
        const {dataProvider, audioFiles } = this.state
        let media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio'
        })

        media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
            first: media.totalCount
        })
        this.totalAudioCount = media.totalCount;
        this.setState({ ...this.state, dataProvider: dataProvider.cloneWithRows([...audioFiles, ...media.assets]), audioFiles: [...audioFiles, ...media.assets]})
        // console.log('Media length: ', media.assets);
    }


    loadPreviousAudio = async() => {
        // TODO: we need to load audio form our async storage
        let previousAudio = await AsyncStorage.getItem('previousAudio')
        let currentAudio;
        let currentAudioIndex;
        
        if(previousAudio === null){
            currentAudio = this.state.audioFiles[0]
            currentAudioIndex = 0
        }else{
            previousAudio = JSON.parse(previousAudio)
            previousAudio = previousAudio.audio
            currentAudioIndex = previousAudio.index
        }

        this.setState({...this.state, currentAudio, currentAudioIndex})
    }


    getPermission = async () => {
        const permission = await MediaLibrary.getPermissionsAsync()
        if(permission.granted){
            // we wanna get all audio files
            this.getAudioFiles()
        }

        if(!permission.granted && permission.canAskAgain){
            //Display error
            this.setState({ ...this.state, permissionError: true})
        }

        if(!permission.granted && !permission.canAskAgain){
            const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync()
            if(status === 'denied' && canAskAgain){
                // Allow this app to access your audio files
                this.permissionAlert()
            }

            if(status === 'denied' && !canAskAgain){
                //Display error
                this.setState({ ...this.state, permissionError: true})
            }

            if(status === 'granted'){
                // Get all data
                this.getAudioFiles()
            }
        }
        // console.log(permission);
    }
    componentDidMount(){
        this.getPermission()
    }

    updateState = (prevState, newState = {})=> {
        this.setState({...prevState, ...newState})
    }
  render() {
    const { audioFiles, dataProvider, permissionError, playbackObj, soundObj,
         currentAudio, isPlaying, currentAudioIndex, playbackPosition, playbackDuration } = this.state
        
         
    if(permissionError) return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{ fontSize: 25, color: 'red', textAlign: 'center' }}>You don't have access to audio files</Text>
    </View>
    return <AudioContext.Provider 
                value={{
                    audioFiles,
                    dataProvider,
                    playbackObj,
                    soundObj,
                    currentAudio,
                    isPlaying,
                    currentAudioIndex,
                    totalAudioCount: this.totalAudioCount,
                    playbackPosition, 
                    playbackDuration,
                    updateState: this.updateState
                    }}>
        {this.props.children}
    </AudioContext.Provider>
  }
}
