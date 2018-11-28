import React, {Component} from 'react';
import {StyleSheet, AsyncStorage, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import PropTypes from 'prop-types';
import {cores} from '../styles';
import {NavigationActions} from "react-navigation";

export default class Sair extends Component {
    static propTypes = {
        navigation: PropTypes.shape({
            dispatch: PropTypes.func
        }).isRequired
    };

    sair = async () => {
        await AsyncStorage.clear();

        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Login'})]
        });
        this.props.navigation.dispatch(resetAction);

    };

    render() {
        return (
            <TouchableOpacity onPress={this.sair}>
                <Icon active name="md-exit" style={styles.icon} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        color: cores.white
    }
});
