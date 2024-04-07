import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const splashimg = require('../assets/imgs/splashBG2.jpg')

const SplashScreen = () => {
  return (
    <View style={{backgroundColor:'black', flex: 1, justifyContent:'center', alignItems: 'center'}}>
      <Image source={splashimg} style={{width: windowWidth, height: windowHeight, resizeMode:"cover"}} />
    </View>
  )
}

export default SplashScreen;