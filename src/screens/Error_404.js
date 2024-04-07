import { StatusBar, StyleSheet, Text, View, Image, ImageBackground, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
const homeBg = require('./kidsbg.jpg');
const Error_404 = () => {
  const rotateValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  // useEffect(() => {
  //   Animated.loop(
  //     Animated.sequence([
  //       Animated.timing(scaleValue, {
  //         toValue: 0.6, 
  //         duration: 1000, 
  //         useNativeDriver: true, // Use native driver for better performance
  //       }),
  //       Animated.timing(rotateValue, {
  //         toValue: 1, // Rotate to 360 degrees
  //         duration: 1000, // Duration of the rotation in milliseconds
  //         useNativeDriver: true, // Use native driver for better performance
  //       }),
  //       Animated.timing(scaleValue, {
  //         toValue: 1, // Scale back up to 1
  //         duration: 1000, // Duration of the animation in milliseconds
  //         useNativeDriver: true, // Use native driver for better performance
  //       }),
        
  //     ])
  //   ).start(); // Start the animation
  // }, []);
  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scaleValue, {
            toValue: 0.6, // Scale down to 0.8
            duration: 1500, // Duration of the animation in milliseconds
            useNativeDriver: true, // Use native driver for better performance
          }),
          Animated.timing(scaleValue, {
            toValue: 1, // Scale back up to 1
            duration: 2500, // Duration of the animation in milliseconds
            useNativeDriver: true, // Use native driver for better performance
          }),
        ]),
        Animated.timing(rotateValue, {
          toValue: 1, // Rotate to 360 degrees
          duration: 2500, // Duration of the rotation in milliseconds
          useNativeDriver: true, // Use native driver for better performance
        })
      ])
    ).start(); // Start the animation
  }, []);
  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // Map time range to rotation range
  });

  return (
    <SafeAreaView>
      <Image
        source={homeBg}
        style={{
          position: 'absolute',
          width: "100%",
          height: "100%",
          resizeMode: 'cover',
          opacity: .7,
        }}
      />
      <View style={{ height: "100%", width: "100%", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
        <StatusBar hidden={true} />
        <View style={{ height: "100%", width: "85%", justifyContent: "center",  }}>
          <View style={{ flexDirection: 'row', height: "65%", width: "80%", alignItems: 'center' }}>
            <Image
              style={{ height: "100%", width: "30%" }}
              source={require('./image1.png')}
            />
            <View style={{ width: "100%", height: "100%"}}>
            <View style={{flex: 1, justifyContent:"center", alignItems: "center" }}>
            <Animated.Image
              style={{height: "55%", width:"100%", transform:[{scale:scaleValue}, { rotate: rotate }]}}
              source={require('./kkk-removebg-preview.png')}
            />
            </View>
              {/* <Text style={{ color: "black", marginLeft: 25, fontSize: 25, fontWeight: 800, }}>Something Went Wrong...!!!</Text> */}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Error_404

const styles = StyleSheet.create({})
