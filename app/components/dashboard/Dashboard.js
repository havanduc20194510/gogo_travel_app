import {StyleSheet, Text, View} from 'react-native';
import Const from '../../const/Const';
import AppColors from '../../../assets/AppColors';


function Dashboard(props) {
  const {objArray} = props;
  return (
    <View style={styles.cardWrapper}>
      {objArray.map((item, index) => {
        return (
          <View style={styles.row}>
            <Text style={styles.label}>{item.key}</Text>
            <Text style={styles.content}>{item.value}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    display: 'flex',
    backgroundColor: AppColors.white,
    paddingHorizontal: Const.space_9,
    // paddingVertical: Const.space_10,
    borderRadius: Const.space_10,
    padding: '0',
  },
  row: {
    paddingVertical: Const.space_12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Const.space_32,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E9E9E9',
  },
  label: {
    fontSize: Const.space_12,
    color: '#626262',
    fontFamily: 'Inter',
    fontWeight: '400',
    lineHeight: Const.space_,
    wordWrap: 'break-word',
  },
  content: {
    fontSize: Const.space_14,
    fontWeight: '400',
    lineHeight: Const.space_21,
    color: AppColors.black,
  },
});

export default Dashboard;
