import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const App = ({navigation}) => {
  const [userData, setuserData] = useState();

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = await AsyncStorage.getItem('@user_token');
        const response = await axios.post('http://10.0.2.2:3000/fetchuser', {
          token,
        });
        setuserData(response.data.user);
      } catch (error) {
        console.error('Error fetching user data from token:', error);
      }
    };
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          {userData ? (
            <Text style={styles.greeting}>Hi, {userData.name}</Text>
          ) : (
            <Text style={styles.greeting}>Welcome</Text>
          )}
          <Image
            source={{
              uri: 'https://imgs.search.brave.com/kOQMyrptbg2EAQj11na_hJfJQcL7U2B65XbBVtHznv0/rs:fit:860:0:0:0/g:ce/aHR0cDovL3ZlY3Rp/cHMuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDE5LzExL3R1/dG9yaWFsLXByZXZp/ZXctbGFyZ2UucG5n',
            }}
            style={styles.profilePic}
          />
        </View>
        <LinearGradient colors={['#DCE6F5', '#A6C8F7']} style={styles.card}>
          <Text style={styles.cardTitle}>
            What would you like to learn today?
          </Text>
          <TouchableOpacity style={styles.getStartedButton}>
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>For You</Text>
          <TouchableOpacity>
            <Text
              style={styles.seeAll}
              onPress={() => navigation.navigate('CourceStack')}>
              -- See All
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.forYouCards}>
          <TouchableOpacity
            style={styles.smallCard}
            onPress={() => navigation.navigate('ViewCourceStack')}>
            <Image
              source={{
                uri: 'https://imgs.search.brave.com/nujkiM7BYsM4REEVYtJfNHmIhL9qqQHldRR6c85Cwr4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cGljbWFrZXIuY29t/L3RlbXBsYXRlcy9f/bmV4dC9pbWFnZT91/cmw9aHR0cHM6Ly9z/dGF0aWMucGljbWFr/ZXIuY29tL3NjZW5l/LXByZWJ1aWx0cy90/aHVtYm5haWxzL1lU/LTAwNzkucG5nJnc9/Mzg0MCZxPTc1',
              }}
              style={{width: '100%', height: 180, borderRadius: 8}}
            />
            <Text style={styles.cardText}>
              The full course on learning german
            </Text>
            <Text style={styles.cardSubtitle}>30 min</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallCard}>
            <Image
              source={{
                uri: 'https://d3f1iyfxxz8i1e.cloudfront.net/courses/course_image/252254af930a.jpg',
              }}
              style={{
                width: '100%',
                height: 180,
                borderRadius: 8,
              }}
            />
            <Text style={styles.cardText}>
              Editing Premium YouTube Thumbnail Templates in Photoshop
            </Text>
            <Text style={styles.cardSubtitle}>60 min</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallCard}>
            <Image
              source={{
                uri: 'https://cdn.prod.website-files.com/63a9fb94e473f36dbe99c1b1/66b25ca063efd7de0dcdaa8a_651bc96cdf6e16f2d4f9f37d_aVrJ1JlvSHeyJIE60VI5.jpeg',
              }}
              style={{width: '100%', height: 180, borderRadius: 8}}
            />
            <Text style={styles.cardText}>
              How to use the user suggest chrome extention
            </Text>
            <Text style={styles.cardSubtitle}>20 min</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    textTransform: 'capitalize',
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#5E9CEA',
  },
  card: {
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495E',
  },
  getStartedButton: {
    backgroundColor: '#5E9CEA',
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
  },
  getStartedText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  seeAll: {
    color: '#5E9CEA',
  },
  forYouCards: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  smallCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  cardText: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#34495E',
    textTransform: 'capitalize',
  },
  cardSubtitle: {
    width: '100%',
    fontSize: 14,
    color: 'gray',
    textAlign: 'left',
    marginTop: 5,
  },
});

export default App;
