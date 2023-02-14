/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import {
  Text,
  Fab,
  Icon,
  Button,
  Checkbox,
  Heading,
  VStack,
  HStack,
  Divider,
  Spinner,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {ScrollView} from 'react-native';

const Home = ({navigation}) => {
  const [listOfSeasons, setListOfSeasons] = useState([]);
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  const getList = async () => {
    setLoading(true);

    const storedValue = await AsyncStorage.getItem('@season_list');

    if (!storedValue) {
      setListOfSeasons([isFocused]);
    }

    const list = JSON.parse(storedValue);
    setListOfSeasons(list);
    setLoading(false);
  };

  const deleteSeasons = async id => {
    const newList = await listOfSeasons.filter(item => item.id !== id);
    await AsyncStorage.setItem('@season_list', JSON.stringify(newList));
    setListOfSeasons(newList);
  };

  const markComplete = async id => {
    const newArr = listOfSeasons.map(item => {
      if (item.id === id) {
        item.isWatched = !item.isWatched;
      }
      return item;
    });

    await AsyncStorage.setItem('@season_list', JSON.stringify(newArr));
    setListOfSeasons(newArr);
  };

  useEffect(() => {
    getList();
  }, [isFocused]);

  if (loading) {
    return (
      <View>
        <Spinner color="#00b7c2" />
      </View>
    );
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {listOfSeasons.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Heading style={styles.heading}>
            Watchlist is empty. Please add a season!
          </Heading>
        </View>
      ) : (
        <>
          <Heading style={styles.heading}>Next series to watch</Heading>
          <Divider />

          <VStack space={3} w="100%" p={2}>
            {listOfSeasons.map(season => (
              <HStack
                key={season.id}
                justifyContent="space-between"
                alignItems="center"
                style={{
                  backgroundColor: '#171E2E',
                  borderWidth: 1,
                  borderColor: 'gray',
                  borderRadius: 6,
                }}
                p={2}>
                <View>
                  <HStack space={1}>
                    <Button
                      colorScheme="danger"
                      size="lg"
                      onPress={() => deleteSeasons(season.id)}>
                      <Icon
                        color="white"
                        as={<AntDesign name="delete" />}
                        size="sm"
                      />
                    </Button>
                    <Button style={{backgroundColor: '#5067ff'}} size="lg">
                      <Icon
                        color="white"
                        as={<Feather name="edit" />}
                        size="sm"
                        onPress={() => {
                          navigation.navigate('Edit', {season});
                        }}
                      />
                    </Button>
                  </HStack>
                </View>

                <View>
                  <Text style={styles.seasonName}>{season.name}</Text>
                  <Text style={{color: 'gray'}}>
                    {season.totalNoSeason} seasons to watch
                  </Text>
                </View>

                <Checkbox
                  size="md"
                  colorScheme="blue"
                  isChecked
                  onPress={() => markComplete(season.id)}
                />
              </HStack>
            ))}
          </VStack>
        </>
      )}

      <Fab
        style={{
          backgroundColor: '#5067ff',
        }}
        renderInPortal={false}
        shadow={5}
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="xl" />}
        onPress={() => navigation.navigate('Add')}
      />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: '#1b262c',
    flex: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    color: '#eee',
    marginVertical: 15,
    marginHorizontal: 5,
  },
  actionButton: {
    marginLeft: 5,
  },
  seasonName: {
    color: '#fdcb9e',
    textAlign: 'justify',
  },
  listItem: {
    marginLeft: 0,
    marginBottom: 20,
  },
});
