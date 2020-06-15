<p align="center">
  <img src="https://github.com/omarryhan/spoxify/raw/master/public/icons/logo/512w/logo3manifest-big.png" alt="Logo" title="Spoxify" height="250" width="250"/>
  <p align="center">
    <a href="https://travis-ci.org/omarryhan/spoxify"><img alt="Build Status" src="https://travis-ci.org/omarryhan/spoxify.svg?branch=master"></a>
    <a href="https://app.netlify.com/sites/spoxify/deploys"><img alt="Build status" src="https://api.netlify.com/api/v1/badges/8c0737ed-4b8a-4bb2-b61c-524085f59961/deploy-status"></a>
    <a href="https://github.com/omarryhan/spoxify"><img alt="Software License" src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"></a>
  </p>
</p>

# Spoxify

The goal of this app is to provide utilities and extra info that aren't included in Spotify's main app.

## Live version (Under construction)

https://spoxify.com/

**Tip:**

For optimal experience, use the website from your phone.

To install it as an app, open your browser's menu and click on "Add to homescreen". Et voila, now it's an app on your phone.

## Features

1. Generate track recommendations based on:
  - Seed tracks
  - Tunable attributes:
    - Acousticness 
    - Danceability 
    - Duration
    - Energy 
    - Instrumentalness 
    - Key 
    - Liveness 
    - Loudness 
    - Mode (i.e. major or minor)
    - Popularity 
    - Speechiness 
    - Tempo 
    - Time_signature 
    - Valence
2. Your top tracks and artists of 1 month, 3 month and a year
3. List your playlists and tracks with more info than Spotify provides e.g. 
  - General musical attributes
    - Playlist/track valence
    - Playlist/track popularity
    - Playlist/track energy
    - Playlist/track danceability
  - And for the musicians out there,
    - Key signature of the track
    - Tempo of the track

## Tools and tech

Spoxify is built using Next.js and it is a [static](https://nextjs.org/docs/advanced-features/static-html-export) website.

More tools being used:
  - Redux
  - Redux toolkit
  - Styled components
  - Material UI (Sparingly)
  - Typescript
  - Testing with Jest, Sinon and React Test Renderer

## Development

After cloning:

Install the dependencies:

```sh
npm install
```

Run development server:

```sh
npm run dev
```

It is also recommended to use VScode and install:

1. Eslint VScode plugin
2. Stylelint VScode plugin

**Note:**

Development requires Node version 12+

## Deployment

To deploy it on your own, you need to get two main keys:

1. Spotify OAuth2 client ID
2. Google Analytics public ID (Optional, just remove mine if you don't want GA)

Then search for `SPOTIFY_CLIENT_ID` and `GA_TRACKING_ID` and replace them.

Then to build the project run:

```
npm run build && npm run export
```

This will generate the disribution files in the /out directory. After that, all you have to do is to serve this directory with a web server.

## Privacy

I do not collect any personal information or any sort of access whatsover. All the action is only on your browser.

I added a Google Analytics plugin to see how users interact with the website, which pages users visit, what features users use etc. The GA plugin doesn't collect any personal information either. I also opted out from sharing the information I collect with Google (Which is kind of a moot point given that the data is already stored on Google's servers). I'd appreciate if you'd stop any tracker-blocker or adblocker (no ads) for this website.


