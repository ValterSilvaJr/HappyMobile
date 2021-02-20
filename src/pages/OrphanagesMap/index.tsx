import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import mapMarker from '../../images/map-marker.png';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

export default function OrphanagesMap() {
    const navigation = useNavigation();

    const handleNavigateToOrphanageDetails = () => {
        navigation.navigate('OrphanageDetails');
    }
    
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map} 
        initialRegion={{
          latitude: -23.8349263,
          longitude: -46.718843,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        }}>
          <Marker
            icon={mapMarker}
            calloutAnchor={{
              x: 2.7,
              y: 0.8,
            }}
            coordinate={{
              latitude: -23.8349263,
              longitude: -46.718843,            }}
          >
            <Callout 
              tooltip
              onPress={handleNavigateToOrphanageDetails}
            >
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>
                  Lar das meninas
                </Text>
              </View>
            </Callout>
          </Marker>
        </MapView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            2 Orfanatos encontrados
          </Text>
          <TouchableOpacity 
            style={styles.createOrphanageButton}
            onPress={() => {}}
          >
            <Feather name='plus' size={20} color='#fff' />
          </TouchableOpacity>
        </View>
    </View>
  );
}

