import React, { useEffect } from 'react'
import { View, Text } from 'react-native'

const CoinsScreen = ({ route }) => {

    useEffect(() => {
        console.log("coin", route.params)
    }, [])

    return (
        <View>
            <Text>
                Coin Detail Screen
            </Text>
        </View>
    )
}

export default CoinsScreen
