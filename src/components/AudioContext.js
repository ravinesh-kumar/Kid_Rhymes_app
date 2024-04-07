// import React, { createContext, useContext, useState } from 'react';
// import HeaderRight from './HeaderRight';

// const AudioContext = createContext();

// export const useAudioContext = () => useContext(AudioContext);

// export const AudioProvider = ({ children }) => {
//   const [isMuted, setIsMuted] = useState(false);

//   const toggleMute = () => {
//     setIsMuted(prevState => !prevState);
//     playBgAudio()
//     sound.setCategory('Playback');
//     sound.setNumberOfLoops(-1);
//     sound.setVolume(0.1);
//     if (muted == 'y') {
//       sound.stop();
//       setMuted('n');
//       setMusicIcon("music-off");
//     }
//     if (muted == 'n') {
//       sound.play();
//       setMuted('y');
//       setMusicIcon("music");
//     }
//   };
//   function playBgAudio() {
//     if (isMuted === "yes") {
//       setIsMuted("no");
//       sound.pause();
//     } else {
//       setIsMuted("yes");
//       sound.play();
//     }
//   }

//   useEffect(() => {
//     playBgAudio();
//   }, [])
//   useEffect(() => {
//     toggleMute();
//   }, []);

//   return (
//     <AudioContext.Provider value={{ isMuted, toggleMute }}>
//      {HeaderRight}
//     </AudioContext.Provider>
//   );
// };





// //   const toggleMute = () => {
  
// //   }



import React, { createContext, useContext, useState } from 'react';

const AudioContext = createContext();

export const useAudioContext = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState("no");

  const toggleMute = () => {
    setIsMuted(prevState => !prevState);
        setIsMuted(prevState => !prevState);
    playBgAudio()
    sound.setCategory('Playback');
    sound.setNumberOfLoops(-1);
    sound.setVolume(0.1);
    if (muted == 'y') {
      sound.stop();
      setMuted('n');
      setMusicIcon("music-off");
    }
    if (muted == 'n') {
      sound.play();
      setMuted('y');
      setMusicIcon("music");
    }
  };

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute }}>
      {children}
    </AudioContext.Provider>
  );
};
