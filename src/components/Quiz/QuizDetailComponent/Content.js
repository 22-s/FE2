import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import WhiteBox from '../../../components/Quiz/QuizDetailComponent/WhiteBox';
import QuestionMan from '../../../assets/images/QuizDetail/QuestionMan.svg';

const Content = ({content}) => {
  return (
    <WhiteBox minHeight={416}>
      <View style={styles.container}>
        <Text style={styles.text}>{content}</Text>
        <QuestionMan width={258} height={258} />
      </View>
    </WhiteBox>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    width: 359,
    flexDirection: 'column',
    justifyContent: 'center',
    color: '#72777A',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    paddingHorizontal: 20,
    // backgroundColor: 'yellow'
  },
});

export default Content;