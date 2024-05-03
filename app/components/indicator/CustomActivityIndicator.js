import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Global from '../Global';
import GlobalIndicator from './GlobalIndicator';

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    width: 'auto',
    height: 'auto',
    maxHeight: 120,
    maxWidth: 200,
    alignItems: 'center',
    overflow: 'hidden',
    justifyContent: 'center',
    paddingHorizontal: Global.Const.space_24,
    paddingVertical: Global.Const.space_20,
  },
});

export const ActivityIndicatorCustom = ({
  visible,
  text,
  customView,
  animationType,
}) => {
  const [visibleModal, setVisibleModal] = useState(visible);
  useEffect(() => {
    setVisibleModal(visible);
  }, [visible]);
  return (
    <Modal animationType={'none'} transparent={true} visible={visibleModal}>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}
        onPress={() => GlobalIndicator.hide()}>
        <View style={[styles.viewContainer]}>
          <View
            style={{
              maxHeight: 80,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {(customView === undefined || customView == null) && (
              <ActivityIndicator
                size="large"
                color="red"
                style={{marginBottom: 8}}
              />
            )}
            {customView !== undefined && customView != null && customView}
          </View>
          {text !== undefined && text != null && (
            <Text
              style={[
                Global.Styles.Text.primary,
                {
                  marginTop: 8,
                  fontSize: 15,
                  color: 'white',
                  textAlign: 'center',
                },
              ]}>
              {text}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
