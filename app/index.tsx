import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';

import { useDebounce } from '@/hooks/useDebounce';
import { Beverage } from '@/models';
import { useFetchAllBeveragesQuery } from '@/store/menu/menu.api';
import { SearchBar } from '@/components/common/Home/SearchBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  list: {
    marginTop: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginBottom: 18,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  listItemText: {
    color: '#000',
    fontSize: 14,
  },
});

export default function Index() {
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce<string>(search, 750);
  const { isLoading, data } = useFetchAllBeveragesQuery(debouncedValue || '');

  const renderItem: ListRenderItem<Beverage> = ({ item }) => (
    <TouchableOpacity key={item.id} style={styles.listItem}>
      <Text style={styles.listItemText}>{item.title}</Text>
      <Text style={styles.listItemText}>${Number(item.price).toFixed(2)}</Text>
    </TouchableOpacity>
  );

  const renderListEmptyComponent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" color="#00f" />;
    }

    return <Text>No beverages found!</Text>;
  };

  return (
    <View style={styles.container}>
      <SearchBar value={search} onChangeText={setSearch} />

      <FlatList
        style={styles.list}
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={renderListEmptyComponent}
      />
    </View>
  );
}
