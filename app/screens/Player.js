import React from 'react'
import { View, StyleSheet, Text} from 'react-native';

const Player = ()=> {
  return (
    <View style={styles.container}>
        <Text>Player will be here</Text>
    </View>
  )
}
const styles =  StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
export default Player;