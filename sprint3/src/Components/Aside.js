import React, { Component } from 'react';
import VideoCard from './VideoCard';



class Aside extends Component{
      
    render(){
      
      let vidCards = this.props.videos
      .filter((card) => {
        if(card.id !== this.props.match.params.id){
        return card;
        }else{
          return null;
        }
      })
      .map((card) => {
          return <VideoCard
          key = {card.id}
          id = {card.id}
          img = {card.image} 
          timeCode = {card.duration}
          title = {card.title}
          publisher = {card.channel}
          views = {card.views}
          ></VideoCard>
      });   
        return(
          <aside>
            <div className='video__cards'>
              <div className='cards__title'>Up Next</div>
              { vidCards }
            </div>
          </aside>
        )
    }
  }

  export default Aside;