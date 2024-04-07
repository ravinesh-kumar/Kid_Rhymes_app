import { View, Text, Image } from 'react-native'
import React from 'react'
import SplashScreen from '../../screens/SplashScreen'
import { createStackNavigator } from '@react-navigation/stack'

const screens ={
    Splash: {
        screen: SplashScreen,
        navigationOptions: ()=>{
            return {
                headerTitle: () => <Image style={{ height:40, width: 40 }} source={require("../../assets/imgs/logo.png")} />
            }
        }
    }
}

const SplashStack = createStackNavigator(screens, {
    defaultNavigationOptions:{
        headerTintColot: '#444',
    }
})

export default SplashStack