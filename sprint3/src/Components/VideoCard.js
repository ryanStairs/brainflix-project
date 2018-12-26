import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class VideoCard extends Component{

    render(){

      return(
        <div className='video__card'>
          <div className='video__card--left'>
          <Link to={"/main/"+this.props.id}><img src={this.props.img} alt={this.props.title} id={this.props.id}/></Link>
            <p>{this.props.timeCode}</p>
          </div>
          <div className='video__card--right'>
            <Link to={"/main/"+this.props.id} style={{ textDecoration: 'none', color: 'black' }}><span className='video__card--title'>{this.props.title}</span></Link>
            <p className='video__card--publisher'>{this.props.publisher}</p>
            <p className='video__card--views'>{this.props.views} views</p>
          </div>
        </div>
      )
    }
}

  export default VideoCard;