import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

class LoadingPage extends React.Component {


    render() {
        console.log(this.props)
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#d63031" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default LoadingPage;