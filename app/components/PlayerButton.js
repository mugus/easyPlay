import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import color from '../misc/color';

export default function PlayerButton(props) {
    const {iconType, size=40, iconColor=color.FONT,onPress} = props
    const getIconName = (type) => {
        switch(type){
            case 'PLAY':
                return 'pausecircle';
            case 'PAUSE':
                return 'playcircleo';
            case 'NEXT':
                return 'fastforward';
            case 'PREVIOUS':
                return 'fastbackward';
        }
    }
  return (
    <AntDesign 
        {...props}
        onPress={onPress} 
        name={getIconName(iconType)} 
        size={size} color={iconColor} 
        />
  )
}
