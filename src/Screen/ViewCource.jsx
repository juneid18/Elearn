import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Video from 'react-native-video';
import {SafeAreaView} from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import Snackbar from 'react-native-snackbar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ViewCourse = ({route}) => {
  const {course} = route.params;
  const [userID, setuserID] = useState();

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = await AsyncStorage.getItem('@user_token');
        const response = await axios.post('http://10.0.2.2:3000/fetchuser', {
          token,
        });
        setuserID(response.data.user.id);
      } catch (error) {
        console.error('Error fetching user data from token:', error);
      }
    };
    getUser();
  }, []);


  const OnShare = async () => {
    try {
      await Share.share({
        message: `Check out this course: ${course?.title || 'Amazing Course'}`,
      });
    } catch (error) {
      Snackbar.show({
        text: 'Something went wrong!',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  const [liked, setLiked] = useState(false);

  const toggleLike = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:3000/likeVideo', {
          userId: userID, // Your current user's ID
          videoId: course._id,
      });
      console.log(response.data.message);
  } catch (error) {
      console.error('Error liking video:', error);
  }
    setLiked(!liked);
  };
  const dateObj = new Date(course.createdAt);
  const formattedDate = dateObj.toLocaleDateString();

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        {course ? (
          <>
            <View style={styles.wrapper}>
              <Video
                source={{uri: course.videoUrl}} // Use course's video URL
                style={styles.video}
                controls={true}
                resizeMode="cover"
              />
            </View>
            <View style={styles.TitleWrapper}>
              <Text style={styles.TitleText}>{course.title}</Text>
              <Text style={{marginHorizontal: 10}}>{formattedDate}</Text>
              <View style={styles.LikeShareWrapper}>
                <TouchableOpacity
                  onPress={toggleLike}
                  style={styles.likeButton}>
                  <Entypo
                    name={liked ? 'heart' : 'heart-outlined'}
                    size={30}
                    color={liked ? '#FF0000' : '#000'}
                  />
                  <Text style={styles.likeText}>
                    {liked ? 'Liked' : 'Like'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={OnShare} style={styles.likeButton}>
                  <Entypo name="share" size={30} color={'#000'} />
                  <Text style={styles.likeText}>Share</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.SummaryContainer}>
                <Text style={styles.SummaryTitle}>Summary</Text>
                <Text style={styles.SummaryDetail}>{course.description}</Text>
                <Text style={styles.SummaryTitle}>Category</Text>
              <View style={styles.categoryTag}>
                <Text style={styles.categoryText2}>{course.category}</Text>
              </View>
              </View>

            </View>
          </>
        ) : (
          <Text style={styles.errorText}>No course data available.</Text>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default ViewCourse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  wrapper: {
    width: '100%',
    height: 250,
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  video: {
    width: '100%',
    height: 250,
  },
  TitleWrapper: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  TitleText: {
    padding: 10,
    fontSize: 22,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  LikeShareWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fafafa',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  SummaryContainer: {
    width: '100%',
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  SummaryTitle: {
    fontSize: 26,
    color: '#000',
    fontWeight: '600',
    marginBottom: 10,
  },
  SummaryDetail: {
    fontSize: 18,
    marginVertical: 10,
    color: '#555',
    textAlign: 'justify',
    lineHeight: 24,
  },
  likeButton: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
  },
  likeText: {
    fontSize: 16,
    marginLeft: 5,
    color: '#000',
  },
  errorText: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  categoryTag: {
    width: '50%',
    backgroundColor: '#FFC107',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  categoryText2: {
    fontSize: 16,
    color: '#fff',
    fontWeight:'bold',
  },
});
