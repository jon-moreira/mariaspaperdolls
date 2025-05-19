import React, { useEffect, useState, useRef, useCallback } from "react";

import usePageTracking from "./PageTracking";
import Spinner from "./Spinner";
import Header from "./Header";
import Footer from "./Footer";

//https://stackoverflow.com/questions/52349145/react-loading-screen-on-all-routes
const WrappedComponent = (WrappedComponent) => {
  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const Wrapper = (props) => {
    usePageTracking();
    const { location } = props;
    const prevLocation = usePrevious({ location });

    let timeout = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    const clearTimer = useCallback(() => {
      clearTimeout(timeout.current);
    }, [timeout]);

    const timer = useCallback(() => {
      clearTimer();
      setIsLoading(false);
    }, [clearTimer]);

    const setTimer = useCallback(() => {
      timeout.current = setTimeout(timer, 600);
    }, [timeout, timer]);

    useEffect(() => {
      setTimer();
    }, [setTimer]);

    useEffect(() => {
      if (prevLocation) {
        if (location !== prevLocation.location) {
          clearTimer();
          setIsLoading(true);
          setTimer();
        }
      }
    }, [location, prevLocation, setTimer, clearTimer]);

    return (
      <React.Fragment>
        <Header />
        {isLoading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <WrappedComponent {...props} />
            <Footer />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  };

  return Wrapper;
};

export default WrappedComponent;
