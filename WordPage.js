import React from 'react';
import { View, Text, StyleSheet } from 'react-native';



class WordPageScreen extends React.Component {

    componentDidMount = () => {

        console.log(this.props.navigation.state.params.english)
    }
    render() {
        const params = this.props.navigation.state.params
        return (<View style={styles.container}>
            <View style={styles.englishWordContainer}>
                <Text style={styles.englishTitle}>{params.english}</Text>
            </View>
            <View style={styles.krioluWordContainer}>
                <Text style={styles.krioluTitle}>{params.kriolu}</Text>
            </View>


        </View>)
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        backgroundColor: 'purple'
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    englishWordContainer: {
        flex: 0.5,
        backgroundColor: 'red'
    },
    krioluWordContainer: {
        flex: 0.5
    },
    englishTitle: {
        fontWeight: "bold",
        fontSize: 30,

    },
    krioluTitle: {
        fontWeight: "bold",
        fontSize: 30,
        color: "blue"


    },
})

export default WordPageScreen;