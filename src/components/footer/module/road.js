import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import axios from 'axios';

import Post from '../../image/post.svg';
import RoadBlue from '../../image/roadBlue.svg';
import Guide from '../../image/guide.svg';
import Map from '../../image/map.svg';
import Profile from '../../image/Profile.png';

let RoadModule = ()=>{
    const { image } = useSelector((state)=>({
        image:state.user.image
    }));

    return(
        <div className='PostModule'>
            <Link to="/main/post">
                <div className="content">
                    <img src={Post}/>
                    <p>저널</p>
                </div>
            </Link>
            <Link to="/main/road">
                <div className="content blue">
                    <img src={RoadBlue}/>
                    <p>일정 생성</p>
                </div>
            </Link>
            <Link to="/main/guide">
                <div className="content">
                    <img src={Guide}/>
                    <p>가이더</p>
                </div>
            </Link>
            <Link to="/main/map">
                <div className="content">
                    <img src={Map}/>
                    <p>트레블 타입</p>
                </div>
            </Link>
            <Link to="/main/my">
                <div className="content">
                    <img className="profile" src={axios.defaults.baseURL + image}/>
                    <p>MY</p>
                </div>
            </Link>
        </div>
    );
}

export default RoadModule;