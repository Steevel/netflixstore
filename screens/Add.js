/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  NativeBaseProvider,
  ScrollView,
  Stack,
} from 'native-base';
// import shortid from 'shortid';
// import AsyncStorage from '@react-native-community/async-storage';

const Add = () => {
  // const [name, setName] = useState('');
  // const [totalNoSeason, setTotalNoSeason] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Heading size="xl" style={styles.heading}>
        Add to watchlist
      </Heading>
      <FormControl style={styles.formStyle}>
        <Input
          variant="rounded"
          p={2}
          m={4}
          placeholder="Season name"
          style={{color: '#eee'}}
        />
        <Input
          variant="rounded"
          p={2}
          m={4}
          placeholder="Total number of seasons"
          style={{color: '#eee'}}
        />
        <Button
          m={4}
          size="lg"
          borderRadius="full"
          style={{backgroundColor: '#5067ff'}}>
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
