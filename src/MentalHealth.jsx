import {Picker} from '@react-native-picker/picker';
import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const gifImg = require('./assets/images/mentalhealth.gif');

const MentalHealth = () => {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [mood, setMood] = useState('');
  const [stressLevel, setStressLevel] = useState('');
  const [dietGoals, setDietGoals] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [error, setError] = useState(''); // State to store validation error messages

  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity

  const handleSubmit = () => {
    // Reset error messages
    setError('');

    // Validation
    if (!username || !age || !mood || !stressLevel || !dietGoals) {
      setError('Please fill out all fields.');
      return;
    }

    if (username.length < 4) {
      setError('Name must be at least 4 characters.');
      return;
    }

    const ageNumber = parseInt(age, 10);
    if (ageNumber <= 8) {
      setError('Age must be greater than 8.');
      return;
    }

    const stressLevelNumber = parseInt(stressLevel, 10);
    if (stressLevelNumber < 1 || stressLevelNumber > 10) {
      setError('Stress level must be between 1 and 10.');
      return;
    }

    // Generate recommendations
    let recommendationText = `Hello, ${username}!\n\nBased on your mood (${mood}) and stress level (${stressLevel}), here are some recommendations:\n`;

    // Mood-based recommendations
    switch (mood) {
      case 'happy':
        recommendationText +=
          'Keep up the positive vibes! Consider a balanced diet rich in fruits and vegetables.\n';
        break;
      case 'sad':
        recommendationText +=
          'Engage in light physical activity and try comforting foods like oatmeal or dark chocolate.\n';
        break;
      case 'anxious':
        recommendationText +=
          'Practice mindfulness and eat foods rich in omega-3 fatty acids like salmon or walnuts.\n';
        break;
      case 'angry':
        recommendationText +=
          'Consider calming activities like meditation and foods like yogurt or dark leafy greens.\n';
        break;
      case 'excited':
        recommendationText +=
          'Channel that excitement into creative activities or workouts, and enjoy balanced meals!\n';
        break;
    }

    // Diet goal recommendations
    switch (dietGoals) {
      case 'weight_loss':
        recommendationText +=
          'Consider portion control and try incorporating more fruits and vegetables into your meals.\n';
        break;
      case 'muscle_gain':
        recommendationText +=
          'Focus on high-protein foods like chicken, fish, and legumes.\n';
        break;
      case 'maintain_health':
        recommendationText +=
          'Enjoy a balanced diet with whole grains, lean proteins, and plenty of water.\n';
        break;
    }

    // Show recommendations
    setRecommendations(recommendationText);

    // Trigger fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1, // Final opacity value
      duration: 500, // Duration in milliseconds
      useNativeDriver: true,
    }).start();
  };

  const handleReset = () => {
    setUsername('');
    setAge('');
    setMood('');
    setStressLevel('');
    setDietGoals('');
    setRecommendations('');
    setError(''); // Reset error messages
    fadeAnim.setValue(0); // Reset fade animation
  };

  // Change borderColor based on mood
  const getBorderColor = () => {
    switch (mood) {
      case 'happy':
        return '#2195F3AE';
      case 'sad':
        return '#A777FFFF';
      case 'anxious':
        return '#FF6A00FF';
      case 'angry':
        return '#F4365CFF';
      case 'excited':
        return '#4caf50';
      default:
        return '#00796b';
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('./assets/images/mentalhealth.gif')}
          style={styles.image}
        />
      </View>
      <Text style={[styles.title]}>
        {!recommendations
          ? 'Virtual Mental Health Companion'
          : 'Your Virtual Mental Health Result'}
      </Text>

      {/* Display validation error if any */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {!recommendations ? (
        <>
          <View style={styles.formGroup}>
            <Text style={styles.topText}>Enter your name:</Text>
            <TextInput
              style={[styles.input, {borderColor: getBorderColor()}]}
              value={username}
              onChangeText={setUsername}
              placeholder="Your name"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.topText}>Enter your age:</Text>
            <TextInput
              style={[styles.input, {borderColor: getBorderColor()}]}
              value={age}
              onChangeText={setAge}
              placeholder="Your age"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.topText}>How do you feel today?</Text>
            <View
              style={[styles.pickerContainer, {borderColor: getBorderColor()}]}>
              <Picker
                selectedValue={mood}
                onValueChange={itemValue => setMood(itemValue)}
                style={styles.inputPicker}>
                <Picker.Item label="Select your mood" value="" />
                <Picker.Item label="Happy" value="happy" />
                <Picker.Item label="Sad" value="sad" />
                <Picker.Item label="Anxious" value="anxious" />
                <Picker.Item label="Excited" value="excited" />
                <Picker.Item label="Angry" value="angry" />
              </Picker>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.topText}>Rate your stress level (1-10):</Text>
            <TextInput
              style={[styles.input, {borderColor: getBorderColor()}]}
              value={stressLevel}
              onChangeText={setStressLevel}
              placeholder="Stress Level"
              keyboardType="numeric"
              maxLength={2}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.topText}>Select your diet goal:</Text>
            <View
              style={[styles.pickerContainer, {borderColor: getBorderColor()}]}>
              <Picker
                selectedValue={dietGoals}
                onValueChange={itemValue => setDietGoals(itemValue)}
                style={styles.inputPicker}>
                <Picker.Item label="Select your goal" value="" />
                <Picker.Item label="Weight Loss" value="weight_loss" />
                <Picker.Item label="Muscle Gain" value="muscle_gain" />
                <Picker.Item label="Maintain Health" value="maintain_health" />
              </Picker>
            </View>
          </View>

          {/* Gradient Button for Get Recommendations */}
          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.buttonContainer}>
            <LinearGradient
              colors={['#4caf50', '#2e7d32']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.gradientButton}>
              <Text style={styles.buttonText}>Get Recommendations</Text>
            </LinearGradient>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Animated.View
            style={[
              styles.output,
              {opacity: fadeAnim, borderColor: getBorderColor()},
            ]}>
            <Text style={styles.recommendationText}>{recommendations}</Text>
          </Animated.View>
          {/* Reset Button */}
          <TouchableOpacity
            onPress={handleReset}
            style={styles.resetButtonContainer}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 10,
                marginTop: 10,
              }}>
              <LinearGradient
                colors={['#366FF4FF', '#2872C6FF']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={[styles.gradientButton]}>
                <Text style={styles.buttonText}>Reset</Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#e8f5e9',
    width: deviceWidth,
    minHeight: deviceHeight,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796b',
    textAlign: 'center',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  topText: {
    fontFamily: 'Poppins-Regular',
    color: '#333',
  },
  inputPicker: {
    padding: 10,
  },
  pickerContainer: {
    borderWidth: 2,
    marginTop: 5,
    borderRadius: 5,
  },
  output: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    marginTop: 20,
    borderRadius: 20,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android: {
        elevation: 5, // Shadow for Android
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
    }),
  },
  recommendationText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  gradientButton: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      android: {
        elevation: 3,
      },
    }),
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default MentalHealth;
