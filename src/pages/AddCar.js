import { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import axios from "axios";

const AddCar = ({ getCars }) => {
  //const [inputModel,setInputModel]=useState("");
  const [modal, setModal] = useState(false);
  const [car, setCar] = useState({
    file: null,
    model: "",
    decription: "",
    produced_on: "",
    image: "",
  });

  const toggle = () => setModal(!modal);
  const alertshow = () => {
    alert("button clicked");
  };

  const onChangeModel = (event) => {
    setCar((previousState) => {
      return { ...previousState, model: event.target.value };
    });
    console.log(car);
  };
  //theo dõi giá trị từng input thì tại thẻ input có thêm thuộc tính value={inputModel}
  // const onChangeModel=(event)=>{
  //     setInputModel(event.target.value);
  //     console.log(inputModel);
  // };

  const onChangeDesc = (event) => {
    setCar((previousState) => {
      return { ...previousState, decription: event.target.value };
    });
    console.log(car);
  };

  const onChangeProduced = (event) => {
    setCar((previousState) => {
      return { ...previousState, produced_on: event.target.value };
    });
    console.log(car);
  };

  const onChangeImage = (event) => {
    setCar((previousState) => {
      return {
        ...previousState,
        file: URL.createObjectURL(event.target.files[0]),
        image: event.target.files[0].name,
      };
    });
    console.log(car);
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    const fileInput = document.querySelector("#fileupload");
    const formData = new FormData();
    formData.append("image", fileInput.files[0]);
    formData.append("decription", car.decription);
    formData.append("model", car.model);
    formData.append("produced_on", car.produced_on);

    fetch("http://localhost:8000/api/cars", { method: "post", body: formData })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        toggle(); //đóng form modal
        onRedirect();
      });
    // axios
    //   .post("http://localhost:8000/api/cars/" + formData)
    //   .then((res) => {
    //     console.log(res.data);
    //     if (res.data.status === "error") {
    //       console.log(res.data.errors);
    //     } else {
    //       console.log("Car updated!");
    //       onRedirect();
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     console.log("Update car Error");
    //   });
  };

  const onRedirect = () => {
    setCar([]); //set lại state car là mảng rỗng
    getCars();
  };
  return (
    <div>
      <Button className="float-right mb-4" color="primary" onClick={toggle}>
        Add car
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <form
          onSubmit={onSubmitForm}
          encType="multipart/form-data"
          method="post"
        >
          <ModalHeader toggle={toggle}>Add new car</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="model">Model</Label>
              <Input id="model" name="model" onChange={onChangeModel} />
            </FormGroup>
            <FormGroup>
              <Label for="decription">decription</Label>
              <Input
                id="decription"
                name="decription"
                onChange={onChangeDesc}
              />
            </FormGroup>
            <FormGroup>
              <Label for="produced_on">Produced_on</Label>
              <Input
                type="date"
                id="produced_on"
                name="produced_on"
                onChange={onChangeProduced}
              />
            </FormGroup>
            <FormGroup>
              <Label for="image">Image</Label>
              <Input
                id="fileupload"
                type="file"
                name="image"
                onChange={onChangeImage}
              />
              <img
                className="img-thumbnail img-fluid"
                style={{ width: "500px", height: "400px" }}
                src={car.file}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary">
              {" "}
              Add{" "}
            </Button>
            <Button color="secondary" onClick={toggle}>
              {" "}
              Cancel{" "}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
};
export default AddCar;
