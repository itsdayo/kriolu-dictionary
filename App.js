/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  StyleSheet,
  Button
} from 'react-native';
import { SearchBar, List, ListItem } from 'react-native-elements';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { words } from './dictionaryJson/dictionary.js';

import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import MOCK_DATA_JSON from './dictionary.json';
import LoadingPage from "./LoadingPage"
const WORDS = MOCK_DATA_JSON;

// const App = () => {
// return (
// <>
//   <StatusBar barStyle="dark-content" />
//   <SafeAreaView>
//     <ScrollView
//       contentInsetAdjustmentBehavior="automatic"
//       style={styles.scrollView}>
//       <Header />
//       {global.HermesInternal == null ? null : (
//         <View style={styles.engine}>
//           <Text style={styles.footer}>Engine: Hermes</Text>
//         </View>
//       )}
//       <View style={styles.body}>
//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>This is an awesome new app</Text>
//           <Text style={styles.sectionDescription}>
//             Edit <Text style={styles.highlight}>App.js</Text> This is where this app information will be
//           </Text>
//         </View>
//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>See Your Changes</Text>
//           <Text style={styles.sectionDescription}>
//             <ReloadInstructions />
//           </Text>
//         </View>
//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>Debug</Text>
//           <Text style={styles.sectionDescription}>
//             <DebugInstructions />
//           </Text>
//         </View>
//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>Learn More</Text>
//           <Text style={styles.sectionDescription}>
//             Read the docs to discover what to do next:
//           </Text>
//         </View>
//         <LearnMoreLinks />
//       </View>
//     </ScrollView>
//   </SafeAreaView>
// </>
// <FlatList
//   data={DATA}
//   renderItem={({ item }) => <Item title={item.title} />}
//   keyExtractor={item => item.id}
// />
// );
// };


// get a list of files and directories in the main bundle


/* read a workbook */

// can we use a different type than ascii
// file
function readFileTest(excelFilePath) {
  console.log("started the function")
  //var XLSX = require('xlsx');

  RNFS.readFile(excelFilePath, 'ascii').then((res) => {
    // can we use a differetn type than binary? 
    console.log(excelFilePath)

    var workbook = XLSX.read(res, { type: 'binary' });
    console.log(workbook)

    // var workbook = XLSX.readFile('test.xlsx');

    var sheet_name_list = workbook.SheetNames;
    console.log('sheets', XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))

    var dictionaryWords = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
    // this.setState({ sheet_name_list: dictionaryWords })
    //  const workbook = XLSX.read(res, { type: 'binary' });
    /* DO SOMETHING WITH workbook HERE */
    // workbook should be xlsx data into json 
    //   if (workbook) {
    //     console.log('my dictionary javascript is', workbook)
    //   }
    // });

    //})
  })
}

// readFileTest();


console.log('dictionaryWords', 'dictionaryWords')

class WelcomeScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      data: WORDS,
      search: '',
      text: '',
      dictionaryData: null,
      loading: false
    }



  }

  componentDidMount() {
    RNFS.readDir(RNFS.MainBundlePath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then((result) => {

        const myFiles = result
        const dictionaryExcelFile = myFiles.filter(file =>
          file.name === "english_to_kriolu.xlsx"

        )
        this.readFileTest(dictionaryExcelFile[0].path);

      })

      .catch((err) => {
        console.log(err.message, err.code);
      });



  }
  makeRemoteRequest = () => {
    const url = `https://randomuser.me/api/?&results=20`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.results,
          error: res.error || null,
          loading: false,
        });


      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  }
  renderHeader = () => {
    const { search } = this.state;
    return (
      <SearchBar
        placeholder="Search for a word..."
        lightTheme
        round
        onChangeText={this.searchFilterFunction}
        autoCorrect={false}
        value={search}
        autoCapitalize={'none'}
      />
    );
  }


  readFileTest = (excelFilePath) => {
    console.log("started the function")
    //var XLSX = require('xlsx');

    RNFS.readFile(excelFilePath, 'ascii').then((res) => {
      // can we use a differetn type than binary? 
      console.log(excelFilePath)

      var workbook = XLSX.read(res, { type: 'binary' });

      // var workbook = XLSX.readFile('test.xlsx');

      var sheet_name_list = workbook.SheetNames;

      var dictionaryWords = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
      this.setState({ initialDictionaryData: dictionaryWords })
      //  const workbook = XLSX.read(res, { type: 'binary' });
      /* DO SOMETHING WITH workbook HERE */
      // workbook should be xlsx data into json 
      //   if (workbook) {
      //     console.log('my dictionary javascript is', workbook)
      //   }
      // });

      //})
    })
  }

  searchFilterFunction = search => {

    // this.setState({ loading: true })
    if (search.length < 1) {
      this.setState({ dictionaryData: null });

    }
    if (search.length > 0) {
      console.log('search', search)
      const newData = this.state.initialDictionaryData.filter(item => {
        const itemData = typeof item.English === 'string' ? item.English.toUpperCase() : '';

        const textData = search.toUpperCase();

        return itemData.indexOf(textData) === 0;
      });

      this.setState({ dictionaryData: newData, search, loading: false });


    } else {
      this.setState({ search })
    }




  }
  updateSearch = search => {
    this.setState({ search: search });
  };
  render() {
    if (this.state.loading) {
      return <LoadingPage renderHeader={this.renderHeader} />
    }
    const { navigate } = this.props.navigation
    return (

      <View style={styles.container}


      >

        {/* <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}> */}
        <FlatList
          // data={this.state.data}
          data={this.state.dictionaryData}
          renderItem={({ item }) => (
            <ListItem
              onPress={() => {
                navigate('Translation', {
                  english: item.English,
                  kriolu: item.Kriolu

                });
                // this.props.push('wordPage', {
                //   itemId: 86,
                //   otherParam: 'anything you want here',
                // });
              }
                // console.log(this.props.navigation)}
              }

              title={
                <View style={styles.listTitle}>
                  <Text style={styles.englishTitle}>{item.English}</Text>
                  <Text style={styles.krioluTitle}>{item.Kriolu}</Text>


                </View>
              }
              subtitle={<Text>{item['Part of Speech']}</Text>}

              // description={item.English}
              containerStyle={{ borderBottomWidth: 0 }}
            />
          )}
          keyExtractor={item => `${item.Kriolu}${item.__rowNum__}`}
          // ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}


        />
        {/* </List> */}
      </View >

    )
  }
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 17
  },

  englishTitle: {
    fontWeight: "bold",
    fontSize: 17,

  },
  krioluTitle: {
    fontWeight: "bold",
    fontSize: 17,
    color: "blue"
  }

});

export default WelcomeScreen;
