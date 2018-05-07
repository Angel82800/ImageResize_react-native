/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import  {RNCamera}  from 'react-native-camera';
import RNFetchBlob from 'react-native-fetch-blob'


type Props = {};
export default class App extends Component<Props> {

  async takePicture(){
    const options = { quality: 0.5, base64: true };
    const data = await this.camera.takePictureAsync(options);
    //  eslint-disable-next-line
    // console.log(data.uri);
    let width = 200;
    let height = 200;
    ImageResizer.createResizedImage(data.uri, width, height, 'JPEG', 100).then((response) => {
      // console.log(response);
      var data1 = null;
      RNFetchBlob.fs.readStream(
        // file path
        response.path,
        // encoding, should be one of `base64`, `utf8`, `ascii`
        'base64',
        // (optional) buffer size, default to 4096 (4095 for BASE64 encoded data)
        // when reading file in BASE64 encoding, buffer size must be multiples of 3.
        4095)
      .then((ifstream) => {
          ifstream.open()
          ifstream.onData((chunk) => {
            // when encoding is `ascii`, chunk will be an array contains numbers
            // otherwise it will be a string
            data1 += chunk;
            // console.log("chunk",chunk);
          })
          ifstream.onError((err) => {
            console.log('oops', err)
          })
          ifstream.onEnd(() => {
            console.log("data",data1);//Data
            // <Image source={{ uri : 'data:image/png,base64' + data1 }} />
          })
      });

    }).catch((err) => {
      // Oops, something went wrong. Check that the filename is correct and
      // inspect err to get more details.
      console.log(err);
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
        <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});