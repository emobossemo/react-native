import React, {
  Component,
} from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

var BUTTONS = [
  'Option 0',
  'Option 1',
  'Option 2',
  'Delete',
  'Cancel',
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

var AwesomeProject = React.createClass({
  getInitialState() {
    return {
      clicked: 'none',
    };
  },

  render() {
    debugger;
    return (
      <View>
        <Text onPress={this.showActionSheet} style={style.button}>
          Click to show the ActionSheet
        </Text>
        <Text>
          Clicked button: {this.state.clicked}
        </Text>
      </View>
    );
  },

  showActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
    },
    (buttonIndex) => {
      this.setState({ clicked: BUTTONS[buttonIndex] });
    });
  }
});

var ActionSheetTintExample = React.createClass({
  getInitialState() {
    return {
      clicked: 'none',
    };
  },

  render() {
    return (
      <View>
        <Text onPress={this.showActionSheet} style={style.button}>
          Click to show the ActionSheet
        </Text>
        <Text>
          Clicked button: {this.state.clicked}
        </Text>
      </View>
    );
  },

  showActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
      tintColor: 'green',
    },
    (buttonIndex) => {
      this.setState({ clicked: BUTTONS[buttonIndex] });
    });
  }
});

var ShareActionSheetExample = React.createClass({
  getInitialState() {
    return {
      text: ''
    };
  },

  render() {
    return (
      <View>
        <Text onPress={this.showShareActionSheet} style={style.button}>
          Click to show the Share ActionSheet
        </Text>
        <Text>
          {this.state.text}
        </Text>
      </View>
    );
  },

  showShareActionSheet() {
    ActionSheetIOS.showShareActionSheetWithOptions({
      url: this.props.url,
      message: 'message to go with the shared url',
      subject: 'a subject to go in the email heading',
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ]
    },
    (error) => alert(error),
    (success, method) => {
      var text;
      if (success) {
        text = `Shared via ${method}`;
      } else {
        text = 'You didn\'t share';
      }
      this.setState({text});
    });
  }
});

var ShareScreenshotExample = React.createClass({
  getInitialState() {
    return {
      text: ''
    };
  },

  render() {
    return (
      <View>
        <Text onPress={this.showShareActionSheet} style={style.button}>
          Click to show the Share ActionSheet
        </Text>
        <Text>
          {this.state.text}
        </Text>
      </View>
    );
  },

  showShareActionSheet() {
    // Take the snapshot (returns a temp file uri)
    UIManager.takeSnapshot('window').then((uri) => {
      // Share image data
      ActionSheetIOS.showShareActionSheetWithOptions({
        url: uri,
        excludedActivityTypes: [
          'com.apple.UIKit.activity.PostToTwitter'
        ]
      },
      (error) => alert(error),
      (success, method) => {
        var text;
        if (success) {
          text = `Shared via ${method}`;
        } else {
          text = 'You didn\'t share';
        }
        this.setState({text});
      });
    }).catch((error) => alert(error));
  }
});

var style = StyleSheet.create({
  button: {
    marginBottom: 10,
    fontWeight: '500',
  }
});

exports.title = 'ActionSheetIOS';
exports.description = 'Interface to show iOS\' action sheets';
exports.examples = [
  {
    title: 'Show Action Sheet',
    render(): ReactElement { return <ActionSheetExample />; }
  },
  {
    title: 'Show Action Sheet with tinted buttons',
    render(): ReactElement { return <ActionSheetTintExample />; }
  },
  {
    title: 'Show Share Action Sheet',
    render(): ReactElement {
      return <ShareActionSheetExample url="https://code.facebook.com" />;
    }
  },
  {
    title: 'Share Local Image',
    render(): ReactElement {
      return <ShareActionSheetExample url="bunny.png" />;
    }
  },
  {
    title: 'Share Screenshot',
    render(): ReactElement {
      return <ShareScreenshotExample />;
    }
  }
];

AppRegistry.registerComponent('first', () => AwesomeProject);



