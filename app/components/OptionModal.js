import React from 'react';
import { View, Text, StyleSheet, Dimensions, Modal, StatusBar } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import color from '../misc/color'


export default function OptionModal({visible}) {
    return(
        <>
            <StatusBar hidden />
            <Modal animationType='slide' transparent visible={visible}>
                <View style={styles.modal}>
                    <Text style={styles.title} numberOfLines={2}>Dynamic title of audio</Text>
                    <View style={styles.optionContainer}>
                        <Text style={styles.option}>Play</Text>
                        <Text style={styles.option}>Add to Playlist</Text>
                    </View>
                </View>
                <View style={styles.modalBG} />
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: color.APP_BG,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        zIndex: 1000
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 20,
        paddingBottom: 0,
        color: color.FONT_MEDIUM
    },
    optionContainer: {
        padding: 20
    },
    option: {
        fontSize: 16,
        fontWeight: 'bold',
        color: color.FONT,
        paddingVertical: 10,
        letterSpacing: 1
    },
    modalBG: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: color.MODAL_BG 
    }
})