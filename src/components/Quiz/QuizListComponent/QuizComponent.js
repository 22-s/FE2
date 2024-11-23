import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Correct from '../../../assets/images/QuizList/Correct.svg';
import Wrong from '../../../assets/images/QuizList/Wrong.svg';
import BookMarkButton from '../../../assets/images/QuizList/Bookmark.svg';
import BookmarkFilled from '../../../assets/images/QuizList/BookmarkFilled.svg';

const QuizListComponent = ({content}) => {
  const [bookmark, setBookmark] = useState(false);

  return (
    <View style={styles.container}>
      <Correct style={styles.answer} />
      <View style={styles.contentArea}>
        <Text style={styles.text}>{content}</Text>
        {bookmark ? (
          <TouchableOpacity onPress={() => setBookmark(false)}>
            <BookmarkFilled style={styles.bookMarkButton} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => {setBookmark(true); console.log('아이콘 클릭');}}>
            <BookMarkButton style={styles.bookMarkButton} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 359,
    height: 68.3,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginTop: 11,
  },
  text: {
    marginLeft: 20,
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '600',
  },
  contentArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  answer: {
    position: 'relative',
    width: 32,
    height: 12,
    marginLeft: 9,
    marginTop: 8.3,
  },
  bookMarkButton: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
});

export default QuizListComponent;
