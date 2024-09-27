import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MemeGenerator = () => {
  const [memes, setMemes] = useState([]);
  const [memeImage, setMemeImage] = useState('');
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');

  useEffect(() => {
    axios.get('https://api.imgflip.com/get_memes')
      .then(response => {
        setMemes(response.data.data.memes);
      })
      .catch(error => console.error("Error fetching memes:", error));
  }, []);

  const handleGenerateMeme = () => {
    const randomMeme = memes[Math.floor(Math.random() * memes.length)];
    setMemeImage(randomMeme.url);
  };

  const handleTopTextChange = (event) => {
    setTopText(event.target.value);
  };

  const handleBottomTextChange = (event) => {
    setBottomText(event.target.value);
  };

  const handleDownloadMeme = () => {
    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = memeImage;
    link.click();
  };

  const handleShareMeme = () => {
    const shareText = `Check out this meme I made! ${memeImage}`;
    navigator.clipboard.writeText(shareText);
    alert('Meme link copied to clipboard!');
  };


  return (
    <div>
      <h1>Meme Generator</h1>
      <button onClick={handleGenerateMeme}>Generate Meme</button>
      
      <input type="text" value={topText} onChange={handleTopTextChange} placeholder="Top text" />
      <input type="text" value={bottomText} onChange={handleBottomTextChange} placeholder="Bottom text" />
      {memeImage && (
        <div>
          <img src={memeImage} alt="Meme image" />
          <h2>{topText}</h2>
          <h2>{bottomText}</h2>
        </div>
      )}
      <button onClick={handleDownloadMeme}>Download Meme</button>
      <button onClick={handleShareMeme}>Share Meme</button>
    </div>
  );
};

export default MemeGenerator;
