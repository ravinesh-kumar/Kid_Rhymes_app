import {
  Animated,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState,createContext  } from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Sound from 'react-native-sound';
const sound = new Sound(require('./BG_AUDIO.mp3'));
sound.setCategory('Playback');

const AudioContext = createContext();

// export const useAudioContext = () => useContext(AudioContext);



export const toggleAudioPlayback = (toggle) => {

  if (toggle) {
    sound.pause();
  } else {
    sound.play();
  }
};

const HeaderRight = props => {
  const navigation = useNavigation();
  const [isMuted, setIsMuted] = useState("no");
  const [musicicon, setMusicIcon] = useState("music");
  const [muted, setMuted] = useState('n');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const createThreeButtonAlert = () => {
    Linking.openURL('https://google.com')
    // navigation.navigate("Privacy")
  }



  function playBgAudio() {
    if (isMuted === "yes") {
      setIsMuted("no");
      sound.pause();
    } else {
      setIsMuted("yes");
      sound.play();
    }
  }

  useEffect(() => {
    playBgAudio();
  }, [])

  const toggleMute = () => {
    playBgAudio()
    sound.setCategory('Playback');
    sound.setNumberOfLoops(-1);
    sound.setVolume(0.1);
    if (muted == 'y') {
      sound.stop();
      setMuted('n');
      setMusicIcon("music-off");
    }
    if (muted == 'n') {
      sound.play();
      setMuted('y');
      setMusicIcon("music");
    }
  }


  useEffect(() => {
    toggleMute();
  }, []);

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
        <TouchableOpacity onPress={toggleMute} >
          <MaterialIcons name={musicicon} size={22} style={styles.playBtn1} />

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
    width: "25%",
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


