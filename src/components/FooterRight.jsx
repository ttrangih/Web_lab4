import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCirclePlus,
  faCircleCheck,
  faHeart,
  faCommentDots,
  faBookmark,
  faShare,
  faVolumeMute, //thêm mute
  faVolumeHigh, //thêm unmute
  faXmark,           //thêm icon đóng
} from '@fortawesome/free-solid-svg-icons';
import './FooterRight.css';

function FooterRight({
  likes,
  comments,
  saves,
  shares,
  profilePic,
  isMuted,
  onToggleMute,
  url,               // dùng cho câu 4 (copy URL)
}) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [userAddIcon, setUserAddIcon] = useState(faCirclePlus);
  const [showSharePopup, setShowSharePopup] = useState(false);  // question6

  const handleUserAddClick = () => {
    setUserAddIcon(faCircleCheck);
    setTimeout(() => {
      setUserAddIcon(null);
    }, 3000);
  };

  // convert like count to a number
  const parseLikesCount = (count) => {
    if (typeof count === 'string') {
      if (count.endsWith('K')) {
        return parseFloat(count) * 1000;
      }
      return parseInt(count);
    }
    return count;
  };

  // format like count
  const formatLikesCount = (count) => {
    if (count >= 10000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count;
  };

  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  //save -> copy URL vào clipboard
  const handleSaveClick = async () => {
    const newSaved = !saved;
    setSaved(newSaved);

    if (navigator.clipboard && url) {
      try {
        await navigator.clipboard.writeText(url);
        console.log('Copied to clipboard:', url);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  //Share popup
  const handleShareClick = () => {
    setShowSharePopup(true);
  };

  const handleCloseShare = () => {
    setShowSharePopup(false);
  };

  return (
    <div className='footer-right'>
      <div className='sidebar-icon'>
        {profilePic ? (
          <img
            src={profilePic}
            className='userprofile'
            alt='Profile'
            style={{ width: '45px', height: '45px', color: '#616161' }}
          />
        ) : null}
        {/* user add icon */}
        {userAddIcon && (
          <FontAwesomeIcon
            icon={userAddIcon}
            className='useradd'
            style={{ width: '15px', height: '15px', color: '#FF0000' }}
            onClick={handleUserAddClick}
          />
        )}
      </div>

      <div className='sidebar-icon'>
        {/* heart icon */}
        <FontAwesomeIcon
          icon={faHeart}
          style={{ width: '35px', height: '35px', color: liked ? '#FF0000' : 'white' }}
          onClick={handleLikeClick}
        />
        {/* displaying the formatted like count */}
        <p>{formatLikesCount(parseLikesCount(likes) + (liked ? 1 : 0))}</p>
      </div>

      <div className='sidebar-icon'>
        {/* comment icon */}
        <FontAwesomeIcon
          icon={faCommentDots}
          style={{ width: '35px', height: '35px', color: 'white' }}
        />
        {/* display number of comments */}
        <p>{comments}</p>
      </div>

      <div className="sidebar-icon">
        {saved ? (
          // Displaying the bookmark icon when saved
          <FontAwesomeIcon
            icon={faBookmark}
            style={{ width: '35px', height: '35px', color: '#ffc107' }}
            onClick={handleSaveClick}
          />
        ) : (
          // Displaying the bookmark icon when not saved
          <FontAwesomeIcon
            icon={faBookmark}
            style={{ width: '35px', height: '35px', color: 'white' }}
            onClick={handleSaveClick}
          />
        )}
        {/* Displaying the number of saves */}
        <p>{saved ? saves + 1 : saves}</p>
      </div>

      <div className="sidebar-icon" onClick={handleShareClick}>
        {/* The share icon */}
        <FontAwesomeIcon
          icon={faShare}
          style={{ width: '35px', height: '35px', color: 'white' }}
        />
        {/* Displaying the number of shares */}
        <p>{shares}</p>
      </div>

      {/* Mute / Unmute icon */}
      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={isMuted ? faVolumeMute : faVolumeHigh}
          style={{ width: '35px', height: '35px', color: 'white' }}
          onClick={onToggleMute}
        />
        <p>{isMuted ? 'Mute' : 'Sound'}</p>
      </div>

      <div className="sidebar-icon record">
        {/* Displaying the record icon */}
        <img
          src="https://static.thenounproject.com/png/934821-200.png"
          alt="Record Icon"
        />
      </div>

      {/*Popup share*/}
      {showSharePopup && (
        <div className="share-popup">
          <div className="share-popup__content">
            <div className="share-popup__header">
              <span>Share to</span>
              <button className="share-popup__close" onClick={handleCloseShare}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <div className="share-popup__options">
              <button>Facebook</button>
              <button>Instagram</button>
              <button>Threads</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FooterRight;
