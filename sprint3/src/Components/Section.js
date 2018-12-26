import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Comment from './Comment';

const apiKey = '?api_key=daea6550-3366-4ad6-a4b1-38cd719383a5';
const baseUrl = "http://localhost:8080/videos/";


class Section extends Component{

  state = {
    showMore: false,
    vid: '',
    commentTxt: ''
  }

  getNewVideo = () => {

    fetch(baseUrl + this.props.match.params.id)
    .then((response) => {
        return response.json(); 
    }).then((currentVideoData) => {
      currentVideoData.comments.reverse();
      this.setState({vid: currentVideoData});
      document.getElementById('comment-btn').disabled = true;
    }).catch((err) => {
        console.error("Caught error: ", err);
    });

  }  

  changeComment = (e) => {
    let newCommentTxt = e.target.value;
    let newCommentTxtArr = newCommentTxt.split(" ");
    if(newCommentTxtArr.length >= 2){
      document.getElementById('comment-btn').disabled = false;
    }else{
      document.getElementById('comment-btn').disabled = true;
    }

    this.setState({
      commentTxt: newCommentTxt
    });

  }

  postComment = () => {

    let commentValue = this.state.commentTxt;

    let newCommentObj = {
        name: 'GUEST',
        comment: commentValue
    }

    const init = {
      body: JSON.stringify(newCommentObj),
      method: 'POST',
      headers: {
          'content-type': 'application/json'
      }
    }

    fetch(baseUrl + this.state.vid.id + '/comments/', init)
      .then(() => {
          this.getNewVideo();
      }).catch((err) => {
          console.error("Caught error: ", err);
      });

      this.setState({
        commentTxt: ''
      })
  }

  addThumbsUp = () => {
    fetch(baseUrl + this.state.vid.id + "/like/", {
        method: 'PUT'
    }).then((response) => {
        return response.json();
    }).then((data) => {
      this.getNewVideo();
    }).catch((err) => {
        console.error("Caught error: ", err);
    });
  }

  addThumbsDown = () => {
    fetch(baseUrl + this.state.vid.id + "/dislike/", {
        method: 'PUT'
    }).then((response) => {
        return response.json();
    }).then((data) => {
      this.getNewVideo();
    }).catch((err) => {
        console.error("Caught error: ", err);
    });
  }

  cancelClick = () => {
    this.setState({
      commentTxt: ''
    })
  }

  componentDidMount = () => {
    this.getNewVideo();
  }

  componentDidUpdate = () => {
    if(this.props.match.params.id !== this.state.vid.id){
      this.getNewVideo();
      if(this.state.showMore){
        this.showMoreFalse();
      }
    }
  }

  showMoreTrue = () => {
    this.setState({showMore : true})
  }

  showMoreFalse = () => {
    this.setState({showMore : false})
  }

  renderShowMore = () => {
    return (
      <div>
        <div className='publish__description--more'>10/14/15:  { this.state.vid.description }</div>
        <div className='publish__show-less'><span onClick={ this.showMoreFalse } >SHOW LESS</span></div>
      </div>
    )
  }

  renderShowLess = () => {
    return (
      <div>
        <div className='publish__description--less'>10/14/15:  { this.state.vid.description }</div>
        <div className='publish__show-more'><span onClick={ this.showMoreTrue } >SHOW MORE</span></div>
      </div>
    )
  }

  // just to add some functionality to share for now
  // copies url to clipboard and sends up alert 
  share = () => {
    var textAreaToCopy = document.createElement("textarea");
    document.body.appendChild(textAreaToCopy);
    textAreaToCopy.value = 'http://localhost:3000' + this.props.match.url;
    textAreaToCopy.select();
    document.execCommand("copy");
    document.body.removeChild(textAreaToCopy);
    alert('URL has been copied to the clipboard')
  }

  subscribe = () => {
    alert('Subscribed');
  }

  //fires from video onEnded event - when video plays to the end 1 is added to that video's views
  addView = () => {
    fetch(baseUrl + this.state.vid.id + "/addview/", {
        method: 'PUT'
    }).then((response) => {
        return response.json();
    }).then((data) => {
      this.getNewVideo();
    }).catch((err) => {
        console.error("Caught error: ", err);
    });
  };
  
    render(){
      if(this.state.vid){
        let comments = this.state.vid.comments
        .map((comment) => {
          return <Comment
          key = {comment.id}
          id = {comment.id}
          name = {comment.name}
          comment = {comment.comment}
          timestamp = {comment.timestamp}
          getNewVideo = {this.getNewVideo}
          match = {this.props.match}
          ></Comment>
      });  
        let showItHere = '';
        if(!this.state.showMore){
          showItHere = this.renderShowLess();
        }else{
          showItHere = this.renderShowMore();
        }
      return(
        <section>
          <div className='video'>
            <video controls
            onEnded={this.addView}
            src={this.state.vid.video + apiKey}
            poster={this.state.vid.image}
            width="100%">
            </video>
          </div>
          <div className = 'video__info'>
            <h2>{this.state.vid.title}</h2>
          </div>
          <div className = 'video__info--views-likes'>
            <div className='video__info--views'>
              {this.state.vid.views} views
            </div>
            <div className='video__info--likes'>
              <img src='../assets/Icons/Thumbs Up.svg' alt='Like' onClick={this.addThumbsUp} /><span className='likeNum'>{ this.state.vid.thumbsUp }</span>
              <img src='../assets/Icons/Thumbs Down.svg' alt='Dislike' onClick={this.addThumbsDown} /><span className='likeNum'>{ this.state.vid.thumbsDown }</span>
              <img src='../assets/Icons/Share.svg' alt='Share' onClick={this.share}/><span onClick={this.share}>SHARE</span>
            </div>
          </div>
          <div className = 'video__publish'>
            <div className='video__publish--left'>
              <div className='circle'>
                {/* grey circle */}
              </div>
            </div>
            <div className='video__publish--right'>
              <div className='publish__right--top'>
                <div className='publish__right--top--left'> 
                  <span className='publish__publisher'>{this.state.vid.channel}</span>
                  <span className='publish__publish-date'>Published on Oct 14, 2015</span>
                </div>
                <div className='publish__right--top--right'> 
                  <div className='subscribe'>
                    <span className='subscribe__subscribe' onClick={this.subscribe}>SUBSCRIBE</span>
                    <span className='subscribe__noSubscribers'>{this.state.vid.subscriberCount}</span>
                  </div>
                </div>
              </div>
              {/* conditional render below (show more/less)*/}
              { showItHere }
            </div>
          </div>
          <div className='video__comment'>
                <div className='video__comment--left'>
                  <img id='commentUsrImg' src='../assets/Images/john_gibbons.jpg' alt='User Avatar'/>
                </div>
                <div className='video__comment--right'>
                  <input type='text' name='commentTxt' value={this.state.commentTxt} onChange={this.changeComment} placeholder='Add a public comment' />
                  <div className='comment__buttons'>
                    <button id='cancel-btn' onClick={this.cancelClick}>CANCEL</button>
                    <button id='comment-btn' onClick={this.postComment}>COMMENT</button>
                  </div>
                </div>
          </div>
          {/* comment components rendered below */}
          { comments }
        </section>
      )
      }else{
        return <div>L O A D I N G ......</div>
      }
    }
  }

  export default withRouter(Section);