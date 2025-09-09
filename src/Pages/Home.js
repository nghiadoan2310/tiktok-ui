import { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';

import VideosSuggested from "~/components/VideosSuggested";

import * as videoService from '~/Services/videoService'

import { AuthContext } from "~/components/Provider";
import { VideoContext } from '~/components/Provider';

function Home() {
    const ContextAuth = useContext(AuthContext);
    const ContextVideo = useContext(VideoContext);

    const [page, setPage] = useState(1);
    const [listVideoHome, setListVideoHome] = useState([])
    const [totalPage, setTotalPage] = useState(null);

    useEffect(() => {
        //Dùng axios
        const fetchApi = async () => {
            //result là giá trị trả về của việc tìm kiếm
            const data = await videoService.getVideosList(ContextAuth.tokenStr, 'for-you', page);

            if(data) {
                setTotalPage(data.meta?.pagination?.total_pages);
    
                const currentPage = getRandomNumber(1, data.meta.pagination.total_pages);           
    
                const result = await videoService.getVideosList(ContextAuth.tokenStr, 'for-you', currentPage);             
                    
                ContextVideo.setListVideo(result.data);
                setListVideoHome(result.data);
            }
            
        };

        fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(!totalPage) {
            return;
        }

        const currentPage = getRandomNumber(1, totalPage);
        //Dùng axios
        const fetchApi = async () => {
            //result là giá trị trả về của việc tìm kiếm
            const result = await videoService.getVideosList(ContextAuth.tokenStr, 'for-you', currentPage);

            if(result) {
                ContextVideo.setListVideo((prev) => [...prev, ...result.data]);
                setListVideoHome((prev) => [...prev,...result.data]);
            }           
        };

        fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const getRandomNumber = (min, max) =>  (Math.floor(Math.random() * (max - min)) + min);

    function handleScroll() {
        if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
            setPage((page) => page + 1);
        }
    }
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Helmet>
                <title>Xem các video thịnh hành dành cho bạn | Tiktok</title>
            </Helmet>
            <VideosSuggested data={listVideoHome}/>
        </>
    )
}

export default Home;