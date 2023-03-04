import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { Feather } from '@expo/vector-icons';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);

const music = {
  uri: require('./assets/ukulele.mp3')
};
const ukuleleImage = require('./assets/ukulele.png');

export default function App() {
  let [isPlaying, setIsPlaying] = useState(false);
  let [playbackInstance, setPlaybackInstance] = useState(null);
  let [volume, setVolume] = useState(1.0);

  useEffect(() => {
    return  async () => {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playThroughEarpieceAndroid: true,
        interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      });
      loadAudio();
    };
  },[]);

  const handlePlayPause = async () => {
    isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync();    
    setIsPlaying(!isPlaying);
  }

  const loadAudio = async () =>{
    const playbackInstance = new Audio.Sound();
    const audioSource = music.uri;
    const status = {
      shouldPlay: isPlaying,
      volume: volume,
    }

    await playbackInstance.loadAsync(audioSource, status, false);
    setPlaybackInstance(playbackInstance);
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Aloha Music</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={ukuleleImage} style={styles.image}></Image>
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.playPauseControl} onPress={handlePlayPause}>
        {isPlaying ?  
          <Feather name="pause" size={32} color="#563822" /> :
          <Feather name="play" size={32} color="#563822" />
        }      
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4e3cf',
    alignItems: 'center',
    justifyContent: 'center',   
    foregroundColor: '#563822',
  },
  headerContainer: {
    width: 300,
    backgroundColor: '#da9547',   
    marginBottom: 20, 
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 500,
  },
  buttonContainer:{
    marginTop: 20
  }
});
