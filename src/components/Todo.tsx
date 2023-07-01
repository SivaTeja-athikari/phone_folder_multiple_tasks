import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';

interface IProps {}
interface IState {
  inputValue: string;
  todoList: Array<any>;
  tempId: string;
}

class Todo extends Component<IProps, IState> {
  state = {
    inputValue: '',
    todoList: [],
    tempId: '',
  };

  handleAddTodo = (): void => {
    const {todoList, inputValue} = this.state;
    if (inputValue.length !== 0) {
      let todo = {
        id: Date.now(),
        inputValue,
      };
      this.setState({todoList: [...todoList, todo], inputValue: ''});
    }
  };
  handleEditTodo = (eachTodo: {id: string; inputValue: string}) => {
    this.setState({tempId: eachTodo.id, inputValue: eachTodo.inputValue});
  };
  handleUpdateTodo = (tempId: string) => {
    console.log(this.state.tempId, tempId, 'ids');
    // const {inputValue} = this.state
    this.state.todoList.map((each: {id: string; inputValue: string}) => {
      if (each.id === tempId) {
        return {
          ...each,
          inputValue: this.state.inputValue,
        };
      } else {
        return {
          ...each,
        };
      }
    });
    this.setState({inputValue: '', tempId: ''});
  };
  handleDeleteTodo = (todoId: string) => {
    const {todoList} = this.state;
    let filteredItems = todoList.filter(
      (eachTodo: {id: string; inputValue: string}) => eachTodo.id !== todoId,
    );
    this.setState({todoList: filteredItems});
  };
  render() {
    console.log(this.state.tempId);
    return (
      <SafeAreaView style={styles.bgContainer}>
        <View style={{flex: 1, width: '100%'}}>
          <View style={styles.sectiontodo}>
            <Text style={styles.todoHeading}>T O D O </Text>
          </View>

          {this.state.todoList.length !== 0 ? (
            <ScrollView style={styles.editDeleteContainer}>
              {this.state.todoList.map(
                (item: {id: string; inputValue: string}) => {
                  return (
                    <React.Fragment key={item.id}>
                      <View style={styles.editSub}>
                        <Text style={styles.itemText}>{item.inputValue}</Text>
                        <View style={styles.editDelete}>
                          <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.handleEditTodo(item)}>
                            <Text>Edit</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.button2}
                            onPress={() => this.handleDeleteTodo(item.id)}>
                            <Text>Delete</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </React.Fragment>
                  );
                },
              )}
              {/* <FlatList
                data={this.state.todoList}
                renderItem={({item}: {item: any}) =>  <React.Fragment key={item.id}>
                <View style={styles.editSub}>
                  <Text  style={styles.itemText}>{item.inputValue}</Text>
                  <View style={styles.editDelete}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleEditTodo(item)}>
                      <Text>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button2}
                      onPress={() => this.handleDeleteTodo(item.id)}>
                      <Text>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </React.Fragment>}
                keyExtractor={item => item.id}
              /> */}
            </ScrollView>
          ) : (
            <ScrollView style={styles.editDeleteContainer}>
              <Text>Please Add Task</Text>
            </ScrollView>
          )}

          <View style={styles.todoContainer}>
            <View style={styles.addtodoContainer}>
              <TextInput
                style={styles.todoInput}
                placeholder="Enter the task here"
                onChangeText={value => this.setState({inputValue: value})}
                value={this.state.inputValue}
              />
              <TouchableOpacity
                style={styles.button1}
                onPress={
                  this.state.tempId !== ''
                    ? () => this.handleUpdateTodo(this.state.tempId)
                    : this.handleAddTodo
                }>
                <Text>{this.state.tempId !== '' ? 'Update' : 'Add'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  bgContainer: {
    display: 'flex',
    flex: 1,
  },
  sectiontodo: {
    backgroundColor: '#9122e6',
    height: '10%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoHeading: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  todoInput: {
    borderColor: '#ffffff',
    borderRadius: 6,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    width: 300,
    padding: 10,
    margin: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#57d47e',
    marginLeft: 8,
    padding: 10,
    width: 70,
    borderRadius: 9,
    color: '#ffffff',
  },
  button1: {
    alignItems: 'center',
    backgroundColor: 'blue',
    marginLeft: 8,
    padding: 10,
    width: 70,
    borderRadius: 9,
    marginBottom: 14,
    color: '#ffffff',
  },
  button2: {
    alignItems: 'center',
    backgroundColor: 'red',
    marginLeft: 8,
    padding: 10,
    width: 70,
    borderRadius: 9,
    color: '#ffffff',
  },
  addtodoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    width: 100,
  },
  todoContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#9122e6',
  },
  editDeleteContainer: {
    marginHorizontal: 20,
  },
  editSub: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderWidth: 2,
    borderColor: '#ffffff',
    padding: 10,
    borderRadius: 9,
    margin: 8,
  },
  editDelete: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default Todo;
