import {
  StyleSheet, Text, View, TouchableOpacity, Image, Dimensions
} from 'react-native';

import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Sound from 'react-native-sound';
const windowWidth = Dimensions.get('window').width / 3.25;
const windowHeight = Dimensions.get('window').height / 3.25;
const myHeight = windowWidth > windowHeight ? windowWidth : windowHeight;

const Vdocard = props => {
  let dta = props.thisData;
  let wholeData = props.wholeData;
  //   console.log(wholeData);
  const navigationHook = useNavigation();

  const [currentUrl, setCurrentUrl] = useState(dta.vdourl);
  const myFun = navHook => {
    setTimeout(() => {
      navHook.navigate('Player', {
        name: 'Navigated from HomeScreen Btn!',
        vdourl: dta.vdourl,
        vdodata: dta,
        wholeData: wholeData,
        currentUrl: currentUrl,
        setCurrentUrl: setCurrentUrl
      });
    }, 100);
  };
  const sound = new Sound(require('./audio_audio.mp3'));
  sound.setCategory('Playback');

  
  const videoDownload =(()=>{
    
    sound.play()
  })
  // console.log(`Video URl is `,dta.vdourl);
  return (

    <View>
      <TouchableOpacity onPress={() => myFun(navigationHook)} style={{ width: 230, height: 160, justifyContent: "center", alignItems: "center" }}>
        <View style={{ backgroundColor: 'pink', flex: 1, position: 'relative', justifyContent: 'center', alignContent: "center", alignSelf: "center", alignItems: 'center', borderWidth: 1, borderRadius: 10, overflow: 'hidden' }}>
          <View style={{ flex: 3 }}>
            <Image
              source={{ uri: dta.imgUrl }}
              style={{ width: 230, height: '100%', resizeMode: 'stretch' }}
            />
          </View>



          <View style={styles.txtTitleContainer}>
            <Text style={styles.txtTitle}>{dta.title}</Text>
            {/* <ion-icon name="arrow-down-outline"></ion-icon> */}
            <TouchableOpacity >

       
            <Ionicons
              name="arrow-down-outline"
              style={styles.playBtn1}
              size={22}
            />
                 </TouchableOpacity>
          </View>

          {/* <Ionicons name="play-circle" style={styles.playBtn} size={60} /> */}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Vdocard;

const styles = StyleSheet.create({
  playBtn1: {
    backgroundColor: "#06BACF",
    color: "white",
    textAlign: "center",
    borderRadius: 100,
    alignItems: "center",
    height: 30,
    width: 30,
    padding: 4,
    marginLeft: 10, // Adjust the margin to create space between the title and the icon
  },
  playBtn: {
    color: 'red',
    position: 'absolute',
  },
  txtTitle: {
    fontWeight: 'bold',
    color: 'black',
    borderRadius: 100,
    textAlign: "center",
    paddingHorizontal: 10,
    paddingVertical: 1,
    textTransform: 'uppercase',
    marginLeft: "15%"
  },
  txtTitleContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: "space-between",
    padding: 10,
    width: 230,
    alignItems: 'center', // Align center for vertical centering
  },
});


// const styles = StyleSheet.create({
//   playBtn1: {
//     // borderWidth: 1,
//     backgroundColor: "#3CEAFF",
//     color: "black",
//     textAlign: "center",
//     borderRadius: 100,
//     alignItems: "center",
//     height:30, 
//     width:30,
//     padding:4,
    

//   },
//   playBtn: {
//     color: 'red',
//     position: 'absolute',
//   },
//   txtTitle: {
//     fontWeight: 'bold',
//     color: 'black',
//     borderRadius: 100,
//     // borderWidth: 1,
//     textAlign: "center",
//     paddingHorizontal: 10,
//     paddingVertical: 1,
//     textTransform: 'uppercase',
//     marginLeft: "15%"

//   },
//   txtTitleContainer: {
//     // flex: 1,
//     // borderWidth: 2,
//     flexDirection: 'row',
//     backgroundColor: 'white',
//     justifyContent: "space-between",
//     // padding: 10,
//     // borderRadius: 10,
//     padding: 10,
//     // justifyContent: 'space-between',
//     // alignItems: 'center',
//     width: 230,

//   },
// });








































// import {
//   StyleSheet, Text, View, TouchableOpacity, Image, Dimensions
// } from 'react-native';

// import React, {useState} from 'react';
// import {useNavigation} from '@react-navigation/native';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const windowWidth = Dimensions.get('window').width / 3.25;
// const windowHeight = Dimensions.get('window').height / 3.25;
// const myHeight = windowWidth > windowHeight ? windowWidth : windowHeight;

// const Vdocard = props => {
//   let dta = props.thisData;
//   let wholeData = props.wholeData;
// //   console.log(wholeData);
//   const navigationHook = useNavigation();

//   const [currentUrl, setCurrentUrl] = useState(dta.vdourl);
//   const myFun = navHook => {
//     setTimeout(() => {
//       navHook.navigate('Player', {
//         name: 'Navigated from HomeScreen Btn!',
//         vdourl: dta.vdourl,
//         vdodata: dta,
//         wholeData: wholeData,
//         currentUrl: currentUrl,
//         setCurrentUrl: setCurrentUrl
//       });
//     }, 100);
//   };
//   return (

//     <TouchableOpacity onPress={() => myFun(navigationHook)} style={{width: 230, height: 160,justifyContent:"center",alignItems:"center" }}>
//       <View style={{backgroundColor:'pink', flex:1, position: 'relative', justifyContent:'center',alignContent:"center",alignSelf:"center", alignItems:'center', borderWidth:1, borderRadius:10, overflow:'hidden'}}>
//       <View style={{flex: 3}}>
//            <Image
//              source={{uri: dta.imgUrl}}
//              style ={{width: 230,height:'100%', resizeMode: 'stretch'}}
//           />
//          </View>
//          <View style={styles.txtTitleContainer}>
//            <Text style={styles.txtTitle}>{dta.title}</Text>
//          </View>

//          <Ionicons name="play-circle" style={styles.playBtn} size={60} />
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default Vdocard;

// const styles = StyleSheet.create({
//   // cardContainer: {
//   //   flex: 1,
//   //   marginRight: 10,
//   //   borderRadius: 10,
//   //   overflow: 'hidden',
//   //   justifyContent: 'center',
//   //   alignItems: 'center',
//   // },
//   playBtn: {
//     color: 'red',
//     position: 'absolute',
//   },
//   txtTitle: {
//     fontWeight: 'bold',
//     color: 'black',
//     borderRadius: 100,
//     borderWidth: 2,
//     borderColor: 'red',
//     paddingHorizontal: 15,
//     paddingVertical: 5,
//     textTransform: 'uppercase',
//   },
//   txtTitleContainer: {
//     flex: 0.5,
//     flexDirection: 'row',
//     backgroundColor: 'white',
//     padding: 10,
//     // justifyContent: 'space-between',
//     alignItems: 'center',
//     width: '100%',
//   },
// });













