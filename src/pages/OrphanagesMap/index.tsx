import React, { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import mapMarker from '../../images/map-marker.png';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import api from '../../services/api';

interface IOrphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap() {
    const navigation = useNavigation();
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
    const [orphanages, setOrphanages] = useState<IOrphanage[]>([]);

    useEffect(() => {
      async function loadPosition(){
        const { status } = await Location.requestPermissionsAsync();
        
        if(status !== 'granted'){
          Alert.alert('Oooops...', 'Precisamos de sua autorização para obter a localização');
          return;
        }
        
        const location = await Location.getCurrentPositionAsync();
        const { latitude, longitude} = location.coords;
  
        setInitialPosition([
          latitude,
          longitude
        ]);
      }
      loadPosition();
    }, [])
    
    useFocusEffect(() => {
      async function load() {
        const response = await api.get('orphanages');
        setOrphanages(response.data);
      }
      load();
    });

    const handleNavigateToOrphanageDetails = (id: number) => {
        navigation.navigate('OrphanageDetails', { id });
    }

    const handleNavigateToCreateOrphanage = () => {
      navigation.navigate('SelectMapPosition')
    }
    
  return (
    <View style={styles.container}>
      {initialPosition[0] !== 0 && (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map} 
        initialRegion={{
          latitude: initialPosition[0],
          longitude: initialPosition[1],
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        }}
      >
          {orphanages.map(orphanage => (
            <Marker
              key={orphanage.id}
              icon={mapMarker}
              calloutAnchor={{
                x: 2.7,
                y: 0.8,
              }}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
          >
            <Callout 
              tooltip
              onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}
            >
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>
                  {orphanage.name}
                </Text>
              </View>
            </Callout>
          </Marker>
          ))}
        </MapView>
      )}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {`${orphanages.length} orfanatos encontrados`}
          </Text>
          <RectButton 
            style={styles.createOrphanageButton}
            onPress={handleNavigateToCreateOrphanage}
          >
            <Feather name='plus' size={20} color='#fff' />
          </RectButton>
        </View>
    </View>
  );
}

