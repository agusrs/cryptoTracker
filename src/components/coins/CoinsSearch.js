import React, {useState} from 'react'
import { TextInput, View, Platform, StyleSheet } from 'react-native'
import { onChange } from 'react-native-reanimated'
import Colors from '../../res/colors'

const CoinsSearch = ({ onChange }) => {
    
    const [query, setQuery] = useState("")

    const handleText = (aQuery) => {
        setQuery(aQuery)

        if (onChange) {
            onChange(query)
        }
    }
    
    return (
        <View>
            <TextInput  
                style={[
                    styles.textInput,
                    Platform.OS == 'ios' ? styles.textInputIOS : styles.textInputAndroid
                ]}
                value={query}
                onChangeText={handleText}
                placeholder="Search coin"
                placeholderTextColor="#fff"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
      height: 46,
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      paddingLeft: 16,
      color: "#fff"
    },
    textInputAndroid: {
      borderBottomWidth: 2,
      borderBottomColor: Colors.zircon
    },
    textInputIOS: {
      margin: 8,
      borderRadius: 8
    }
  });

export default CoinsSearch
