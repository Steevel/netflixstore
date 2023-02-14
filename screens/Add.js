/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {
  Button,
  FormControl,
  Heading,
  Input,
  NativeBaseProvider,
  ScrollView,
} from 'native-base';
import shortid from 'shortid';
import AsyncStorage from '@react-native-community/async-storage';
// import shortid from 'shortid';
// import AsyncStorage from '@react-native-community/async-storage';

const Add = ({navigation}) => {
  const [name, setName] = useState('');
  const [totalNoSeason, setTotalNoSeason] = useState('');

  const addToList = async () => {
    try {
      if (!name || !totalNoSeason) {
        return alert('Please add both fields');
        //TODO: ADD SNACKBAR HERE
      }

      const seasonToAdd = {
        id: shortid.generate(),
        name: name,
        totalNoSeason: totalNoSeason,
        isWatched: false,
      };

      const storedValue = await AsyncStorage.getItem('@season_list');
      const prevList = await JSON.parse(storedValue);

      if (!prevList) {
        const newList = [seasonToAdd];
        await AsyncStorage.setItem('@season_list', JSON.stringify(newList));
      } else {
        prevList.push(seasonToAdd);
        await AsyncStorage.setItem('@season_list', JSON.stringify(prevList));
      }

      navigation.navigate('Home');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Heading size="xl" style={styles.heading}>
        Add to Watch List
      </Heading>
      <FormControl style={styles.formStyle}>
        <Input
          variant="rounded"
          p={2}
          m={4}
          placeholder="Season name"
          style={{color: '#eee'}}
          value={name}
          onChangeText={text => setName(text)}
        />
        <Input
          variant="rounded"
          p={2}
          m={4}
          placeholder="Total number of seasons"
          style={{color: '#eee'}}
          value={totalNoSeason}
          onChangeText={text => setTotalNoSeason(text)}
        />
        <Button
          m={4}
          size="lg"
          borderRadius="full"
          style={{backgroundColor: '#5067ff'}}
          onPress={addToList}>
          <Text style={{color: '#eee'}}>Add</Text>
        </Button>
      </FormControl>
    </ScrollView>
  );
};

export default Add;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    color: '#eee',
    marginHorizontal: 5,
    marginTop: 50,
    marginBottom: 20,
  },
});
