import React, { useRef, useEffect, useState } from 'react';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import './VideoCard.css';

const VideoCard = (props) => {
  const { 
    url,username,description,song,likes,shares,comments,saves,profilePic,setVideoRef,autoplay} = props;

  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);   // add state for q2

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;          // luôn sync mute với state
      if (autoplay) {
        videoRef.current
          .play()
          .catch((err) => console.log("Autoplay blocked:", err));
      }
    }
  }, [autoplay, isMuted]);

  const onVideoPress = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    videoRef.current.muted = newMuted;
  };

  return (
    <div className="video">
      {/* The video element */}
      <video
        className="player"
        onClick={onVideoPress}
        ref={(ref) => {
          videoRef.current = ref;
          setVideoRef(ref);
        }}
        loop
        muted            //để browser cho autoplay
        playsInline
        src={url}
      />

      <div className="bottom-controls">
        <div className="footer-left">
          <FooterLeft
            username={username}
            description={description}
            song={song}
          />
        </div>

        <div className="footer-right">
          <FooterRight
            likes={likes}
            shares={shares}
            comments={comments}
            saves={saves}
            profilePic={profilePic}
            isMuted={isMuted}                 // truyền xuống
            onToggleMute={handleToggleMute}   // truyền handler
          />
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
