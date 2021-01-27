import React from 'react';
import Loader from './Loader';
import { useSelector } from 'react-redux';

export default function LoadingView({ message = 'Just a moment please...' }) {
  const isDarkTheme = useSelector(({ settings }) => settings.isDarkTheme);

  return (
    <div className={isDarkTheme ? 'dark' : 'light'}>
      <div className="loading-screen">
        <div className="loading-view">
          <div className="loading-view-container">
            <div className="mb-3">{message}</div>
            <Loader />
          </div>
        </div>
      </div>
    </div>
  );
}
