/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   Dimensions
 } from 'react-native';

 import MapView from 'react-native-maps';

 // import {} from 'react-native-material-kit';

 import tabacs from './features.json';

 const {width,height} = Dimensions.get('window')

  export default class Index extends Component {

   constructor(){
     super()

     this.state = {
       region: {
         latitude : 48.8627,
         longitude: 2.2875,
         latitudeDelta:0,
         longitudeDelta: 0
       }
     }

   }

   calcDelta(lat,lon, accuracy){
     const oneDegreeOfLongitudeInMetters = 111.32;
     const circumference = (40075 / 360)
     const latDelta = accuracy * (1 / (Math.cos(lat) * circumference))
     const lonDelta = (accuracy / oneDegreeOfLongitudeInMetters)

     this.setState({
       region: {
         latitude: lat,
         longitude: lon,
         latitudeDelta: latDelta,
         longitudeDelta: lonDelta
       }
     })
   }



   ComponentWillMount (){
     navigator.geolocation.getCurrentPosition(
       (postion) => {
         var lat = postion.coords.latitude
         var lon = postion.coords.longitude
         var accuracy = postion.coords.accuracy
         this.calcDelta(lat,lon,accuracy)

       }
     )
   }





   render() {
     return (
       <View style={styles.container}>
       <Text>Hello YOOOO
       </Text>

       {this.state.region.latitude ? <MapView
       style={styles.map}
       showsUserLocation = {true}
       followsUserLocation = {true}
       showsCompass = {true}
       loadingEnabled = {true}
       zoomEnabled={true}
       annotations={tabacs}
       loadingIndicatorColor = {'#fff'}
       loadingBackgroundColor= {'#C70017'}
       showsMyLocationButton = {true}
       initialRegion={this.state.region}

       >
       {tabacs.features.map(marker => (
         <MapView.Marker key={marker.properties.id}
         title = {marker.properties.Nom}
         pinColor = "#A21D1B"
         coordinate = {{
         latitude:marker.geometry.coordinates[1],
         longitude: marker.geometry.coordinates[0]
         }}
         />
       ))}

       </MapView> :null }



       </View>
     );
   }
 }

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     position:'absolute',
     justifyContent: 'flex-end',
     alignItems: 'center',
     top: 0,
     left: 0,
     right: 0,
     bottom: 0,
    backgroundColor: '#29AAE3'
   },
   map: {
    flex:1,
     width:width,
     position: 'absolute',
    backgroundColor: '#2E3192',
     top:0,
     left:0,
     right:0,
     bottom:0
   },
 });

AppRegistry.registerComponent('TabacMap', () => Index);
