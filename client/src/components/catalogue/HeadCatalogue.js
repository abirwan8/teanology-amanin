import { Container, Row, Col } from "react-bootstrap";
import './Catalogue.css';

const HeadCatalogue = () => {
    return(
        <Container fluid className="mood__box-neutral">
            <Row>
                <Col md={12}>
                    <h2 className="neutral">Katalog Teanology</h2>
                    <p className='sub-title'>Berikut semua katalog yang tersedia di Teanology</p>
                </Col>
            </Row>
        </Container>
    );
}

export default HeadCatalogue;