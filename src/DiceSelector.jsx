import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const DiceSelector = ({setNumOfDice}) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => setNumOfDice(1)} activeOpacity={0.9}>
        <LinearGradient
          colors={['#56CCF2', '#2F80ED']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.button}>
          <Text style={styles.buttonText}>1 Dice</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setNumOfDice(2)} activeOpacity={0.9}>
        <LinearGradient
          colors={['#56CCF2', '#2F80ED']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.button}>
          <Text style={styles.buttonText}>2 Dice</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // marginTop: 20,
    width: '100%',
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 25, // Rounded corners for minimalist style
    elevation: 4, // Adds shadow for depth on Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 40,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff', // White text for contrast against gradient background
    fontWeight: '600', // Slightly bold text
    textAlign: 'center',
  },
});

export default DiceSelector;
