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


const adUnitId = __DEV__
  ? TestIds.APP_OPEN
  : 'ca-app-pub-1737096590728070~1284968332';



const PlayerScreen = props => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [paused, setPaused] = useState(false);
  // const [player, setPlayer] = React.useState({
  //   paused: false,
  //   muted: false,
  //   seeking: false,
  //   duration: 0,
  //   currentTime: 0,
  //   fullscreen: false,
  // });

  const [player, setPlayer] = useState(0);
  const [FullScreen, setFullScreen] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const videoRef = useRef(null);
  const [controlsVisible, setControlsVisible] = useState(true);
  const controlsTimeoutRef = useRef(null);



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

  const [seekValue, setSeekValue] = React.useState(0);
  let vdoDta = props.route.params.vdodata;
  let vdourl = props.route.params.vdourl;
  let wholeData = props.route.params.wholeData;
  let searchIndex = wholeData.findIndex(val => val.id == vdoDta.id);


  // console.log(`url mil gya bhai`, vdourl);
  // ========================================================================================



  const navigationHook = useNavigation();
  function showToast(dt = '') {
    ToastAndroid.show(dt + '', ToastAndroid.SHORT);
  }

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

  // const onProgress = ({ currentTime }) => {
  //   setCurrentPosition(currentTime);
  // };
  const onProgress = (data) => {
    setPlayer({ ...player, currentTime: data.currentTime });
  };
  const onEnd = () => {
    setCurrentPosition(0);
    setPaused(true);
  };


  const handleNxtPrev = (val = 'onload') => {
    // setIsvisible(isVisible)
    if (isUpdating) return;

    setIsUpdating(true);

    // console.log(wholeData[nxtPrev.current].vdourl);
    // console.log('CurrentUrl handle component ', props.route.params.currentUrl);
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
                current: prevState.current + 1, // Update to the next video index
                nxtVdo: prevState.current + 2, // Update to the index after the next video
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
      setIsUpdating(false);
    }, 100);
  };
  ////////////////////////////////////////////////////////////
  // pause play button
  const togglePaused = () => setPaused(prev => !prev)

  //////////////////////////////////////////////////////////////////
  // const onLoad = ({ duration }) => {
  //   console.log('Video loaded with duration:', duration);
  //   setVideoDuration(duration);
  // };

  const onLoad = (data) => {
    setPlayer({ ...player, duration: data.duration, currentTime: data.currentTime });
    setVideoDuration(data.duration);

  };

  const onSliderChange = async (value) => {
    var a = formatTime(value)
    // console.log(`onSliderChange`, a);
    onSeek(a);
    // onSeek(value);
  };
  const formatTime = (value) => {
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = Math.floor(value % 60);
    const milliseconds = Math.floor((value % 1) * 1000);
    const totalTimeInSeconds = (hours * 3600 + minutes * 60 + seconds + milliseconds / 1000) * 10;

    // console.log(`value is formatTime `, totalTimeInSeconds);
    return totalTimeInSeconds;
  };

  const onSeek = async (data) => {
    var a = formatTime(data);
    await videoRef.current.seek(a);
    setPlayer(prevState => ({ ...prevState, currentTime: data }));
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

  return (

    <ImageBackground source={homeBg} style={styles.screenBg}>
      <View style={{ flex: 1, position: 'relative' }}>


        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingTop: 2,
            flexDirection: 'row',
            zIndex: 1,
          }}
        >
          <View style={styles.controlContainer}>
            <View>
              {/* previous button  */}
              <TouchableOpacity
                onPress={() => handleNxtPrev('prev')}
                style={{ height: 66, width: 66 }}
              >
                <Image
                  source={require('../assets/imgs/back.png')}
                  style={{ width: '80%', height: '80%', position: "relative", resizeMode: 'contain', paddingLeft: 95 }}
                />
              </TouchableOpacity>
            </View>

          </View>
          {/* video image height */}
          <TouchableWithoutFeedback>

            {/* custom control bar */}

            <View style={{ width: FullScreen ? "100%" : "75%", height: FullScreen ? 357 : 300, borderWidth: 1, marginTop: 0, justifyContent: "center" }}>

              <Video
                source={{
                  // uri: nxtPrev.current,
                  uri: wholeData[nxtPrev.current].vdourl,
                  title: 'Custom Title',
                }}
                style={[styles.backgroundVideo]}
                // style={{width: '100%', height: fullScreen?'100%': 200}}
                // controls={true}
                paused={paused}
                repeat={true}
                onLoad={onLoad}
                onProgress={onProgress}
                onEnd={onEnd}
                ref={videoRef}
                fullscreenOrientation={'landscape'}
                resizeMode={'stretch'}
                seekbarStyle={{ backgroundColor: 'red', width: 300 }}
              />

              <View style={{ width: "100%", position: "absolute", paddingTop: 20, bottom: 40, zIndex: 1 }}>

                {/* <Slider
                  style={{ width: "100%" }}
                  minimumValue={0}
                  maximumValue={videoDuration}
                /> */}
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
              <View style={{ position: "absolute", flexDirection: "row", opacity: .6, backgroundColor: "gray", justifyContent: "center", bottom: 0, width: "100%" }}>

                <View style={{ width: "90%", justifyContent: "space-evenly", paddingTop: 10, paddingBottom: 20, alignItems: "center", flexDirection: "row" }}>
                  <TouchableWithoutFeedback onPress={() => handleNxtPrev('prev')}>

                    {/* <ion-icon name="arrow-back-outline"></ion-icon> */}
                    <Ionicons name="arrow-back-outline" style={{ alignItems: "center", color: "black" }} size={26} />
                  </TouchableWithoutFeedback>


                  <TouchableWithoutFeedback onPress={togglePaused}>

                    <Ionicons name="play-circle-outline" style={{ alignItems: "center", color: "black" }} size={26} />
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

            </View>
          </TouchableWithoutFeedback>
          <View style={styles.controlContainer}>
            {/* Next Button */}
            <TouchableOpacity
              onPress={() => handleNxtPrev('nxt')}
              style={{ height: 66, width: 66, position: "absolute"}}
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
            </TouchableOpacity>
            {/* goback button */}
            <TouchableOpacity
              onPress={goBack}
              style={{ height: 50, width: 50, position: 'absolute', top: 10 }}
            >
              <Image
                source={require('../assets/imgs/back.png')}
                style={styles.backBtnImg}
              />
              {/* <ion-icon name="home-outline"></ion-icon>
            <Ionicons
              name="home-outline"
              style={styles.playBtn1}
              size={22}
            /> */}
            </TouchableOpacity>

          </View>
        </View>
      </View>
      <View style={{ backgroundColor: 'red', flexDirection: 'column', paddingBottom: 8 }}>
        {/* banner running  0 active adds */}
        <BannerAd
          unitId={adUnitId}
          size="BANNER" // Specify the size of the banner ad
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />

      </View>
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