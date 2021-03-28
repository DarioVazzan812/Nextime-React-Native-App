import React, { useState } from 'react';
import { Icon, Overlay, Button } from 'react-native-elements';
import { Hoshi } from 'react-native-textinput-effects';
import { View, Text, TouchableOpacity } from 'react-native';
import { palette } from '../styles/styles';

const Content = ({icon, title, value}) => (
  <View style={styles.content}>
    <Icon name={icon} type='feather'/>
    <View style={styles.details}>
      <Text style={styles.title}>{title}</Text> 
      <Text style={styles.value}>{value}</Text> 
    </View>
  </View>
)

const ModalEdition = ({ name, visible, onClose, title, initialValue, onSubmit }) => {
  const [value, setValue] = useState(initialValue)
  
  return (
    <Overlay isVisible={visible} onBackdropPress={onClose} overlayStyle={styles.modal.root}>
      <>
        <View style={styles.modal.header}>
          <Text style={styles.modal.title}>{title}</Text>
        </View>
        <View style={styles.modal.body}>
          <Hoshi
            borderColor={palette.pink}
            borderHeight={3}
            labelStyle={styles.modal.input.label}
            inputStyle={styles.modal.input.input}
            value={value}
            onChangeText={setValue}
            backgroundColor={palette.white}
          />
        </View>
        <View style={styles.modal.footer}>
          <Button
            title="Cancel"
            onPress={onClose}
            buttonStyle={styles.modal.cancelButton.button}
            titleStyle={styles.modal.cancelButton.title}
          />
          <Button
            title="Save"
            onPress={() => {
              onSubmit(name, value);
              onClose();
            }}
            buttonStyle={styles.modal.saveButton.button}
            containerStyle={styles.modal.saveButton.container}
          />
        </View>
      </>
    </Overlay>
  )
}


export const DetailRow = ({icon, title, name, value, editable=false, onChange= () => {} }) => {
  const [ edition, setEdition ] = useState(false);

  return (
    <View style={styles.row}>
      <ModalEdition 
        name={name}
        title={title} 
        visible={edition} 
        initialValue={value} 
        onClose={() => setEdition(false)}
        onSubmit={onChange}
      />
      {editable ?
        <TouchableOpacity style={styles.touchable} onPress={() => setEdition(true)}>
          <Content {...{ icon, title, value }}/>
          <Icon name="edit" type='feather'/>
        </TouchableOpacity> 
      :
        <Content {...{ icon, title, value }}/>
      }
    </View>
  )
}

const styles = { 
  row: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10, 
    alignItems: "center",
    position: "relative",
  },
  touchable: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    textTransform: "uppercase",
    fontSize: 11
  },
  value: {
    fontSize: 16
  },
  details: {
    marginLeft: 30, 
  },
  modal: {
    root: {
      width: "70%",
      padding: 0,
      overflow: "hidden"
    },
    header: {
      width: "100%",
      paddingTop: 10,
    },
    title: {
      textAlign: "center",
      textTransform: "capitalize",
      color: palette.black,
      fontWeight: "bold",
      fontSize: 18,
    },
    body: {
      paddingVertical: 20,
      paddingHorizontal: 10,
    },
    input: {
      label: {
        fontWeight: "600",
      },
      input: {
        fontWeight: "100",
      }
    },
    footer: {
      flexDirection: "row",
      backgroundColor: palette.gray50,
      padding: 10,
      justifyContent: "flex-end",
    },
    saveButton: {
      button: {
        height: 35,
        borderWidth: 1,
        borderColor: palette.pink,
        backgroundColor: palette.pink,
      },
      container: {
        marginLeft: 10,
      }
    },
    cancelButton: {
      button: {
        height: 35,
        backgroundColor: palette.transparent,
      },
      title: {
        color: palette.pink
      }
    }
  }

}