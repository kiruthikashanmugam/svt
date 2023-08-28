import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import loader from '../../../Loader.gif';

function Pujalist1() {

    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    useEffect(()=>{
        setLoading(false)
    },[])

    useEffect(() => {
        getData()

    }, []);

    async function getData() {
        await axios(
            "https://svt.know3.com/api/view_pujalist"
        )
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }



    if (loading) {
        return (
            <div>
                <div style={{ width: '100%', height: '100%', textAlign: 'center', marginTop: '300px' }}>
                    <img src={loader} alt='Loading Please Wait...'></img>
                </div>
            </div>
        );
    }
    if (error) return "Error!";
    return (
        <div>


            <div class="section">
                <div class="container">



                    <div class="post-detail-wrapper">
                        <h6>PLEASE NOTE THAT ALL DEVOTEE ADDRESSES BEYOND 15 MILES FROM THE TEMPLE WILL BE CONSIDERED AS OUTSIDE TRIANGLE </h6>
                        <p>Note : You have to login to the website, to Book the Puja. The menu to book the puja will be visible after you login.</p>
                        <Table className="sigma_responsive" responsive>
                            <thead>
                                <tr>

                                    <th style={{ color: '#db4242' }}>#</th>
                                    <th style={{ color: '#db4242' }}>Puja Service</th>
                                    <th style={{ color: '#db4242' }}>Duration</th>
                                    <th style={{ color: '#db4242' }}>Temple Premise</th>
                                    <th style={{ color: '#db4242' }}>Within triangle</th>
                                    <th style={{ color: '#db4242' }}>Outside Triangle</th>
                                    <th style={{ color: '#db4242' }}>Download</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((use, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td >{use.pooja_name}</td>
                                        <td>{use.pooja_Duration}</td>
                                        <td >{use.category.find((category) => category.pooja_type === "Temple Premise")?.pooja_fees}</td>
                                        <td >{use.category.find((category) => category.pooja_type === "Within Triangle")?.pooja_fees}</td>
                                        <td >{use.category.find((category) => category.pooja_type === "Outside Triangle")?.pooja_fees}</td>
                                        <td > {use.pooja_url ? (
                                            <a href={use.pooja_url} download>
                                                Download
                                            </a>
                                        ) : null}</td>
                                    </tr>
                                ))}


                            </tbody>
                        </Table>
                    </div>



                </div>
            </div>




        </div>
    )
}

export default Pujalist1