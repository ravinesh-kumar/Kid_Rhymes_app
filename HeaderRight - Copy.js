import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Sound from 'react-native-sound';

const HeaderRight = props => {
  const navigation = useNavigation();
  const [audio, setAudio] = useState(false);
  const [muted, setMuted] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const createThreeButtonAlert = () => {
    navigation.navigate("Privacy")
  }

  const audioWillPlay = () => {
    Sound.setCategory('Playback'); // Enable background audio
    const newAudio = new Sound(require('./BG_AUDIO.mp3'), error => {
      if (error) {
        console.log('Error playing audio:', error);
        return;
      }
      setAudio(newAudio);
      setTimeout(function(){
        console.log('====================================');
        console.log("isSet", audio);
        console.log('====================================');
      }, 100);
    });
    
    return
  };



  const toggleMute = () => {
    // console.log('====================================');
    // console.log("Toggling MUTE");
    // console.log('====================================');
    // console.log('====================================');
    // console.log(audio);
    // console.log('====================================');
    if (audio) {
      if (muted) {
        // If currently muted, resume playback
        console.log("muted", muted);
        audio.play();
      } else {
        // If currently playing, pause the audio
        console.log("Not muted", muted);
        audio.pause();
      }
      // Update muted state
      setMuted(!muted);
    }
  };

  useEffect(() => {
    audioWillPlay();
  }, []);
  

  // useEffect(() => {

  //   // music will play
  //   audioWillPlay();
  //   return () => {
  //     if (audio) {
  //       console.log("useeffect audio");
  //       audio.stop();
  //       audio.release();
  //     }
  //   };
  // }, [muted]); // Add muted as a dependency so that it triggers the effect when it changes
  
  return (
    <View style={styles.headerRightContainer}>
      <View style={{ marginRight: 10 }}>
        <TouchableOpacity>
          <View style={{ borderRadius: 100 }}>
            <Ionicons name="settings" style={styles.playBtn} size={22} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ marginRight: 10 }}>
        <TouchableOpacity title={muted ? 'Unmute' : 'Mute'} onPress={toggleMute} >
          <Ionicons
            name={muted ? "musical-notes-outline" : "musical-notes"}
            style={styles.playBtn1}
            size={22}
          />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={createThreeButtonAlert} style={{ marginRight: 10 }}>
          <Ionicons
            name="shield-half-outline"
            style={styles.playBtn2}
            size={23}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderRight;

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
  },
  headerRightAnimatedView: {
    width: 155,
    height: 45,
    flexDirection: 'row',
    overflow: 'hidden',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  playBtn: {
    padding: 7,
    backgroundColor: '#029d63',
    borderRadius: 50,
    color: 'white',
  },
  playBtn1: {
    padding: 7,
    backgroundColor: '#F93434',
    borderRadius: 50,
    color: 'white',
  },
  playBtn2: {
    padding: 7,
    backgroundColor: '#ffc201',
    borderRadius: 50,
    color: 'white',
  },
});


// // //////////////////////////////////////////////////////

// // audio is working properly

// import {
//   Animated,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Image,
//   Alert,
// } from 'react-native';
// import React, { useEffect, useRef, useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Sound from 'react-native-sound';
// const HeaderRight = props => {
//   const navigation = useNavigation();
//   // let data = props.initialParams.data.vdourl;
//   // let dta =props.route.params.vdodata;
//   const [audio, setAudio] = useState(null);
//   const [muted, setMuted] = useState(false);
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const createThreeButtonAlert = () => {
//     navigation.navigate("Privacy")
//   }

//   const sound = new Sound('', null, error => {
//     if (error) {
//       console.log('Failed to load the sound', error);
//       return;
//     }
//   });



//   const toggleMute = () => {
   
//   };


//   //////////////////////////////////////////////////////////////////////////
//   // audio done
//   const audioWillPlay = () => {
//     Sound.setCategory('Playback'); // Enable background audio
//     const newAudio = new Sound(require('./BG_AUDIO.mp3'), error => {
//       if (error) {
//         console.log('Error playing audio:', error);
//         return;
//       }
//       // Play the audio
//       if (!muted) {
//         newAudio.play();
//       }
//     });
//     setAudio(newAudio);
//   };
//   // const audioWillPlay= ()=>{
//   //   Sound.setCategory('Playback'); // Enable background audio
//   //   const audio = new Sound(require('./claps-44774.mp3'),error => {
//   //     if (error) {
//   //       console.log('Error playing audio:', error);
//   //       return;
//   //     }
//   //     // Play the audio
//   //     audio.play();
//   //   });
//   // }

//   useEffect(() => {
//     setInterval(() => {
//       audioWillPlay() // Set the video to mute
//     }, 4500)

//   }, []);


//   //////////////////////////////////////////////////////////////////////////


//   return (
//     <View style={styles.headerRightContainer}>
//       <View style={{ marginRight: 10 }}>
//         <TouchableOpacity>
//           <View style={{ borderRadius: 100 }}>
//             <Ionicons name="settings" style={styles.playBtn} size={22} />
//           </View>
//         </TouchableOpacity>
//       </View>
//       <View style={{ marginRight: 10 }}>
//         <TouchableOpacity title={muted ? 'Unmute' : 'Mute'} onPress={toggleMute} >
//           <Ionicons
//             name="musical-notes-outline"
//             style={styles.playBtn1}
//             size={22}
//           />
//         </TouchableOpacity>
//       </View>
//       <View>
//         <TouchableOpacity onPress={createThreeButtonAlert} style={{ marginRight: 10 }}>
//           <Ionicons
//             name="shield-half-outline"
//             style={styles.playBtn2}
//             size={23}
//           />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default HeaderRight;

// const styles = StyleSheet.create({
//   headerRightContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     padding: 10,
//   },
//   headerRightAnimatedView: {
//     width: 155,
//     height: 45,
//     flexDirection: 'row',
//     overflow: 'hidden',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//   },
//   playBtn: {
//     padding: 7,
//     backgroundColor: '#029d63',
//     borderRadius: 50,
//     color: 'white',
//   },
//   playBtn1: {
//     padding: 7,
//     backgroundColor: '#F93434',
//     borderRadius: 50,
//     color: 'white',
//   },
//   playBtn2: {
//     padding: 7,
//     backgroundColor: '#ffc201',
//     borderRadius: 50,
//     color: 'white',
//   },
// });
