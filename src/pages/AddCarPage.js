import { useState } from "react";
import { Button, FormGroup, Label, Input } from "reactstrap";
const AddCarPage = ({ getCars }) => {
  //const [inputModel,setinputModel]=useState("");

  const [car, setCar] = useState({
    file: null,
    model: "",
    decription: "",
    produced_on: "",
    image: "",
  });

  const onChangeModel = (event) => {
    setCar((previousState) => {
      return { ...previousState, model: event.target.value };
    });
    console.log(car);
  };
  //theo dõi giá trị từng input thì tại thẻ input có thêm thuộc tính value={inputModel}
  // const onChangeModel=(event)=>{
  //     setinputModel(event.target.value);
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
    const fileinput = document.querySelector("#fileupload");
    const formData = new FormData();
    formData.append("image", fileinput.files[0]);
    formData.append("decription", car.decription);
    formData.append("model", car.model);
    formData.append("produced_on", car.produced_on);

    fetch("http://localhost:8000/api/cars", { method: "post", body: formData })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        onRedirect();
      });
  };

  const onRedirect = () => {
    setCar([]); //set lại state car là mảng rỗng
    getCars();
  };
  return (
    <div className="container">
      <h2>Add a new car</h2>
      <form onSubmit={onSubmitForm} encType="multipart/form-data" method="post">
        <FormGroup>
          <Label for="model">Model</Label>
          <Input id="model" name="model" onChange={onChangeModel} />
        </FormGroup>
        <FormGroup>
          <Label for="decription">decription</Label>
          <Input id="decription" name="decription" onChange={onChangeDesc} />
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
          <img className="img-thumbnail img-fluid" src={car.file} />
        </FormGroup>

        <Button type="submit" color="primary">
          {" "}
          Thêm{" "}
        </Button>
      </form>
    </div>
  );
};
export default AddCarPage;
