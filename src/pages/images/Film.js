
import './ImageGrid.css'
import Header from '../../Header'

const imageArray = [
    '/images/film/1.JPG',
    '/images/film/2.JPG',
    '/images/film/3.JPG',
    '/images/film/4.JPG',
    '/images/film/5.JPG',
  ];
  
const ImageGrid = ({ images }) => {
    return (
      <div className="image-grid">
        {images.map((imagePath, index) => (
          <img key={index} src={imagePath} alt={`Image ${index}`} />
        ))}
      </div>
    );
  };

  const Film = () => {
      return (
          <div>
                <Header />
                <h2 >Film</h2>
                <div style={{
                    width: '100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ImageGrid images={imageArray}/>
                </div>
                
          </div>
          
      )
  };

export default Film;
  