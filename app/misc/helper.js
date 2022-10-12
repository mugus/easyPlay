import { AsyncStorage } from '@react-native-community/async-storage';

export const storeAudioForNextOpen = async(audio, index) => {
    await AsyncStorage.setItem('previousAudio',JSON.stringify({
        audio, index
    }));
}