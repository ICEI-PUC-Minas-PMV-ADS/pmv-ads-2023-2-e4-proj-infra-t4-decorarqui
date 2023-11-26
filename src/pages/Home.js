import React from 'react';

import { BottomNavigation } from 'react-native-paper';

import Projeto from './Projetos';
import Avaliacao from './Avaliacao';
import StatusProjeto from './StatusProjeto';

const Home = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'projetos', title: 'Projetos', icon: 'map-search' },
    { key: 'avaliacao', title: 'Avaliacao', icon: 'clipboard-list-outline' },
    { key: 'status', title: 'Status', icon: 'timer-sand' }

  ]);

  const renderScene = BottomNavigation.SceneMap({
    projetos: Projeto,
    avaliacao: Avaliacao,
    status: StatusProjeto
  });

  return (
    <BottomNavigation
      screenOptions={{ activeColor: '#ffffff' }}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ backgroundColor: '#D9D9D9' }}
    />
  );
};

export default Home;