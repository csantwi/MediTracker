import React from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import { ThemedText } from '../ThemedText'
import { ThemedView } from '../ThemedView'



export default function SwipeTab() {

const { height, width} = useWindowDimensions()

    const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:"60%",
        borderTopWidth: 1,
        borderRightWidth:1,
        borderLeftWidth: 1,
        borderColor: '#ccc',
        padding: 16,
        overflow: 'hidden',
        borderRadius: 36,
        position:"absolute",
        bottom: 0,
    }
})

  return (
    <ThemedView style={styles.container}>
            <ThemedText>Swipe</ThemedText>
      
    </ThemedView>
  )
}

