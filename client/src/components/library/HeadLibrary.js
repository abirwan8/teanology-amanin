import { Container, Row, Col } from "react-bootstrap";

const HeadLibrary = () => {
    return(
        <Container fluid className="mood__box-neutral">
            <Row>
                <Col md={12}>
                    <h2 className="neutral">Library Teanology</h2>
                    <p className='sub-title'>Ketahui lebih banyak mengenai Teanology</p>
                </Col>
            </Row>
        </Container>
    );
}

export default HeadLibrary;