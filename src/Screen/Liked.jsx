import { FlatList, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Liked = ({ navigation }) => {
  const [userID, setUserID] = useState(null);
  const [courses, setCourses] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = await AsyncStorage.getItem('@user_token');
        const response = await axios.post('http://10.0.2.2:3000/fetchuser', { token });
        setUserID(response.data.user.id);
      } catch (error) {
        console.error('Error fetching user data from token:', error);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!userID) {
        return; // Only fetch if userID is available
      }
      try {
        const res = await axios.post('http://10.0.2.2:3000/fetchlikeVideo', { userId: userID });
        console.log('Response:', res.data); // Log the entire response to inspect its structure
        if (res.data && res.data.data) {
          setCourses([res.data.data]); // Wrap it in an array
        } else {
          console.log("No courses found.");
          setCourses([]); // Ensure courses is set to an empty array if no courses are found
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }
    fetchCourses();
  }, [userID]); // Dependency on userID

  const renderCourseItem = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('ViewCourceStack', { course: item })}>
      <View style={styles.courseCard}>
        <View style={styles.categoryTag}>
          <Text style={styles.categoryText2}>{item.category}</Text>
        </View>
        <Image
          source={{ uri: item.imageUrl || 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg' }} // Default image URL
          style={{ width: '100%', height: 180, borderRadius: 8 }}
        />
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseDuration}>{new Date(item.createdAt).toLocaleDateString()}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <>
      {courses.length > 0 ? ( // Check if there are courses to display
        <FlatList
          data={courses}
          renderItem={renderCourseItem}
          keyExtractor={item => item._id} // Assuming the backend returns an _id field
          contentContainerStyle={styles.courseList}
          ListEmptyComponent={<Text style={{ textAlign: 'center' }}>No liked courses found.</Text>}
        />
      ) : (
        <Text style={{ textAlign: 'center' }}>Loading...</Text>
      )}
    </>
  );
}

export default Liked;

const styles = StyleSheet.create({
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 10,
    margin:10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A4A4A',
  },
  courseDuration: {
    fontSize: 14,
    color: '#7D7D7D',
    marginTop: 5,
  },
  categoryTag: {
    position: 'absolute',
    right: 10,
    zIndex: 1,
    width: 'auto',
    backgroundColor: '#FFC107',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
});
