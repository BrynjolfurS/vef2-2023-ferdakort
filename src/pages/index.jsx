import Head from 'next/head'
import Layout from '@components/Layout';
import Section from '@components/Section';
import Container from '@components/Container';
import Map from '@components/Map';
import Button from '@components/Button/Button';
import { Inter } from 'next/font/google'
import styles from '@styles/Home.module.scss'
import { useState, useRef } from 'react';

const DEFAULT_CENTER = [64.81, -18.80]

export default function Home() {
  const mapRef = useRef(null);
  const [state, setState] = useState('settlements');

  return (
    <Layout>
      <Head>
        <title>Next.js Leaflet Starter</title>
        <meta name="description" content="Create mapping apps with Next.js Leaflet Starter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Section>
          <h1 className={styles.title}>
            Ferðakortið
          </h1>
        <Container>
        
          <Map
            className={styles.homeMap} 
            width="1800" height="1080" 
            selection={state} 
            center={DEFAULT_CENTER} 
            zoom={6}
          >
            {({ TileLayer, state, Popup }) => (
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
              </>
            )}
          </Map>

          <p className={styles.view}>
            <Button href="" onClick={() => setState('settlements')}>Settlements</Button>
            <Button href="" onClick={() => setState('attractions')}>Attractions</Button>
          </p>
        </Container>
      </Section>
    </Layout>
  )
}