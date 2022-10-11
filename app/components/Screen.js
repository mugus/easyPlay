import React from 'react'
import { View, StatusBar } from 'react-native'
import color from '../misc/color'

export default function Screen({children}) {
  return (
    <View style={{flex: 1, backgroundColor: color.APP_BG, paddingTop: StatusBar.currentHeight}}>{children}</View>
  )
}
