import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import Http from '../../libs/http'

const CoinsScreen = ({ navigation }) => {

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        const coins = await Http.instance.get("https://api.coinlore.net/api/tickers/")
    }

    const handlePress = () => {
        console.log("Apretado")
        navigation.navigate('CoinDetail')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleText} >
                Coins Screen
            </Text>
            <Pressable style={styles.btn} onPress={handlePress} >
                <Text style={styles.btnText} >
                    Ir a detail
                </Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red"
    },
    titleText: {
        color: "#fff",
        textAlign: "center"
    },
    btn: {
        padding: 8,
        backgroundColor: "blue",
        borderRadius: 8,
        margin: 16
    },
    btnText: {
        color: "white",
        textAlign: "center"
    }
})

export default CoinsScreen
