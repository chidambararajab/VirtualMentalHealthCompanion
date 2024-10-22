import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import DiceApp from './Dice';

const {height} = Dimensions.get('window'); // Get screen height for responsive design

function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content" // Use 'light-content' for better contrast on gradient background
      />

      {/* Apply gradient background */}
      <LinearGradient
        colors={['#a8edea', '#fed6e3']} // Soft gradient colors
        style={styles.gradient}>
        {/* Center content vertically and horizontally */}
        <View style={styles.container}>
          <DiceApp />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Ensure the width takes full space
  },
});

export default App;
