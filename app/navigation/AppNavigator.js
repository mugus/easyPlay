import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AudioList from '../screens/AudioList'
import Player from '../screens/Player'
import PlayList from '../screens/PlayList'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab =  createBottomTabNavigator()
const AppNavigator = ()=> {
  return <Tab.Navigator>
    <Tab.Screen name="AudioList" component={AudioList} options={{
        tabBarIcon: () => {
            return <MaterialCommunityIcons name="playlist-music" size={28} color="black" />
        }
    }}/>
    <Tab.Screen name="Player" component={Player} options={{
        tabBarIcon: () => {
            return <MaterialIcons name="headset" size={28} color="black" />
        }
    }}/>
    <Tab.Screen name="PlayList" component={PlayList} options={{
        tabBarIcon: () => {
            return <FontAwesome name="th-list" size={28} color="black" />
        }
    }}/>
  </Tab.Navigator>
}
export default AppNavigator;