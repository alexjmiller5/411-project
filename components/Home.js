import { StyleSheet, View, Text } from 'react-native';

import Button from './Button';

export default function Home({user, navigation}) {
  return (
    <View style={styles.footerContainer}>
      <Text>Home Screen {user} </Text>
      <Button label="Find Nearby Fountains" onPress={() => navigation.navigate('WaterMap')} />
      <Button label="Find Nearest Water Fountain" onPress={() => navigation.navigate('Nearest')} />
      <Button label="Add Nearby Fountains" />
      <Button label="Show Eco Stats" />
    </View>
    );
}
const styles = StyleSheet.create({
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});

