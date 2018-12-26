import React from 'react';
import { withRouter } from 'react-router-dom';

// const apiKey = '?api_key=daea6550-3366-4ad6-a4b1-38cd719383a5';
const baseUrl = "http://localhost:8080/videos/";

// const baseUrl = 'https://project-2-api.herokuapp.com/';


class Comment extends React.Component{

    commentDateFormatter = (date) => {

        let timestampMinutes = (new Date().valueOf() - date) / 60000;
        let howLongAgo = 0;
        let units = '';
    
        if (timestampMinutes < 60) {
            howLongAgo = Math.round(timestampMinutes);
            if (howLongAgo === 1) {
                units = 'minute';
            } else {
                units = 'minutes';
            }
        } else if (timestampMinutes > 59 && timestampMinutes < 1440) {
            howLongAgo = Math.round(timestampMinutes / 60);
            if (howLongAgo === 1) {
                units = 'hour';
            } else {
                units = 'hours';
            }
        } else if (timestampMinutes > 1439 && timestampMinutes < 43200) {
            howLongAgo = Math.floor(timestampMinutes / 60 / 24);
            if (howLongAgo === 1) {
                units = 'day';
            } else {
                units = 'days';
            }
        } else {
            howLongAgo = Math.floor(timestampMinutes / 60 / 24 / 30);
            if (howLongAgo === 1) {
                units = 'month';
            } else {
                units = 'months';
            }
        }
        return howLongAgo + " " + units + " ago";
    }

    deleteComment = () => {

        fetch(baseUrl + this.props.match.params.id + '/comments/' + this.props.id, {
            method: 'DELETE'
        })
            .then(() => {
                this.props.getNewVideo();
            }).catch((err) => {
                console.error("Caught error: ", err);
            });
    }
  

    render(){

        return(
            <div className='video__comment'>
                <div className='video__comment--left'>
                    <img id='commentUsrImg' src='../assets/Images/john_gibbons.jpg' alt='User Avatar'/>
                </div>
                <div className='video__comment--right'>
                    <span className='comment__name'>{this.props.name}</span>
                    <span className='comment__time'>{this.commentDateFormatter(this.props.timestamp)}</span>
                    <p className='comment__comment'>{this.props.comment}</p>
                    <div className='comment__delete-icon' id={this.props.id} onClick={this.deleteComment}></div>
                </div>
            </div>
        )
    }
}

export default withRouter(Comment);

