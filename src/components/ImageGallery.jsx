import React, { useState } from "react";

var apiKey = `636e1481b4f3c446d26b8eb6ebfe7127`;

const ImageGallery = () => {

  const [search, setSearch] = useState(""); 
  const [print, setPrint] = useState([]); 

  function searchInput(e){
     setSearch(e.target.value); 
  }

  function submitData(e){
      e.preventDefault(); 
      console.log(search); 

      let URL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${search}&per_page=24&format=json&nojsoncallback=1`; 

      const getData = async (apiURL) => {
          let res = await fetch(apiURL);
          let data = await res.json(); 
          console.log(data); 
          setPrint(data.photos.photo); 
      }
       getData(URL); 
  }

  return(
    <div className="galleryApp">
         <center>
            <h2> Image Gallery </h2>
            <form onSubmit={submitData}>
                <p> <input type="text" placeholder="Search image" onChange={searchInput} /> </p>
                <p> <button type="submit"> Submit </button> </p>
            </form>
          </center>

            <div className="grid-container">
                {
                  print.length>=1?<Movie print={print}></Movie>: <h4>There is no data</h4>
                }
            </div>
    </div>
  )
}
export default ImageGallery;




const Movie = ({print}) => {
  return(
    <>
         {
          print.map(function(value, ind){
              return(
                   <section key={ind}>
                       <img src={`https://farm${value.farm}.staticflickr.com/${value.server}/${value.id}_${value.secret}_m.jpg`} alt="No Image" />
                   </section>
              )                     
          })
         }
    </>
  )
}