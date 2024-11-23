import React, {useState} from 'react'; // useState를 import하는 위치 수정
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import WhiteBox from '../../../components/Quiz/QuizDetailComponent/WhiteBox';
import BookMarkButton from '../../../assets/images/QuizList/Bookmark.svg';
import BookmarkFilled from '../../../assets/images/QuizList/BookmarkFilled.svg';

const Title = ({content}) => {
  const [bookmark, setBookmark] = useState(false); // useState 호출 위치 유지

  return (
    <WhiteBox height={46} >
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
    </WhiteBox>
  );
};

const styles = StyleSheet.create({
  contentArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  text: {
    marginLeft: 20,
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '600',
  },
  bookMarkButton: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
});

export default Title;
