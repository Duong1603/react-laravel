import { useState } from "react";
import { ModalHeader } from "react-bootstrap";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
  Col,
} from "reactstrap";
import axios from "axios";

function AddCar({ getCars }) {
  const [modal, setModal] = useState(false);
  const [car, setCar] = useState({
    model: "",
    decription: "",
    product_on: "",
    fileinput: "",
    file: null,
  });

  const handlerInput = (e) => {
    const { name, value } = e.target;
    console.log(car);
    setCar({
      ...car,
      //   file:
      //     e.target.files && e.target.files.length
      //       ? URL.createObjectURL(e.target.files[0])
      //       : car.file,
      //   image:
      //     e.target.files && e.target.files.length
      //       ? e.target.files[0].name
      //       : car.image,
      [name]: value,
    });
  };

  const handlerImageFile = (e) => {
    setCar({
      ...car,
      file: URL.createObjectURL(e.target.files[0]),
      image: e.target.files[0].name,
    });
  };

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmitform = (e) => {
    e.prevenDefault();
    const fileInput = document.getElementById("fileinput");
    const formData = new FormData();
    formData.append("image", fileInput.files[0]);
    formData.append("decription", car.decription);
    formData.append("model", car.model);
    formData.append("produced_on", car.product_on);
    axios
      .post("http://localhost:8000/api/cars", formData)
      .then(function (response) {
        console.log(response);
        onRedirect();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const onRedirect = () => {
    toggle();
    setCar({});
    getCars();
  };

  return (
    <>
      <Button color="danger" onClick={toggle}>
        CREATE NEW CAR
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <form
          onSubmit={handleSubmitform}
          encType="multipart/form-data"
          method="post"
        >
          <ModalHeader>
            <h1>ADD NEW CAR</h1>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label> Model </Label>
              <Input
                id="exampleEmail"
                name="model"
                value={car ? car.model : ""}
                onChange={handlerInput}
                placeholder="Enter name"
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <Label>Description</Label>
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
              <Label>Product_on</Label>
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
              <Label sm={2}>Image</Label>
              <Col sm={5}>
                <Input
                  id="fileinput"
                  name="image"
                  onChange={handlerImageFile}
                  placeholder="choose file image"
                  type="file"
                />
              </Col>
              <Col sm={5}>
                <img
                  src={car ? car.file : null}
                  alt=""
                  width={150}
                  height={150}
                />
              </Col>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">
              submit
            </Button>
            <Button onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}
export default AddCar;
