import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { setName } from '../actions/userActions';

const Counter = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Nome:</Text>
        <Text>{props.name}</Text>

        <Button title="Botar nome João" onPress={() => props.setName('João')} />
        <Button title="Botar nome Paulo" onPress={() => props.setName('Paulo')} />
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const mapStateToProps = (state) => {
  return {
    name: state.userReducer.name
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setName:(name)=> setName(name, dispatch)
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);