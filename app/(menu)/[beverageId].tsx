import React from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Icon from '@expo/vector-icons/FontAwesome';

import { getCashFormat } from '@/libs/utils/helpers';
import { useFetchBeverageByIdQuery, useToggleBeverageFavoriteMutation } from '@/store/menu/menu.api';

export default function BeverageDetailsScreen() {
  const { beverageId } = useLocalSearchParams();
  const { isLoading, isFetching, data } = useFetchBeverageByIdQuery(Number(beverageId));
  const [toggleFavorite, { isLoading: isToggling }] = useToggleBeverageFavoriteMutation();

  const handleToggleFavorite = () => toggleFavorite(Number(beverageId));;

  return (
    <View style={styles.container}>
      {isLoading || isFetching ? (
        <ActivityIndicator size="large" color="#00f" />
      ) : (
        <>
          <Image source={{ uri: data?.imgUrl }} style={styles.img} />

          <View style={styles.body}>
            <View>
              <Text style={styles.title}>
                {data?.title} - {getCashFormat(Number(data?.price))}
              </Text>

              <Text style={styles.subtitle}>Stars: {data?.starsCount}</Text>

              <Text style={styles.subtitle}>
                {data?.description}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.toggleFavoriteBtn}
              disabled={isToggling}
              onPress={handleToggleFavorite}
            >
              <Icon name={data?.isFavorite ? 'star' : 'star-o'} size={30} color="orange" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: '5%',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '400',
    marginTop: '2.5%',
  },
  img: {
    flex: 0.55,
    borderRadius: 10,
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleFavoriteBtn: {
    marginRight: '2%',
  },
});
