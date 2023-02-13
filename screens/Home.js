/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text} from 'react-native';

import {Fab, Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native';

const Home = ({navigation, route}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{color: '#fff'}}>List of Seasons goes here</Text>

      <Fab
        style={{backgroundColor: '#5067ff'}}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
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
