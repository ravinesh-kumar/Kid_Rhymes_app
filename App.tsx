// API ALL AND STACK SCREEN

import {
  Image,
  Platform,
  SafeAreaView,
  ToastAndroid,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { AudioProvider } from './src/components/AudioContext';
// src\components\AudioContext.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './src/store';
import axios from 'axios';

// ============ Screens ============
import SplashScreen from './src/screens/SplashScreen';
import Home from './src/screens/Home';
// ========== End Screens ==========

// ========== Components ==========
import HeaderRight from './src/components/HeaderRight';
import HeaderComp from './src/components/HeaderComp';
import PlayerScreen from './src/screens/PlayerScreen';
import Any from './src/components/Any';
import ShareOption from './src/components/ShareOption';
import Privacy from './src/components/Privacy';
import Error_404 from './src/screens/Error_404';

// ========== Components ==========

const Stack = createNativeStackNavigator();

const App = () => {

  // console.log(Platform);

  const [showSplashScreen, setshowSplashScreen] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState(false);

  async function getVdoList() {
    try {
      const response = await axios.get('https://techdomain.in/vdoJsonData.php');
      let res = await response.data;
      setData(res);
      setshowSplashScreen(false);
    } catch (error) {
      // console.error(error + ' ->nahi chala bhai');

      setError(true)
    }
  }


  useEffect(() => {
    getVdoList();
  }, []);

  let splashStack;
  if (showSplashScreen) {
    splashStack = (
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          orientation: 'landscape',
          headerShown: false,
          animation: 'flip',
        }}
      />

    );
  } else {
    splashStack = null;
  }

  function showToast(msg: string) {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  }
  // console.log(`data aa raha hai API se  `,data);

  return (
    // <AudioProvider>
    <SafeAreaView style={{ flex: 1 }}>
      {error ? <Error_404 /> : <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            {splashStack}
            {/* <Stack.Screen name='Any' component={Any} options={{orientation: 'default'}} /> */}
            {/* <Stack.Screen name='ShareOption' component={ShareOption} options={{
              orientation: 'landscape',
              headerShown: false
            }}/> */}
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerTitle: () => (
                  <Image
                    source={require('./src/assets/imgs/logo.png')}
                    style={{ width: 45, height: 45 }}
                  />
                  // <HeaderComp />
                ),
                orientation: 'landscape',
                headerStyle: {
                  backgroundColor: 'red',
                },

                headerRight: () => <HeaderRight initialParams={{ data: data }} />,
                headerShown: false
              }}
              initialParams={{ data: data }}

            />


            <Stack.Screen name="Player" component={PlayerScreen} options={{ orientation: 'landscape', headerShown: false }} initialParams={{ arr: data }} />
            <Stack.Screen name="Privacy" component={Privacy} options={{
              headerTitle: () => (
                <Image
                  source={require('./src/assets/imgs/logo.png')}
                  style={{ width: 45, height: 45 }}
                />
                // <HeaderComp />
              ),
              orientation: 'landscape',
              headerStyle: {
                backgroundColor: 'red',
              },

              headerRight: () => <HeaderRight />,
              headerShown: false
            }} />
            {/* options={{orientation:'landscape', headerShown:false}} initialParams={{arr: data}} */}
            {/* <Stack.Screen name='headerComp' component={HeaderRight} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>}
    </SafeAreaView>
    // </AudioProvider>
  );
};

export default App;
