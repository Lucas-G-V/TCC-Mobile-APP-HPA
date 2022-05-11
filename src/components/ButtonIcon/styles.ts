import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 45,
    backgroundColor: theme.colors.primarycolor,
    borderRadius: 31,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5
  },
  title: {
    flex: 2,
    color: theme.colors.heading,
    fontSize: 18,
    
  
    textAlign: 'center'
  },
  iconWrapper: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: theme.colors.line
  },
  icon: {
    width: 24,
    height: 18
  }
});