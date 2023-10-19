import { Container, Row, Col } from "react-bootstrap";
import './Neutral.css';
import Neutral from "../home/icon-mood/Icon-Neutral.svg";


const MoodNeutral = () => {
    return(
        <>
        <h1 className="line-neutral"></h1>
        <Container fluid className="mood__box-neutral">
            <Row>
                <Col md={10} xs={8}>
                    <h2 className="neutral">Neutral</h2>
                    <p className='sub-title'>Here are your personalised menu recommendation based on your emotion!</p>
                    <a href='camera'>
                        <p className='link-neutral'>Not feeling Neutral? Scan again!</p>
                    </a>
                </Col>

                <Col md={2} xs={4}>
                    <img src={Neutral} width={"100px"} height={"100px"} className="emote float-end" alt=" your-mood" />
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

export default MoodNeutral;

