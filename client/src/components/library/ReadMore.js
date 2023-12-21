import './Library.css';

import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";


const ReadMore = () => {
    const { id } = useParams();
    const [val, setVal] = useState({id});
    const pdfUrl = "http://localhost:5000/";
    
    useEffect(() => {
      Axios.get(`http://localhost:5000/libs/${val.id}`).then((response) => {
        console.log(response.data);
        setVal(response.data);
      });
    }, [id]);

    return(
        <>
            <div className='desc-readlib'>
                <h4 className="mt-4 fw-bold lib-title">{val.title}</h4>
                <p style={{ textAlign: "justify" }}>
                    {val.desc}
                </p>
            </div>

            <div style={{ width: '100%', height: '100vh' }} className="d-flex justify-content-center">
                {val.pdfFile && (
                    <iframe
                    src={`${pdfUrl}${val.pdfFile}`}
                    style={{ width: '92%', height: '100%', border: 'none' }}
                    title="PDF View"
                    >
                    </iframe>
                )}
            </div>
        </>
    );
}

export default ReadMore;