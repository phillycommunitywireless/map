import * as React from "react";
import Map from '../components/Map';
import './index.css';

const IndexPage = () => {
  return (
    <main id="map">
      { typeof window !== 'undefined' && 
        <Map />
      }
    </main>
  )
}

export default IndexPage
