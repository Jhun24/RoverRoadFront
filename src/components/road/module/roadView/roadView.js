import React, { useEffect } from "react";
import {useNavigate, useParams} from 'react-router-dom';
import api from '../../../../api/api';
import {useDispatch, useSelector} from 'react-redux';
import ViewThumbnail from "../viewThumbnail";
import { setRoadView } from '../../../../redux/action/html/html';
import { setViewAmount, setViewName } from "../../../../redux/action/road/roadView";

import Arrow from '../../../image/arrowBack.svg';
import Search from '../../../image/roadThumbnailSearch.svg';
import Edit from '../../../image/edit.svg'
import './roadView.css';

const { kakao } = window;

let RoadView = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { roadViewList, name, amount } = useSelector((state)=>({
        roadViewList:state.html.roadViewList,
        name:state.road.name,
        amount:state.road.amount
    }));

    let { roadToken } = useParams();

    useEffect(()=>{
          
        async function setRoadViewList(){
            let data = await api.getRoadData(roadToken);
            if(data.status == 200){
                dispatch(setRoadView(data.data));
            }
        }

        setRoadViewList();

        async function setRoadData(){
            let data = await api.getRoadThumbnailData(roadToken);
            if(data.status == 200){
                dispatch(setViewAmount(data.data.amount));
                dispatch(setViewName(data.data.name))
            }
        }

        setRoadData();

        let mapBox = document.getElementById('map');
        let options = {
            center:new kakao.maps.LatLng(37.38871852227143,126.6378025061129),
            level:6
        }

        let map = new kakao.maps.Map(mapBox, options);
        let geocoder = new kakao.maps.services.Geocoder();

        async function setMarker(){
            let linePath = new Array();
            for(let i in roadViewList){
                geocoder.addressSearch(roadViewList[i].location, function(result, status) {
 
                     if (status === kakao.maps.services.Status.OK) {
                
                        let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                        linePath.push(new kakao.maps.LatLng(result[0].y, result[0].x));
                
                        let marker = new kakao.maps.Marker({
                            map: map,
                            position: coords
                        });
                
                        map.setCenter(coords);
                        map.setLevel(6);
                    } 
                });    
            }
            console.log(linePath)
            let polyline = new kakao.maps.Polyline({
                path: linePath, // ?????? ???????????? ???????????? ?????????
                strokeWeight: 2, // ?????? ?????? ?????????
                strokeColor: '#0084FE', // ?????? ???????????????
                strokeOpacity: 1, // ?????? ???????????? ????????? 1?????? 0 ????????? ????????? 0??? ??????????????? ???????????????
                strokeStyle: 'dashed' // ?????? ??????????????????
            });
            polyline.setMap(map)
        }

        setMarker();
    }, [name])

    let onBack = ()=>{
        navigate(-1);
    }

    return(
        <div className="RoadView" id="roadView">
            <div className="header">
                <div className="header-box">
                    <img onClick={onBack} src={Arrow}/>

                    <h2>?????? ????????????</h2>
                </div>

            </div>

            <div className="map" id="map">

            </div>

            <div className="bottom-bar">
                <div className="input-box">
                    <div className="search-box">
                        <h2>{name}</h2>
                    </div>

                    <div className="select-box">
                       <p>?????? ?????? {amount}???</p>

                    </div>
                </div>

                <div className="line"></div>

                {roadViewList.map((i, index)=>(<ViewThumbnail key={index} name={i.name} image={i.image} star={i.star} description={i.description} roadToken={i.roadToken}></ViewThumbnail>))}
        

                <div className="space"></div>
            </div>
        </div>
    );
}

export default RoadView;