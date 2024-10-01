import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const categories = [
  'All',
  'Mobile Development',
  'Web Development',
  'Design',
  'Backend Development',
];

const Cource = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  // Fetch courses from the backend API
  const fetchCourses = async () => {
    try {
      const res = await axios.post('http://10.0.2.2:3000/fetchcourse'); // Use POST method
      if (res) {
        setCourses(res.data.data); // Assuming the courses are in 'data'
        // console.log(res.data.data);
      } else {
        console.log('Problem fetching courses');
        setError('Problem fetching courses');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError('Error fetching courses');
    }
  };

  // Fetch courses when the component mounts
  useEffect(() => {
    fetchCourses();
  }, []);

  // Filter courses based on the selected category
  const filteredCourses =
    selectedCategory === 'All'
      ? courses
      : courses.filter(course => course.category === selectedCategory);

  // Render a single course item

 

  const renderCourseItem = ({ item }) => (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('ViewCourceStack', {course: item})}>
      <View style={styles.courseCard}>
        <View style={styles.categoryTag}>
          <Text style={styles.categoryText2}>{item.category}</Text>
        </View>
        <Image
          source={{ uri: item.imageUrl || 'https://imgs.search.brave.com/bEdhPwVY999DtrOvmIRnmmMKJrDrxNNcMabCyDXr8Ss/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cHVibGljZG9tYWlu/cGljdHVyZXMubmV0/L3BpY3R1cmVzLzI4/MDAwMC92ZWxrYS9u/b3QtZm91bmQtaW1h/Z2UtMTUzODM4NjQ3/ODdsdS5qcGc' }}
          style={{ width: '100%', height: 180, borderRadius: 8 }}
        />
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseDuration}>{new Date(item.createdAt).toLocaleDateString()}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Courses</Text>
      <TextInput placeholder="Search" style={styles.searchBar} />
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.filterText}>
          <AntDesign name="filter" size={18} />
        </Text>
      </TouchableOpacity>

      {/* Modal for selecting category */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select a Category</Text>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryButton}
                onPress={() => {
                  setSelectedCategory(category);
                  setModalVisible(false);
                }}>
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Display course list or error */}
      {error ? (
        <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
      ) : (
        <FlatList
          data={filteredCourses}
          renderItem={renderCourseItem}
          keyExtractor={item => item._id} // Assuming the backend returns an _id field
          contentContainerStyle={styles.courseList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 20,
  },
  searchBar: {
    backgroundColor: '#E7E7E7',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 30,
    padding: 15,
    fontSize: 18,
    textAlign: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  filterButton: {
    width: 50,
    height: 50,
    backgroundColor: '#5E9CEA',
    borderRadius: 100,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 1,
    margin: 10,
  },
  filterText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  categoryButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    width: '100%',
  },
  categoryText: {
    fontSize: 16,
    color: '#000',
  },
  categoryText2: {
    fontSize: 16,
    color: '#fff',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 10,
  },
  closeText: {
    color: '#333',
    fontWeight: 'bold',
  },
  courseList: {
    paddingBottom: 20,
  },
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
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

export default Cource;
