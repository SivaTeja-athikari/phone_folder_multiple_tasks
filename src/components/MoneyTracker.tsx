import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Modal,
  Alert,
  Pressable,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import React, {Component} from 'react';

interface IProps {}
interface IState {
  modalVisible: boolean;
  modalVisible1: boolean;
  creditAmount: string;
  creditReason: string;
  withdrawAmount: string;
  withdrawReason: string;
  fixedAmount: number;
  creditAmountList: {
    id: number;
    creditAmount: string;
    creditReason: string;
    iscredited: boolean;
  }[];
  withdrawAmountList: {
    id: number;
    creditAmount: string;
    creditReason: string;
    iscredited: boolean;
  }[];
}

class MoneyTracker extends Component<IProps, IState> {
  state = {
    creditAmount: '',
    modalVisible: false,
    modalVisible1: false,
    creditReason: '',
    withdrawAmount: '',
    withdrawReason: '',
    fixedAmount: 0,
    creditAmountList: [],
    withdrawAmountList: [],
  };

  handleCredit = () => {
    if (
      this.state.fixedAmount >= 0 &&
      this.state.creditAmount.length !== 0 &&
      parseInt(this.state.creditAmount) > 0
    ) {
      this.setState({
        fixedAmount: this.state.fixedAmount + parseInt(this.state.creditAmount),
        modalVisible: !this.state.modalVisible,
        creditAmount: '',
      });
    }
    let creditData = {
      id: Date.now(),
      creditAmount: `${this.state.creditAmount} credited`,
      creditReason:
        this.state.creditReason !== '' ? this.state.creditReason : 'N/A',
      iscredited: true,
    };
    if (
      this.state.creditAmount.length !== 0 &&
      parseInt(this.state.creditAmount) > 0
    ) {
      this.setState({
        creditAmountList: [...this.state.creditAmountList, creditData],
      });
    }
  };
  handleDebit = () => {
    if (
      this.state.fixedAmount >= parseInt(this.state.withdrawAmount) &&
      parseInt(this.state.withdrawAmount) > 0
    ) {
      this.setState({
        fixedAmount:
          this.state.fixedAmount - parseInt(this.state.withdrawAmount),
        modalVisible1: !this.state.modalVisible1,
        withdrawAmount: '',
      });
    } else if (this.state.fixedAmount < parseInt(this.state.withdrawAmount)) {
      Alert.alert(
        'Insufficient funds',
        `Your account balance is ${this.state.fixedAmount}`,
      );
    }
    let withdrawData = {
      id: Date.now(),
      creditAmount: `${this.state.withdrawAmount} debited`,
      creditReason:
        this.state.withdrawReason !== '' ? this.state.withdrawReason : 'N/A',
      iscredited: false,
    };
    if (
      this.state.withdrawAmount.length !== 0 &&
      this.state.fixedAmount >= parseInt(this.state.withdrawAmount) &&
      parseInt(this.state.withdrawAmount)
    ) {
      this.setState({
        withdrawAmountList: [...this.state.withdrawAmountList, withdrawData],
      });
    }
  };
  render() {
    const {modalVisible, modalVisible1} = this.state;
    console.log(this.state.withdrawAmount);

    return (
      <SafeAreaView style={styles.bgMainContainer}>
        <View style={styles.subContainer}>
          <View>
            <Text style={styles.expenseText}> Expense Tracker</Text>
            <View style={styles.walletContainer}>
              <Text style={styles.balance}>Your Balance</Text>
              <Text style={styles.walletAmount}>
                {' '}
                ${this.state.fixedAmount}.00
              </Text>
            </View>
          </View>
          <View style={styles.historyContainer}>
            <Text style={styles.historyText}>History</Text>
            {this.state.creditAmountList.length !== 0 ? (
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={this.state.creditAmountList.concat(
                  this.state.withdrawAmountList,
                )}
                renderItem={({
                  item,
                }: {
                  item: {
                    id: string;
                    iscredited: boolean;
                    creditAmount: string;
                    creditReason: string;
                  };
                }) => {
                  return (
                    <View
                      style={[
                        styles.expenseCard,
                        item?.iscredited
                          ? {borderColor: 'green'}
                          : {borderColor: 'red'},
                      ]}>
                      <Text
                        style={[
                          styles.credited,
                          item?.iscredited ? {color: 'green'} : {color: 'red'},
                        ]}>
                        {item?.creditAmount}
                      </Text>
                      <Text
                        style={[
                          styles.creditedReason,
                          item?.iscredited ? {color: 'green'} : {color: 'red'},
                        ]}>
                        {item?.creditReason}
                      </Text>
                    </View>
                  );
                }}
              />
            ) : (
              <Text style={styles.transactionHistory}>
                {' '}
                No Transactions found
              </Text>
            )}
          </View>

          <View style={styles.transactionContainer}>
            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  this.setState({modalVisible: !modalVisible});
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>Credit Amount</Text>
                    <TextInput
                      style={styles.input}
                      inputMode="numeric"
                      onChangeText={value =>
                        this.setState({creditAmount: value})
                      }
                      placeholder="Enter the amount"
                      placeholderTextColor={'black'}
                    />
                    {this.state.creditAmount.length === 0 ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                        }}>
                        <Text
                          style={{
                            color: 'red',
                            textAlign: 'right',
                            padding: 0,
                            marginLeft: 7,
                          }}>
                          *required
                        </Text>
                      </View>
                    ) : null}
                    <TextInput
                      style={styles.input}
                      onChangeText={value =>
                        this.setState({creditReason: value})
                      }
                      placeholder="Reason to deposit"
                      placeholderTextColor={'black'}
                    />
                    <TouchableHighlight>
                      <View style={styles.button}>
                        <Text
                          style={styles.textStyle}
                          onPress={this.handleCredit}>
                          Click On Credit
                        </Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => this.setState({modalVisible: true})}>
                <Text style={styles.textStyle}>Credit</Text>
              </Pressable>
            </View>
            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible1}
                onRequestClose={() => {
                  this.setState({modalVisible1: !modalVisible1});
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>Debit Amount</Text>
                    <TextInput
                      style={styles.input}
                      inputMode="numeric"
                      onChangeText={value =>
                        this.setState({withdrawAmount: value})
                      }
                      placeholder="Enter the amount"
                      placeholderTextColor={'black'}
                    />
                    {this.state.withdrawAmount.length === 0 ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                        }}>
                        <Text
                          style={{
                            color: 'red',
                            textAlign: 'right',
                            padding: 0,
                            marginLeft: 7,
                          }}>
                          *required
                        </Text>
                        {/* {parseInt(this.state.withdrawAmount) < 0 ?  <Text style={{color: 'red'}}>invalid amount</Text> : <Text>*requires</Text>} */}
                      </View>
                    ) : null}

                    <TextInput
                      style={styles.input}
                      onChangeText={value =>
                        this.setState({withdrawReason: value})
                      }
                      placeholder="Reason to Withdraw"
                      placeholderTextColor={'black'}
                    />
                    <TouchableHighlight>
                      <View style={styles.button1}>
                        <Text
                          style={styles.textStyle}
                          onPress={this.handleDebit}>
                          Click on Debit
                        </Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>
              <TouchableHighlight
                activeOpacity={0.1}
                disabled={this.state.fixedAmount === 0 ? true : false}
                style={[styles.button1, styles.buttonOpen1]}
                onPress={() => this.setState({modalVisible1: true})}>
                <Text style={styles.textStyle}>Debit</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  bgMainContainer: {
    flex: 1,
    backgroundColor: '#C3B1DB',
  },
  subContainer: {
    height: '95%',
    margin: 20,
    borderRadius: 9,
    backgroundColor: '#ffffff',
    elevation: 20,
    shadowColor: '#52006A',
  },
  expenseText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '800',
    margin: 10,
  },
  balance: {
    color: 'black',
    fontSize: 18,
  },
  historyContainer: {
    height: '70%',
  },
  walletAmount: {
    color: 'black',
    fontSize: 28,
  },
  walletContainer: {
    marginLeft: 16,
  },
  expenseCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    marginTop: 15,
  },
  historyText: {
    borderBottomWidth: 2,
    color: 'black',
    borderBottomColor: '#C3B1DB',
    fontSize: 22,
    fontWeight: '700',
    margin: 16,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#57eb83',
    padding: 10,
    width: 100,
    borderRadius: 8,
  },
  button1: {
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    width: 100,
    borderRadius: 8,
  },
  transactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 3,
    borderRadius: 12,
    margin: 13,
    padding: 13,
    backgroundColor: 'black',
  },
  centeredView: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#ffffff',
    margin: 50,
    padding: 40,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  button3: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#57eb83',
    width: 100,
  },
  buttonClose: {
    backgroundColor: '#57eb83F',
    width: 100,
  },
  buttonOpen1: {
    backgroundColor: 'red',
    width: 100,
  },
  buttonClose1: {
    backgroundColor: 'red',
    width: 100,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    width: '100%',
    borderWidth: 1,
    padding: 10,
    borderColor: 'black',
    color: 'black',
  },
  credited: {
    fontSize: 18,
    width: 100,
  },
  creditedReason: {
    fontSize: 18,
    width: 100,
  },
  transactionHistory: {
    fontSize: 20,
    color: 'red',
    margin: 10,
  },
});

export default MoneyTracker;
