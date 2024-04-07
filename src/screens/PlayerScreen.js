import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
  ImageBackground,
  TouchableWithoutFeedback,
  Text,
  ActivityIndicator,
} from 'react-native';
import { Slider, Icon } from 'react-native-elements';
import React, { useState, useEffect, useRef } from 'react';
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  AppOpenAd,
  TestIds,
  AdEventType,
  BannerAd,
} from 'react-native-google-mobile-ads';
import Orientation from 'react-native-orientation-locker';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const homeBg = require('../kidsbg.jpg');
const wait1 = require('./pleaseWait1.png');
const wait2 = require('./pleaseWait2.png');
const wait3 = require('./pleaseWait3.png');
import { toggleAudioPlayback } from '../components/HeaderRight'; // Import the function
// const pleaseWait1 = require("./pe")
const adUnitId = __DEV__
  ? TestIds.APP_OPEN
  : 'ca-app-pub-1737096590728070~1284968332';



const PlayerScreen = props => {


  useEffect(() => {
    toggleAudioPlayback(true);
    return () => {
      toggleAudioPlayback(true);
    };
  }, []);


  const pleaseWait = () => {
    let i = 0;
    while (isLoading) {
      setTimeout(function () {

        setpleaseWaitUrl(`pleaseWait${i + 1}.png`);

        i++;
        i = i % 3;
      }, 1500);
      console.log(pleaseWaitUrl);
    }
  }
  const [isUpdating, setIsUpdating] = useState(false);
  const [paused, setPaused] = useState(false);
  const [player, setPlayer] = useState(0);
  const [FullScreen, setFullScreen] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const videoRef = useRef(null);
  const [controlsVisible, setControlsVisible] = useState(true);
  const controlsTimeoutRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPause, setIsPause] = useState(true);
  const [pleaseWaitUrl, setPleaseWaitUrl] = useState(wait1);




  /////////////////////////////////////////////////////////////////
  const [value, setValue] = useState(5);
  // const value = useRef(0);
  const color = () => {
    let r = interpolate(255, 0);
    let g = interpolate(0, 255);
    let b = interpolate(0, 0);
    return `rgb(${r},${g},${b})`;
  };

  const interpolate = (start: number, end: number) => {
    let k = (value - 0) / 10; // 0 =>min  && 10 => MAX
    return Math.ceil((1 - k) * start + k * end) % 256;
  };

  // console.log(value);
  /////////////////////////////////////////////////////////////////


  let vdoDta = props.route.params.vdodata;
  let vdourl = props.route.params.vdourl;
  let wholeData = props.route.params.wholeData;
  let searchIndex = wholeData.findIndex(val => val.id == vdoDta.id);


  // console.log(`url mil gya bhai`, vdourl);
  // ========================================================================================



  const navigationHook = useNavigation();


  const [nxtPrev, setNxtPrev] = useState({
    prevVdo: 0,
    current: props.route.params.vdodata.id,
    nxtVdo: 0,
  });
  // console.log(`next video id `, nxtPrev.prevVdo);
  useEffect(() => {
    handleNxtPrev();
  }, []);


  const goBack = () => {
    navigationHook.navigate('Home');
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.seek(currentPosition);
    }
  }, []);



  const onProgress = (data) => {
    setPlayer({ ...player, currentTime: data.currentTime });
  };
  const onEnd = () => {
    setCurrentPosition(0);
    setPaused(true);
  };


  const handleNxtPrev = (val = 'onload') => {
    if (isUpdating) return;

    setIsUpdating(true);


    setIsLoading(true); // Show loader

    setNxtPrev(prevState => {
      switch (val) {
        case 'onload':
          if (
            prevState.current > 0 &&
            prevState.current < wholeData.length - 1
          ) {

            return {
              ...prevState,
              prevVdo: prevState.current - 1,
              nxtVdo: prevState.current + 1,

            };
          } else if (prevState.current === 0) {

            return {
              ...prevState,
              prevVdo: 0,
              nxtVdo: 1,
            };
          } else if (prevState.current === wholeData.length - 1) {

            return {
              ...prevState,
              prevVdo: 0,
              nxtVdo: 1,
            };
          }
          break;

        case 'prev':
          if (prevState.current > 0 && prevState.current < wholeData.length - 1) {
            console.log("Enter in prev if 1", nxtPrev.prevVdo);
            return {
              ...prevState,
              nxtVdo: prevState.current,
              current: prevState.prevVdo,
              prevVdo: prevState.prevVdo - 1, // Update to the previous video index
            };
          } else if (prevState.current === 0) {
            console.log("Enter in prev zero condition", nxtPrev.prevVdo);
            return {
              ...prevState,
              prevVdo: 0,
              nxtVdo: 1,
            };
          } else if (prevState.current === wholeData.length - 1) {
            console.log("Enter in prev if 2", nxtPrev.prevVdo);
            return {
              ...prevState,
              nxtVdo: prevState.current,
              current: prevState.prevVdo,
              prevVdo: prevState.prevVdo - 1, // Update to the previous video index
            };
          }
          break;

        case 'nxt':
          if (
            prevState.current >= 0 &&
            prevState.current < wholeData.length - 1
          ) {

            console.log("Enter in nxt prev video", nxtPrev.prevVdo);
            console.log("Enter in nxt next video", nxtPrev.nxtVdo);
            console.log("Current video index", prevState.current);
            return {
              ...prevState,
              prevVdo: prevState.current,
              current: prevState.current + 1,
              nxtVdo: prevState.current + 2,



            };

          } else if (prevState.current === wholeData.length - 1) {
            console.log("Enter in last video, going back to the first one");
            return {
              ...prevState,
              prevVdo: wholeData.length - 1,
              current: 0,
              nxtVdo: 1,
            };
          }
          break;

        default:
          break;
      }
    });
    setTimeout(() => {
      // setIsLoading(false);
      setIsUpdating(false);
    }, 1500);
  };

  const onLoad = (data) => {
    console.log("Load");
    setIsLoading(false)
    setPlayer({ ...player, duration: data.duration, currentTime: data.currentTime });
    setVideoDuration(data.duration);

  };


  const toggleFullScreen = () => {

    if (FullScreen) {

      Orientation.lockToLandscape();

    }
    else {

      Orientation.lockToLandscape();
    }
    setFullScreen(!FullScreen)
  };

  ////////////////////////////////////////////////////////////
  // pause play button
  const togglePaused = () => {
    setPaused(prev => !prev);
    setIsPause(prev => !prev);
  }
  ////////////////////////////////////////////////////////////


  useEffect(() => {
    let timeout;
    if (controlsVisible) {
      // Hide controls after 5 seconds
      timeout = setTimeout(() => {
        setControlsVisible(false);
      }, 10000);
    }

    return () => clearTimeout(timeout);
  }, [controlsVisible]);

  const toggleControls = () => {

    setControlsVisible(!controlsVisible);
  };

  const goBackVideo = () => {
    if (FullScreen) {

      Orientation.lockToLandscape();

    }
    else {

      Orientation.lockToLandscape();
    }
    setFullScreen(!FullScreen)
  }

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i == 0) {
        setPleaseWaitUrl(wait2);
      } else if (i == 1) {
        setPleaseWaitUrl(wait3);
      } else if (i == 2) {
        setPleaseWaitUrl(wait1);
      }

      i++;
      i = i % 3;
    }, 1000);

    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures the effect runs only once


  const LoadStartttt = () => {
    console.log("heel");
    setIsLoading(true)
    // pleaseWait();

  }

  return (

    <ImageBackground source={homeBg} style={styles.screenBg}>

      <TouchableWithoutFeedback onPress={toggleControls}>

        <View style={{ flex: 1, position: 'relative' }}>


          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingTop: FullScreen ? 0 : 2,
              flexDirection: 'row',
              zIndex: 1,
            }}
          >
            <View style={styles.controlContainer}>
              <View>
                {/* previous button  */}
                {!FullScreen && <TouchableOpacity
                  onPress={() => handleNxtPrev('prev')}
                  style={{ height: 66, width: 66 }}
                >
                  <Image
                    source={require('../assets/imgs/back.png')}
                    style={{ width: '80%', height: '80%', position: "relative", resizeMode: 'contain', paddingLeft: 95 }}
                  />
                </TouchableOpacity>}
              </View>

            </View>
            {/* video image height */}
            {isLoading && (

              <View style={{ zIndex: 1, backgroundColor: "black", width: "100%", height: "100%", borderWidth: 1, marginTop: 0, justifyContent: "center", position: "absolute", top: 0, left: 0, flex: 1, justifyContent: "center", flexDirection: "row", alignItems: "center" }}>
                <Image source={require("./download-removebg-preview.png")} style={{ width: "15%", height: "50%", }} />
                {isLoading && (<Image source={pleaseWaitUrl} style={{ width: "45%", height: "20%", aspectRatio: 10, }} />)}
                {/*
                <Image source={require(`./pleaseWait1.png`)} style={{ width: "45%", height: "20%" ,aspectRatio:10,}} /> */}
                {/* <Text>Please Wait</Text> */}

              </View>
            )}


            {/* <ActivityIndicator source={require("./download-removebg-preview.png")} size="large" color="white" /> */}
            <TouchableWithoutFeedback>



              <View style={{ width: FullScreen ? (isLoading ? 0 : "100%") : "75%", height: FullScreen ? (isLoading ? 0 : "100%") : "85%", borderWidth: 1, marginTop: 0, justifyContent: "center", position: FullScreen ? "absolute" : "relative" }}>

                <TouchableWithoutFeedback onPress={toggleControls}>

                  <Video
                    source={{
                      // uri: nxtPrev.current,
                      uri: wholeData[nxtPrev.current].vdourl,
                      title: 'Custom Title',
                    }}
                    style={[styles.backgroundVideo]}
                    paused={paused}
                    repeat={true}
                    onLoadStart={LoadStartttt}
                    onLoad={onLoad}
                    onProgress={onProgress}
                    onEnd={onEnd}
                    ref={videoRef}
                    fullscreenOrientation={'landscape'}
                    resizeMode={'stretch'}
                    seekbarStyle={{ backgroundColor: 'red', width: 300 }}
                  />
                </TouchableWithoutFeedback>
                {controlsVisible && (
                  <View style={{ width: "100%", position: "absolute", paddingTop: 20, bottom: 40, zIndex: 1 }}>
                    <Slider
                      value={value}
                      onValueChange={setValue}
                      maximumValue={videoDuration}
                      minimumValue={0}
                      step={0.01}
                      allowTouchTrack
                      trackStyle={{ height: 5, backgroundColor: 'transparent' }}
                      thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
                      thumbProps={{
                        children: (
                          <Icon
                            name="heartbeat"
                            type="font-awesome"
                            size={20}
                            reverse
                            containerStyle={{ bottom: 20, right: 20 }}
                            color={color()}
                          />
                        ),
                      }}
                    />

                  </View>
                )}
                {controlsVisible && (
                  <View style={{ position: "absolute", flexDirection: "row", opacity: .6, backgroundColor: "gray", justifyContent: "center", bottom: 0, width: "100%" }}>

                    <View style={{ width: "90%", justifyContent: "space-evenly", paddingTop: 10, paddingBottom: 20, alignItems: "center", flexDirection: "row" }}>
                      <TouchableWithoutFeedback onPress={() => handleNxtPrev('prev')}>

                        {/* <ion-icon name="arrow-back-outline"></ion-icon> */}
                        <Ionicons name="arrow-back-outline" style={{ alignItems: "center", color: "black" }} size={26} />
                      </TouchableWithoutFeedback>


                      <TouchableWithoutFeedback onPress={togglePaused}>
                        {/* <ion-icon name="pause-circle-outline"></ion-icon> */}
                        <Ionicons name={isPause ? "pause-circle-outline" : "play-circle-outline"} style={{ alignItems: "center", color: "black" }} size={26} />
                      </TouchableWithoutFeedback>


                      <TouchableWithoutFeedback onPress={() => handleNxtPrev('nxt')}>

                        {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                        <Ionicons name="arrow-forward-outline" style={{ alignItems: "center", color: "black" }} size={26} />
                      </TouchableWithoutFeedback>

                    </View>
                    <View style={{ justifyContent: "center", paddingLeft: 10 }}>

                      <TouchableWithoutFeedback onPress={toggleFullScreen}>
                        <Ionicons name="scan-outline" style={{ alignItems: "center", color: "black" }} size={26} />
                      </TouchableWithoutFeedback>
                    </View>

                    {/* seek bar */}

                  </View>
                )}
              </View>

              {/* } */}
            </TouchableWithoutFeedback>
            <View style={styles.controlContainer}>
              {/* Next Button */}
              {!FullScreen && <TouchableOpacity
                onPress={() => handleNxtPrev('nxt')}
                style={{ height: 66, width: 66, position: "absolute" }}
              >
                <Image
                  source={require('../assets/imgs/back.png')}
                  title="Next"
                  style={{
                    width: '80%',
                    height: '80%',
                    resizeMode: 'contain',
                    transform: [{ rotate: '180deg' }],
                  }}
                />
              </TouchableOpacity>}



              {/* goback button */}
              {FullScreen ? controlsVisible && (<TouchableOpacity
                onPress={goBackVideo}
                style={{ height: 50, width: 100, position: 'absolute', top: "7%", right: -10 }}
              >
                <Image
                  source={require('../assets/imgs/back.png')}
                  style={styles.backBtnImg}
                />
              </TouchableOpacity>) :

                <TouchableOpacity
                  onPress={goBack}
                  style={{ height: 50, width: 100, position: 'absolute', top: 10 }}
                >
                  <Image
                    source={require('../assets/imgs/back.png')}
                    style={styles.backBtnImg}
                  />
                </TouchableOpacity>}

            </View>
          </View>
          {!FullScreen && <View style={{ backgroundColor: 'red', flexDirection: 'column', paddingBottom: 8 }}>
            {/* banner running  0 active adds */}
            <View style={{ flex: 1, alignItems: "center", }}>
              <BannerAd
                unitId={adUnitId}
                // size="windowWidth" // Specify the size of the banner ad
                size="BANNER" // Specify the size of the banner ad
                requestOptions={{
                  requestNonPersonalizedAdsOnly: true,
                }}
              />
            </View>


          </View>}
        </View>
      </TouchableWithoutFeedback>

    </ImageBackground>
  );

};

