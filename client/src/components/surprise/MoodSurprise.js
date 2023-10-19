import { Container, Row, Col } from "react-bootstrap";
import './Surprise.css';
import Surprised from "../home/icon-mood/Icon-Surprised.svg";


const MoodSurprise = () => {
    return(
        <>
       <h1 className="line-surprise"></h1>
        <Container fluid className="mood__box-surprise">
            <Row>
                <Col md={10} xs={8}>
                    <h2 className="surprise">Surprise</h2>
                    <p className='sub-title'>Here are your personalised menu recommendation based on your emotion!</p>
                    <a href='camera'>
                        <p className='link-surprise'>Not feeling Surprised? Scan again!</p>
                    </a>
                </Col>

                <Col md={2} xs={4}>
                    <img src={Surprised} width={"100px"} height={"100px"} className="emote float-end" alt=" your-mood" />
                </Col>
            </Row>

            <Row>
                <Col md={10} className='offset-md-1'>
                    <p className="attention">ALL PRICES ARE IN THOUSANDS OF RUPIAH AND INCLUSIVE OF GOVERNMENT TAX PRICES ARE PER GLASS/BOTTLE/TEAPOT</p>
                </Col>
            </Row>
        </Container>
        </>
    );
}

export default MoodSurprise;