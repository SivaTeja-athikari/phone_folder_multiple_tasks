import { Text, View,Button, Image } from 'react-native'
import React, { Component } from 'react'
import ImagePicker from 'react-native-image-crop-picker';


export default class ImagePicker2 extends Component {
    

    state = {
        url : ''
    }
    
    handleImage = () => {
    //  ImagePicker.openPicker({
    //         width: 300,
    //         height: 400,
    //         cropping: true
    //       }).then(image => {
    //         console.log(image);
    //       });

        //   ImagePicker.openPicker({
        //     mediaType: "video",
        //   }).then((video) => {
        //     console.log(video);
        //   });

        //   ImagePicker.openPicker({
        //     multiple: true
        //   }).then(images => {
        //     console.log(images);
        //   });

        ImagePicker.openCropper({
            path: this?.state?.url,
            width: 300,
            height: 400,
            mediaType: 'photo',
            cropping : true
        }).then(image => {
           this.setState({url : image?.path})
          });

      
    }

    componentDidMount(): void {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            freeStyleCropEnabled : true,
            cropperCircleOverlay : true
          }).then(image => {
            console.log(image);
            this.setState({url : image?.path})
          });
    }
  render() {
    console.log(this.state.url,"url path");
    
    return (
      <View>
       <Button title='Open gallery' onPress={() => this.handleImage()}/>

{
    this.state.url === '' ? '' : 
       <Image source={{uri : this.state.url === '' ? 'https://miro.medium.com/v2/resize:fit:1200/0*TpsM6Y0kOQYEgWl1' : this.state.url }} style={{height:100,width:100,borderRadius:100/2}}/>
}
      </View>
    )
  }
}