import React from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Professor from './pages/professor/Professor';
import Aluno from './pages/aluno/Aluno';
import Agenda from './pages/agenda/Agenda';
import {cores} from './styles';
import Sair from './components/sair'
import MenuIcon from './components/menuIcon'
import Titulo from './components/titulo'

const Routes = StackNavigator({
    Login: {screen: Login},
    Menu: {screen: Menu},
    Logado: {
        screen: TabNavigator({
            Agenda: {screen: Agenda},
            Alunos: {screen: Aluno},
            Professoras: {screen: Professor},
        }, {
            tabBarPosition: 'bottom',
            tabBarOptions: {
                showLabel: true,
                showIcon: true,
                activeTintColor: cores.white,
                inactiveTintColor: cores.whiteTransparent,
                indicatorStyle: {
                    opacity: 0,
                },
                style: {
                    backgroundColor: cores.secundaria,
                },
            },
        })
    }
}, {
    initialRouteName: 'Login',
    navigationOptions: ({navigation}) => ({
        headerStyle: {
            paddingHorizontal: 20,
            backgroundColor: cores.secundaria,
        },
        headerTitle: <Titulo navigation={navigation}/>,
        headerRight: <Sair navigation={navigation}/>,
        headerLeft: <MenuIcon navigation={navigation}/>
    }),
});

export default Routes;
