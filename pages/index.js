// pages/index.js
import { useEffect, useState } from "react";
import Slider from "react-slick";

export default function Home() {
  const [posts, setPosts] = useState([]); 

  useEffect(() => {
    fetch("/api/posts")
      .then(r => r.json())
      .then(data => setPosts(data.posts))
      .catch(console.error);
  }, []);

  const settings = {
    arrows: false, dots: true,
    infinite: false, slidesToShow:1, slidesToScroll:1
  };

  return (
    <>
      <h1 style={{textAlign:"center"}}>IG Feed Preview</h1>
      <div className="feed">
        {posts.map(({id,images}) => (
          <div className="cell" key={id}>
            {images.length < 2 ? (
              images[0] && <img src={images[0]} alt="" />
            ) : (
              <Slider {...settings}>
                {images.map((src,i)=>(
                  <div key={i}>
                    <img src={src} alt="" />
                  </div>
                ))}
              </Slider>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
