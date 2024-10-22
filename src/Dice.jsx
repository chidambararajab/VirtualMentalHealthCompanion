import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DiceSelector from './DiceSelector'; // Import the DiceSelector component

// Get the screen width for responsive design
const {width} = Dimensions.get('window');

const DiceApp = () => {
  const [diceNumber1, setDiceNumber1] = useState(1); // Initial number for first dice
  const [diceNumber2, setDiceNumber2] = useState(1); // Initial number for second dice (if needed)
  const [isRolling, setIsRolling] = useState(false); // Track if the dice is rolling
  const [numOfDice, setNumOfDice] = useState(1); // Track how many dice to show (1 or 2)

  const rotateXAnim = useRef(new Animated.Value(0)).current; // RotateX animation
  const rotateYAnim = useRef(new Animated.Value(0)).current; // RotateY animation
  const rotateZAnim = useRef(new Animated.Value(0)).current; // RotateZ animation

  // Function to roll the dice with 3D effect
  const rollDice = () => {
    setIsRolling(true); // Set rolling state to true

    const randomNumber1 = Math.floor(Math.random() * 6) + 1; // Random number for first dice
    const randomNumber2 = Math.floor(Math.random() * 6) + 1; // Random number for second dice

    // Start the 3D roll animation with rotation along all axes
    Animated.sequence([
      Animated.parallel([
        Animated.timing(rotateXAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
        Animated.timing(rotateYAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
        Animated.timing(rotateZAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      // Reset animation values after roll
      rotateXAnim.setValue(0);
      rotateYAnim.setValue(0);
      rotateZAnim.setValue(0);

      setDiceNumber1(randomNumber1); // Set the final number for the first dice
      setDiceNumber2(randomNumber2); // Set the final number for the second dice
      setIsRolling(false); // Stop rolling
    });
  };

  // Function to display the dots on the dice based on the number
  const renderDots = diceNumber => {
    switch (diceNumber) {
      case 1:
        return <View style={styles.dot} />;

      case 2:
        return (
          <>
            <View style={styles.dot} />
            <View style={styles.dot} />
          </>
        );

      case 3:
        return (
          <>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </>
        );

      case 4:
        return (
          <>
            <View style={styles.row}>
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
            <View style={styles.row}>
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </>
        );

      case 5:
        return (
          <>
            <View style={styles.row}>
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
            <View style={styles.dot} />
            <View style={styles.row}>
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </>
        );

      case 6:
        return (
          <>
            <View style={styles.row}>
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
            <View style={styles.row}>
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </>
        );

      default:
        return null;
    }
  };

  // Interpolations for rotation along X, Y, and Z axes
  const rotateX = rotateXAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const rotateY = rotateYAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const rotateZ = rotateZAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={rollDice}
      activeOpacity={1}>
      {/* Dice Selector Component */}
      <DiceSelector setNumOfDice={setNumOfDice} />

      {/* First Dice */}
      <Animated.View
        style={[
          styles.diceContainer,
          {
            transform: [
              {rotateX: rotateX},
              {rotateY: rotateY},
              {rotateZ: rotateZ},
              {perspective: 1000}, // 3D perspective effect
            ],
          },
        ]}>
        {/* Show dots while rolling and number after the roll */}
        {!isRolling ? (
          renderDots(diceNumber1)
        ) : (
          <Text style={[styles.diceText, {opacity: 0.3}]}>{'🏀'}</Text>
        )}
      </Animated.View>

      {/* Render second dice only if 2 dice are selected */}
      {numOfDice === 2 && (
        <Animated.View
          style={[
            styles.diceContainer,
            {
              transform: [
                {rotateX: rotateX},
                {rotateY: rotateY},
                {rotateZ: rotateZ},
                {perspective: 1000}, // 3D perspective effect
              ],
            },
          ]}>
          {/* Show dots while rolling and number after the roll */}
          {!isRolling ? (
            renderDots(diceNumber2)
          ) : (
            <Text style={[styles.diceText, {opacity: 0.3}]}>{'🏀'}</Text>
          )}
        </Animated.View>
      )}

      <Text style={styles.text}>Tap anywhere to roll!</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },
  diceContainer: {
    width: width * 0.4,
    height: width * 0.4,
    backgroundColor: '#F5F3F3FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000000FF',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 1,
    shadowRadius: 10,
    marginBottom: 20, // Added margin for second dice
  },
  diceText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#6B63FFE7',
  },
  dot: {
    width: 20,
    height: 20,
    backgroundColor: '#000',
    borderRadius: 10,
    margin: 5,
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
    marginTop: 20,
    color: '#333',
  },
});

export default DiceApp;
