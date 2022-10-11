import React, { Component,  createContext } from 'react'
import { Text, View, Alert } from 'react-native'
import * as MediaLibrary from 'expo-media-library'
import { getPermissionsAsync } from 'expo-av/build/Audio'


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
            permissionError: false
        }
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
        let media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio'
        })

        media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
            first: media.totalCount
        })
        this.setState({ ...this.state, audioFiles: media.assets})
        console.log('Media length: ', media.assets.length);
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
        console.log(permission);
    }
    componentDidMount(){
        this.getPermission()
    }
  render() {
    if(this.state.permissionError) return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{ fontSize: 25, color: 'red', textAlign: 'center' }}>You don't have access to audio files</Text>
    </View>
    return <AudioContext.Provider value={{audioFiles: this.state.audioFiles}}>
        {this.props.children}
    </AudioContext.Provider>
  }
}
