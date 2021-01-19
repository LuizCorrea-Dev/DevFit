

# Gesture Handler
npm install react-native-gesture-handler@1.4.1

# Reanimated
npm install react-native-reanimated@1.3.0

# Screens
npm install react-native-screens@2.0.0-alpha.3

# Swipe
npm install react-native-swipe-list-view@2.0.3

# React Navigation
npm install react-navigation@4.0.10

# Stack
npm install react-navigation-stack@1.9.4

# Tabs
npm install react-navigation-tabs@2.5.6

# Storage
npm install @react-native-community/async-storage@1.6.2

# Redux
npm install redux@4.0.4

react-redux@7.1.1

redux-persist@6.0.0

# Styled Components
npm install styled-components@4.4.0 --save
npm install @types/styled-components@4.4.0 --save-dev

npm i metro-react-native-babel-preset --save-dev


# Uuid
npm install uuid@3.3.3

# comando
npm install react-native-gesture-handler@1.4.1 react-native-reanimated@1.3.0 react-native-screens@2.0.0-alpha.3 react-native-swipe-list-view@2.0.3 react-navigation@4.0.10 @react-native-community/async-storage@1.6.2 react-navigation-stack@1.9.4 react-navigation-tabs@2.5.6 redux@4.0.4 react-redux@7.1.1 redux-persist@6.0.0 styled-components@4.4.0 uuid@3.3.3 --save

## configuração para android

# build.gradle
- Dentro do arquino da pasta android > app > build.gradle
- Dentro de dependencies { }

implementation 'androidx.appcompat:appcompat:1.1.0-rc01'
implementation 'androidx.swiperefreshlayout:swiperefreshlayout:1.0.0-alpha02'

# MainActivity.java
- Dentro do arquino da pasta android > app > src > main > java > com > devfit > MainActivity.java

# acima
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

# dentro da classe logo abaixo de @Override{}

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
        return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }

## Rodar o projeto
#  react-native run-android

