/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Heading, Input, FormControl, ScrollView} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';

const Edit = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [totalNoSeason, setTotalNoSeason] = useState('');
  const [id, setId] = useState(null);

  const update = async () => {
    try {
      if (!name || !totalNoSeason) {
        return Snackbar.show({
          text: 'Please fill both fields',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#D82E2F',
        });
      }

      const storedValue = await AsyncStorage.getItem('@season_list');
      const list = await JSON.parse(storedValue);

      list.map(series => {
        if (series.id === id) {
          series.name = name;
          series.totalNoSeason = totalNoSeason;
        }
        return series;
      });

      await AsyncStorage.setItem('@season_list', JSON.stringify(list));

      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const {season} = route.params;
    const {id, name, totalNoSeason} = season;

    setId(id);
    setName(name);
    setTotalNoSeason(totalNoSeason);
  }, [route.params]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Heading size="xl" style={styles.heading}>
        Update Web Series
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
          style={styles.btnStyle}
          onPress={update}>
          Update
        </Button>
      </FormControl>
    </ScrollView>
  );
};

export default Edit;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'flex-start',
  },
  heading: {
    textAlign: 'center',
    color: '#eee',
    marginHorizontal: 5,
    marginTop: 50,
    marginBottom: 20,
  },
  formItem: {
    marginBottom: 20,
  },
  btnStyle: {
    backgroundColor: '#5067ff',
    color: '#eee',
  },
});
