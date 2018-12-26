const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const cors = require('cors')
const videoDetailed = require('./videos.json');
const videosLinks = require('./videoLinks.json');
const uuidv4 = require('uuid/v4');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'public/uploads/' })


app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
    next();
});

app.use(express.static(path.join(__dirname, 'public')))


app.listen(8080, () => {
    console.log('Your server is running so you better go catch it');
});

// app.use(cors());

app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());

app.get('/videos', (req,res) => {
    res.json(videosLinks);
});

app.get('/videos/:id', (req,res) => {
    let chosenVideo = videoDetailed.find((vid) => {
        if(vid.id === req.params.id){
        return vid;
        }
    });
    res.json(chosenVideo);
});

app.post('/videos/:id/comments', (req, res) => {

    let respMsg = {msg: 'error: comment not posted'}

    let newComment = {
        "name": req.body.name,
        "comment": req.body.comment,
        "id": uuidv4(),
        "timestamp": + new Date()
    }

    videoDetailed.forEach(vid => {
        if(vid.id === req.params.id){
            vid.comments.push(newComment)
            respMsg = {msg: 'new comment posted'}
        }
    });

    res.json(respMsg);
});

app.delete('/videos/:videoID/comments/:commentID', (req, res) => {

    let videoIndex = videoDetailed.findIndex(video => video.id === req.params.videoID);
    let commentIndex = videoDetailed[videoIndex].comments.findIndex(comment => comment.id === req.params.commentID)
    videoDetailed[videoIndex].comments.splice(commentIndex, 1);

    res.json({msg: 'comment deleted'});
});

app.put('/videos/:videoID/like/', (req,res) => {
    videoDetailed.find((vid) => {
        if(vid.id === req.params.videoID){
            vid.thumbsUp++;  
        }
    });

    res.json({msg: 'like added'})
});

app.put('/videos/:videoID/dislike/', (req,res) => {
    videoDetailed.find((vid) => {
        if(vid.id === req.params.videoID){
            vid.thumbsDown++;  
        }
    });

    res.json({msg: 'dislike added'})
});

app.put('/videos/:videoID/addview/', (req,res) => {
    videoDetailed.find((vid) => {
        if(vid.id === req.params.videoID){
            vid.views++;  
        }
    });

    res.json({msg: 'view added'})
});

app.post('/upload', upload.single('video'), function (req, res, next) {

    // console.log(req.file);
    // console.log(req.body);

    req.file.path = req.file.path.split('/').slice(1).join('/');
    req.file.destination = req.file.destination.split('/').slice(1).join('/');
    const newFile = {...req.file, ...req.body};
    let files = loadJSON();
    files.push(newFile);
    saveJSON(files);
  
    res.json(newFile);
  });

  loadJSON = () => {
    return JSON.parse(fs.readFileSync('files.json'));
  }
  
  saveJSON = (json) => {
    fs.writeFileSync('files.json', JSON.stringify(json));
  }

