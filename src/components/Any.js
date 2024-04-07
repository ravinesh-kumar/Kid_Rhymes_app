import { StyleSheet, View } from 'react-native'
import React from 'react';
// import Pdf from 'react-native-pdf';
import { Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const wid = Dimensions.get('window').width;
const hyt = Dimensions.get('window').height;

const Any = () => {
  const source = { uri:'https://familyid.up.gov.in/portal/assets/docs/umh.pdf'};
  return (
    <View style={styles.container}>
        {/* <Pdf
            trustAllCerts={false}
            source={source}
            onLoadComplete={(numberOfPages,filePath) => {
                console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page,numberOfPages) => {
                console.log(`Current page: ${page}`);
            }}
            onError={(error) => {
                console.log(error);
            }}
            onPressLink={(uri) => {
                console.log(`Link pressed: ${uri}`);
            }}
            style={styles.pdf}/> */}

            <WebView source={{html:`<!DOCTYPE html>
                                    <html lang="en">
                                    <head>
                                        <meta charset="UTF-8">
                                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                        <title>Document</title>
                                    </head>
                                    <body style="width:100vw; height:100vh; background-color: red">
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28477.146214301963!2d80.9127636!3d26.8512961!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd08b4012ebb%3A0x2265d43951855baf!2sUptron%20India%20Limited!5e0!3m2!1sen!2sin!4v1703573308058!5m2!1sen!2sin" style="border:1px; width:100%; height: 100%" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                    </body>
                                    </html>`}} style={{width:wid, height: hyt}}  />

            
    </View>
    
  )
}

export default Any


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 0,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});
// https://familyid.up.gov.in/portal/assets/docs/umh.pdf