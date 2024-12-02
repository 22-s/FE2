import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import Copy from '../../assets/images/Buiz/Copy.svg';

const LinkButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.navButton} onPress={onPress}>
      <Copy width={27} height={24} />
      <Text style={styles.buttonText}>링크 복사</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  navButton: {
    width: 52,
    height: 52,
    backgroundColor: '#FFF',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#DADADA',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 9,
    position: 'absolute',
    bottom: 50,
    right: 40,
  },
  buttonText: {
    color: '#767676',
    fontSize: 8.5,
    fontWeight: '600',
  },
});

export default LinkButton;
