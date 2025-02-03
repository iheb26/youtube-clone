import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import { API_KEY } from '../../data'
import { value_converter } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'
const Playvideo = () => {
    const {videoId}=useParams();
    const[apiData,setApiData]=useState(null);
    const [channelData,setchannelData]=useState(null);
    const [commentData,setCommentData]=useState([]);//lgit ereur hna 5ater 3malet null
    const fetchVideoData=async()=>{
        //Fetching Video Data
        const videoDetails_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
        await fetch(videoDetails_url).then(res=>res.json()).then(data=>setApiData(data.items[0]));
    }
    const fetchOtherData=async()=>{
        //Fetching channel data :
        const channelDetails_url=`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
        await fetch(channelDetails_url).then(resp=>(resp.json())).then(data=>setchannelData(data.items[0]));
        //Fetching Comment Data:
        const comment_url=`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`;
        await fetch(comment_url).then(res=>(res.json())).then(data=>setCommentData(data.items));//lgit ereur hna 5ater 3malet items[0]
        
    }
    useEffect(()=>{
        fetchOtherData();
        
    },[apiData]);
    useEffect(()=>{
        fetchVideoData();
    },[videoId]);
  return (
    <div className='play-video'>
       {/* <video src={video1} controls autoPlay muted></video>*/}
       <iframe  src={`https://www.youtube.com/embed/${videoId}?autoplay=1` } frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <h3>{apiData?apiData.snippet.title:"Title Here"}</h3>
        <div className="play-video-info">
            <p>{apiData?value_converter(apiData.statistics.viewCount):"16k"} views &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():""}</p>
            <div>
                <span><img src={like} alt="" />{apiData?value_converter(apiData.statistics.likeCount):"155"}</span>
                <span><img src={dislike} alt="" />2</span>
                <span><img src={share} alt="" />Share</span>
                <span><img src={save} alt="" />Save</span>
            </div>
        </div>
        <hr />
        <div className="publisher">
            <img src={channelData?channelData.snippet.thumbnails.default.url:""} alt="" />
            <div>
                <p> {apiData?apiData.snippet.channelTitle :"Publisher Name"}</p>
                <span> {channelData?value_converter(channelData.statistics.subscriberCount):0} Subscribers</span>
            </div>
            <button>Subscribe</button>
        </div>
        <div className="video-desciption">
            <p>{apiData?apiData.snippet.description.slice(0,900) :"Description Here"}</p>
            <hr />
            <h4>{apiData?value_converter(apiData.statistics.commentCount) : "10"} Comments</h4>
            {commentData.map((item,index)=>{
                return(
                <div key={index} className="Comment">
                <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}  alt="" />
                <div>
                    <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span></h3>
                    <p>{item.snippet.topLevelComment.snippet.textDisplay} </p>
                    <div className="comment-action">
                        <img src={like} alt="" />
                        <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                        <img src={dislike} alt="" />
                    </div>
                </div>
            </div>
                )
            })}
        </div>
    </div>
  )
}

export default Playvideo

