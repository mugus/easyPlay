import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AudioList from '../screens/AudioList'
import Player from '../screens/Player'
import PlayList from '../screens/PlayList'
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Tab =  createBottomTabNavigator()
const AppNavigator = ()=> {
  return <Tab.Navigator>
    <Tab.Screen name="Songs" component={AudioList} options={{
        tabBarIcon: () => {
            return <Feather name="list" size={28} color="black" />
        }
    }}/>
    <Tab.Screen name="Player" component={Player} options={{
        tabBarIcon: () => {
            return <AntDesign name="playcircleo" size={28} color="black" />
        }
    }}/>
    <Tab.Screen name="Playlist" component={PlayList} options={{
        tabBarIcon: () => {
            return <MaterialCommunityIcons name="playlist-music" size={28} color="black" />
        }
    }}/>
  </Tab.Navigator>
}
export default AppNavigator;