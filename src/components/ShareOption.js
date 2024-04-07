import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Orientation from 'react-native-orientation-locker';
// import { AdMobBanner } from 'react-native-admob';

const ShareOption = () => {
  React.useEffect(() => {
    Orientation.lockToLandscape();
    console.log(Orientation);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 5 }}>
        <TouchableOpacity onPress={() => console.log('Back button pressed')}>
          <Image source={require('../assets/imgs/back.png')} style={{ height: 30, width: 30 }} />
        </TouchableOpacity>
        <Image source={require('../assets/imgs/logo.png')} style={{ height: '100%', resizeMode: 'contain' }} />
        <View style={{ height: 40, backgroundColor:'red' }} />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Content goes here</Text>
        {/* <AdMobBanner
          adSize="fullBanner"
          adUnitID="ca-app-pub-3940256099942544/6300978111"
          testDevices={[AdMobBanner.simulatorId]}
          onAdFailedToLoad={(error) => console.error(error)}
        /> */}
      </View>
      <View style={{ backgroundColor: '#fff', padding: 10 }}>
        <Text>Footer section</Text>
      </View>
    </View>
  );
};

export default ShareOption;
