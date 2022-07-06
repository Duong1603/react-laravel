import { useState } from 'react';
import { ModalHeader } from 'react-bootstrap';
import { Button, Modal, ModalBody, ModalFooter, FormGroup, Input, Label, Col } from 'reactstrap';

function AddCar() {
    const [modal, setModal] = useState(false);
    const [car, setCar] = useState({
        model: "",
        decription: "",
        product_on: "",
        image: "",
        file: null,
    });

    const handlerInput = (e) => {
        const { name, value } = e.target;

        setCar({
            ...car,
            file: URL.createObjectURL(e.target.files[0]),
            [name]: value
        })
    };

    const toggle = () => {
        setModal(!modal);
    }
    return (
        <>
            <Button color="danger" onClick={toggle}>
                CREATE NEW CAR
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    <h1>ADD NEW CAR</h1>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label> Model </Label>
                        <Input
                            id="exampleEmail" name="model" value={car ? car.model : ""} onChange={handlerInput} placeholder="Enter name" type="text" />
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            Description
                        </Label>
                        <Input
                            id="exampleEmail"
                            name="decription"
                            value={car ? car.decription : ""}
                            onChange={handlerInput}
                            placeholder="Enter description"
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            Product_on
                        </Label>
                        <Input
                            id="exampleEmail"
                            name="product_on"
                            value={car ? car.product_on : ""}
                            onChange={handlerInput}
                            placeholder="Enter prodct_on"
                            type="date"
                        />
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2}>
                            Image
                        </Label>
                        <Col sm={5}>
                            <Input
                                id="image"
                                name="image"
                                value={car ? car.image : ""}
                                onChange={handlerInput}
                                placeholder="choose file image"
                                type="file"
                            />
                        </Col>
                        <Col sm={5}>
                            <img src={car ? car.file : ""} alt="" width={150} height={150} />
                        </Col>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={function noRefCheck() { }}>
                        submit
                    </Button>
                    {' '}
                    <Button onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}
export default AddCar;
