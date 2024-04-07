import { View, Text, FlatList, Dimensions, Image, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
// import LinearGradient from 'react-native-linear-gradient';

import Vdocard from '../components/Vdocard';
import HeaderComp from '../components/HeaderComp';
import Sound from 'react-native-sound';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import {
  AppOpenAd,
  TestIds,
  AdEventType,
  BannerAd, InterstitialAd, BannerAdSize
} from 'react-native-google-mobile-ads';
// import { InterstitialAd } from 'react-native-google-mobile-ads';
const homeBg = require('../kidsbg.jpg');


// personal text id 
// const adUnitId = __DEV__
//   ? TestIds.APP_OPEN
//   : 'ca-app-pub-1737096590728070~1284968332';


// google test id 
// const adUnitId = __DEV__
//   ? TestIds.APP_OPEN
//   : '	ca-app-pub-3940256099942544/9214589741';


const adUnitId = TestIds.BANNER;


const Home = props => {
  console.log(`params data`, props.route.params.data);




  //////////////////////////////////////////////////////////////////////////

  //                        interstitial ad code   

  //////////////////////////////////////////////////////////////////////////          
  // after 5 mins

  useEffect(() => {
    const intervalId = setInterval(() => {

      const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
        keywords: ['fashion', 'clothing'],
      });
      console.log('====================================')
      console.log("hello");
      console.log('====================================')
    }, 50000)


    return () => clearInterval(intervalId);
  }, []);


  // setInterval(() => {

  //   // const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-1737096590728070~1284968332';

  //  
  // }, [2000])



  //////////////////////////////////////////////////////////////////////////





  return (
    
    <View>

      <StatusBar hidden={true} />
      {/* <BgAudio options={audio_options}></BgAudio> */}
      <View
        style={{
          width: '100%',
          height: 55,
          zIndex: 1,
        }}>
        <HeaderComp />
      </View>

      {/* bg image */}
      <Image
        source={homeBg}
        style={{
          position: 'absolute',
          width: windowWidth,
          height: windowHeight,
          resizeMode: 'cover',
          opacity: 1,
        }}
      />

      <View
        style={{
          height: 220,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: 25,
        }}>
        <View
          style={
            {
              // flex: 1,
              // paddingHorizontal: 10,
              // justifyContent: 'center',
              // alignItems: 'center',
            }
          }>
          <View
            style={{
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <FlatList
              data={props.route.params.data}
              style={{ marginTop: 10 }}
              renderItem={({ item }) => (
                <Vdocard thisData={item} wholeData={props.route.params.data} />
              )}
              keyExtractor={item => item.id}
              horizontal
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    // borderWidth: 0,
                    borderColor: '#fff0',
                    marginRight: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 12,
                    paddingHorizontal: 2,
                  }}></View>
              )}
            />
          </View>
        </View>
      </View>
      <View style={{ flex:1,alignItems:"center", opacity: .4, flexDirection: 'column', height: 50,width:"100%" }}>
        {/* banner running  0 active adds */}
        <BannerAd
          unitId={adUnitId}
          // size="BANNER" // Specify the size of the banner ad
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />


      </View>
    </View>
  );
};

export default Home;


