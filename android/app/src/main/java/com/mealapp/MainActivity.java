package com.mealapp;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "MealApp";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. There the RootView is created and
   * you can specify the renderer you wish to use - the new renderer (Fabric) or the old renderer
   * (Paper).
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new MainActivityDelegate(this, getMainComponentName());
  }

  public static class MainActivityDelegate extends ReactActivityDelegate {
    public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
      super(activity, mainComponentName);
    }

    @Override
    protected ReactRootView createRootView() {
      ReactRootView reactRootView = new ReactRootView(getContext());
      // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
      return reactRootView;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(null);
    } 

    @Override
public void onResume() {
    super.onResume();
    ReactContext reactContext = getReactInstanceManager().getCurrentReactContext();
    WritableMap params = Arguments.createMap();
    params.putString("event", "active");

    // when app starts reactContext will be null initially until bridge between Native and React Native is established
    if(reactContext != null) {
        getReactInstanceManager().getCurrentReactContext()
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit("ActivityStateChange", params);
    }
}

@Override
public void onPause() {
    super.onPause();
    ReactContext reactContext = getReactInstanceManager().getCurrentReactContext();
    WritableMap params = Arguments.createMap();
    params.putString("event", "inactive");

    if(reactContext != null) {
        getReactInstanceManager().getCurrentReactContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("ActivityStateChange", params);
    }
}

@Override
public void onStop() {
    super.onStop();
    ReactContext reactContext = getReactInstanceManager().getCurrentReactContext();
    WritableMap params = Arguments.createMap();
    params.putString("event", "background");

    if(reactContext != null) {
        getReactInstanceManager().getCurrentReactContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("ActivityStateChange", params);
    }
}

    @Override
    protected boolean isConcurrentRootEnabled() {
      // If you opted-in for the New Architecture, we enable Concurrent Root (i.e. React 18).
      // More on this on https://reactjs.org/blog/2022/03/29/react-v18.html
      return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    }
  }
}
