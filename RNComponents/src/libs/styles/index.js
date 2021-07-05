import { StyleSheet } from 'react-native';
import { COLORS } from '../colors';

export const GenericStyles = StyleSheet.create({
  fill: {
    flex: 1
  },
  row: {
    flexDirection: 'row'
  },
  centerAlignedRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  centerAlignedText: {
    textAlign: 'center'
  },
  centerAligned: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  justifyContentCenter: {
    justifyContent: 'center'
  },
  alignItemsCenter: {
    alignItems: 'center'
  },
  mr16: {
    marginRight: 16
  },
  mr12: {
    marginRight: 12
  },
  p16: {
    padding: 16
  },
  mt12: {
    marginTop: 12
  },
  whiteText: {
    color: COLORS.BACKGROUND.WHITE
  }
});
