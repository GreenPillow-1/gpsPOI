import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useRouter } from 'expo-router';

export default function AddPOIScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coords, setCoords] = useState(null);
  const router = useRouter();

  const handleMapPress = (e: MapPressEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setCoords({ latitude, longitude });
  };

  const handleSubmit = async () => {
    if (!title || !description || !coords) {
      Alert.alert('Missing info', 'Please enter title, description and tap a location on the map.');
      return;
    }

    try {
      await addDoc(collection(db, 'pois'), {
        title,
        description,
        latitude: coords.latitude,
        longitude: coords.longitude,
        createdAt: new Date(),
      });
      Alert.alert('POI added!');
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.note}>Tap anywhere on the map to place your POI 📍</Text>

      <MapView
        style={styles.map}
        onPress={handleMapPress}
        initialRegion={{
          latitude: -37.8136,
          longitude: 144.9631,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {coords && <Marker coordinate={coords} />}
      </MapView>

      <View style={styles.form}>
        <TextInput placeholder="POI Title" value={title} onChangeText={setTitle} style={styles.input} />
        <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={styles.input} />
        <Button title="Add POI" onPress={handleSubmit} />
        <View style={{ marginTop: 10 }}>
          <Button title="Back" color="#888" onPress={() => router.back()} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  form: { padding: 20 },
  input: { borderWidth: 1, marginBottom: 12, padding: 10, borderRadius: 5 },
  note: { padding: 10, textAlign: 'center', fontStyle: 'italic', backgroundColor: '#f2f2f2' },
});
