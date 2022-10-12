// Play audio
export const play = async (playbackObj, uri) => {
    try {
       return await playbackObj.loadAsync(
            {uri: uri},
            {shouldPlay: true}
            );
    } catch (error) {
        console.log(error.message);
    }
}

// Pause audio
export const pause = async (playbackObj) => {
    try {
       return await playbackObj.setStatusAsync(
            {shouldPlay: false}
            );
    } catch (error) {
        console.log(error.message);
    }
}


// Resume audio
export const resume = async (playbackObj) => {
    try {
       return await playbackObj.playAsync(
            {shouldPlay: false}
            );
    } catch (error) {
        console.log(error.message);
    }
}
