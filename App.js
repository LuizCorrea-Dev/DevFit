import React from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from './src/store';

// Stack Principal
import MainStack from './src/navigators/MainStack';

export default () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <MainStack ref={stack => global.mainstack=stack} />
    </PersistGate>
  </Provider>
)