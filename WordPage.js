import React from 'react';
import { View, Text, StyleSheet } from 'react-native';



class WordPageScreen extends React.Component {

    componentDidMount = () => {

        console.log(this.props.navigation.state.params.english)
    }
    render() {
        const params = this.props.navigation.state.params
        return (

            <View style={styles.container}>
                <View style={styles.englishWordContainer}>
                    <Text style={styles.englishTitle}>{params.english}</Text>
                </View>
                <View style={styles.krioluWordContainer}>
                    <View style={styles.krioluTopThird}></View>
                    <View style={styles.krioluMiddle}>
                        <Text style={styles.krioluTitle}>{params.kriolu}</Text>
                    </View>
                    <View style={styles.krioluLastThird}></View>

                </View>


            </View>
        )
    }

}


const styles = StyleSheet.create({
    background: {
        backgroundColor: '#003893'
    },
    container: {
        flex: 1,
        backgroundColor: '#003893',
    },
    englishWordContainer: {
        flex: 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#003893'
    },
    krioluWordContainer: {
        flex: 0.25,
        backgroundColor: '#FFFFFF',
        color: '#F7D116',
    },
    krioluTopThird: {
        flex: 0.33
    },
    krioluMiddle: {
        flex: 0.33,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CF2027'

    },

    englishTitle: {
        fontWeight: "bold",
        fontSize: 30,
        color: '#F7D116',
    },
    krioluTitle: {
        fontWeight: "bold",
        fontSize: 30,
        color: "#FFFFFF"

    },
})

export default WordPageScreen;