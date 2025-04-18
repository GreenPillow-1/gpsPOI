import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import { FAB } from 'react-native-paper';

export default function Home() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pois, setPOIs] = useState([]);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.replace('/login');
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location access is required to use the map.');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
      setLoading(false);

      const unsubscribe = onSnapshot(collection(db, 'pois'), (snapshot) => {
        const poiList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPOIs(poiList);
      });

      return () => unsubscribe();
    })();
  }, []);

  if (loading || !location) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={location} title="You are here" />
        {pois.map(poi => (
          <Marker
            key={poi.id}
            coordinate={{
              latitude: poi.latitude,
              longitude: poi.longitude,
            }}
            title={poi.title}
            description={poi.description}
            pinColor="green"
          />
        ))}
      </MapView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push('/add-poi')}
      />

      <View style={styles.logoutBtn}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 80,
    backgroundColor: '#6200ee',
  },
  logoutBtn: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
});
