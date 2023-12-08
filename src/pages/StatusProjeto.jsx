import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import { faUnlock } from '@fortawesome/free-solid-svg-icons/faUnlock';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { DataTable, List } from 'react-native-paper';

import Body from '../components/Body';
import Container from '../components/Container';
import Header from '../components/Header';

import { useIsFocused } from '@react-navigation/native';

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('decorarqui.db');

const StatusProjeto = () => {


};

export default StatusProjeto;