export default PlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addContainer: {
    flex: 0.2,
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingRight: 10,
    zIndex: 1,
    // borderWidth: 1
  },
  backgroundVideo: {
    flex: 1,
  },
  screenBg: {
    // position: 'absolute',
    width: windowWidth,
    height: windowHeight,
    resizeMode: 'cover',
    opacity: 0.8,
    flex: 1,
  },
  backBtnImg: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
    position: 'absolute',
    top: 0,
  },
  controlContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
});



// previous old case
// case 'prev':
//   if (prevState.current > 0 &&
//     prevState.current < wholeData.length - 1) {
//       console.log("enter in prev if 1", nxtPrev.prevVdo);
//     return {
//       ...prevState,
//       nxtVdo: prevState.current,
//       current: prevState.prevVdo,
//       prevVdo: prevState.current - 1,
//     };
//   } else if (prevState.current === 0) {
//     console.log("enter in prev zero condition", nxtPrev.prevVdo);
//     return {
//       ...prevState,
//       prevVdo: 0,
//       nxtVdo: 1,
//     };
//   } else if (prevState.current === wholeData.length - 1) {
//     console.log("enter in prev if 2", nxtPrev.prevVdo);
//     return {
//       ...prevState,
//       nxtVdo: prevState.current,
//       current: prevState.prevVdo,
//       prevVdo: prevState.current - 1,
//     };
//   }
//   break;