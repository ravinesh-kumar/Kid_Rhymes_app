import { StyleSheet, View, Image, Dimensions } from 'react-native';
import React from 'react';
import HeaderRight from './HeaderRight';
// import LinearGradient from 'react-native-linear-gradient';

// import HeaderRight from './HeaderRight';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HeaderComp = () => {
  return (
    // <LinearGradient
    //   colors={['#fff', '#fff', '#fc2b93']}
    //   style={{
    //     width: windowWidth,
    //     height: '100%',
    //     flex: 1,
    //     paddingHorizontal: 10,
    //     justifyContent: 'center',
    //   }}>
    <View>
      <View style={styles.m1}>
        <Image
          source={require('../assets/imgs/logo.png')}
          style={{ width: "20%", height: 45}}
        />
      </View>
      <HeaderRight />
    </View>
    // </LinearGradient>
  );
};

export default HeaderComp;

const styles = StyleSheet.create({
  m1: {
    flex: 1,
    flexDirection: 'row',
    marginLeft:10
  }
});
