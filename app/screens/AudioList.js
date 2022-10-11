import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { AudioContext } from '../context/AudioProvider'
import { RecyclerListView , LayoutProvider } from 'recyclerlistview'
import AudioListItem from '../components/AudioListItem'
import Screen from '../components/Screen'
import OptionModal from '../components/OptionModal'

export default class AudioList extends Component {
  static contextType = AudioContext

  constructor(props){
    super(props);
    this.state = {
      optionModalVisible: false
    }
  }



  layoutProvider = new LayoutProvider((i)=> 'audio', (type, dim) => {
    dim.width = Dimensions.get('window').width
    dim.height = 70
  })

  rowRenderer = (type, item) =>{
    return <AudioListItem
              title={item.filename} 
              duration={item.duration}
              onOptionPress = {() => {
                this.setState({ ...this.state, optionModalVisible: true})
                console.log("Opening option");
              }}
              />
    // <Text>{item.filename}</Text>
  }
  render() {
    return <AudioContext.Consumer>
      {({dataProvider}) => {
        return <Screen>
            <RecyclerListView dataProvider={dataProvider} layoutProvider={this.layoutProvider} rowRenderer={this.rowRenderer} />
            <OptionModal visible={this.state.optionModalVisible}/>
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