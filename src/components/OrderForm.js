import React from "react";
import axios from "axios";
import "./OrderForm.css";
import * as Yup from "yup";
import { NavLink, Link } from "react-router-dom";
import { formSchema } from "./validation/Yup";
import { useState, useEffect } from "react";
import {
  Row,
  Col,
  FormGroup,
  Form,
  FormFeedback,
  Label,
  Input,
  DropdownToggle,
  DropdownItem,
  Button,
  UncontrolledDropdown,
} from "reactstrap";

const OrderForm = () => {
  const pizza = {
    pizzaName: "Position Absolute Acı Pizza",
    name: "",
    size: "",
    price: 85.5,
    dough: "",
    extra: [],
    special: "",
    count: 1,
    point: 4.9,
    comment: 200,
  };
  const errorPizza = {
    name: "",
    size: "",
    dough: "",
    extra: "",
    count: "",
    special: "",
  };
  const [order, setOrder] = useState(pizza);
  const [orderError, setOrderError] = useState(errorPizza);
  const [count, setCount] = useState(pizza.count);
  const [firstPrice, setFirstPrice] = useState(pizza.price);
  const [totalPrice, setTotalPrice] = useState(pizza.price);
  const [extraPrice, setExtraPrice] = useState(0);
  const [lastOrder, setLastOrder] = useState([]);
  const [valid, setValid] = useState(false);

  const submitHandler = e => {
    e.preventDefault();
    if (valid) {
      axios
        .post("https://reqres.in/api/users", order)
        .then(res => setLastOrder([...lastOrder, res.data]));
    }
  };
  const validation = (name, value) => {
    Yup.reach(formSchema, name)
      .validate(value)
      .then(() => setOrderError({ ...orderError, [name]: "" }))
      .catch(err => setOrderError({ ...orderError, [name]: err.errors[0] }));
    setOrder({ ...order, [name]: value });
  };
  const changeHandler = e => {
    const { type, name, value } = e.target;
    if (type === "checkbox") {
      if (order.extra.includes(value)) {
        setOrder({
          ...order,
          extra: order.extra.filter(item => item == value),
        });
      } else {
        setOrder({ ...order, extra: [...order.extra, value] });
      }
    } else {
      setOrder({ ...order, [name]: value });
      validation(name, value);
    }
  };
  const plus = () => {
    setCount(count + parseInt(1));
    setOrder({ ...order, count: count });
  };
  const minus = () => {
    count > 1 ? setCount(count - parseInt(1)) : setCount(1);
    setOrder({ ...order, count: count });
  };

  useEffect(() => {
    Yup.reach(formSchema, "extra")
      .validate(order.extra)
      .then(() => setOrderError({ ...orderError, extra: "" }))
      .catch(err => setOrderError({ ...orderError, extra: err.errors[0] }));
    console.log(order);
  }, [order.extra]);

  useEffect(() => {
    formSchema.isValid(order).then(valid => setValid(!valid));
    setExtraPrice(order.extra.length * 5);
    setTotalPrice((firstPrice + order.extra.length * 5) * count);
  }, [order]);

  useEffect(() => {
    console.log(order);
  }, [order]);

  return (
    <div className="order">
      <header className="order-header">
        <NavLink to="/">Anasayfa - &nbsp;</NavLink>
        <NavLink to="/pizza">Seçenekler - &nbsp;</NavLink>
        <NavLink to="/pizza"> Sipariş Oluştur</NavLink>
      </header>
      <div className="order-info">
        <h3>{order.pizzaName}</h3>

        <div className="point">
          <h2>{order.price}₺</h2>
          <p>{order.point}</p>
          <p>({order.comment})</p>
        </div>
        <div>
          <p>
            Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı
            pizza tam sana göre. Pizza, domotes, peynir ve genellikle çeşitli
            diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun
            ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle
            yuvarlak düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan
            kökenlik lezzetli bir yemektir.. Küçük bir pizzaya bazen pizetta
            denir.
          </p>
        </div>
      </div>
      <div className="order-select">
        <Form id="pizza-form" onSubmit={submitHandler} data-cy="formSubmit">
          <Row>
            <Col>
              <h3>
                Boyut Seç <span style={{ color: "red" }}>*</span>
              </h3>
              <FormGroup check>
                <Input
                  id="small"
                  name="size"
                  type="radio"
                  onChange={changeHandler}
                  value="Küçük"
                  data-cy="size-small"
                />
                <Label for="small" check>
                  Küçük
                </Label>
                <FormFeedback>{orderError.size}</FormFeedback>
              </FormGroup>
              <FormGroup check>
                <Input
                  id="medium"
                  name="size"
                  type="radio"
                  onChange={changeHandler}
                  value="Orta"
                />
                <Label for="medium" check>
                  Orta
                </Label>
                <FormFeedback>{orderError.size}</FormFeedback>
              </FormGroup>
              <FormGroup check>
                <Input
                  id="large"
                  name="size"
                  type="radio"
                  onChange={changeHandler}
                  value="Büyük"
                />
                <Label for="large" check>
                  Büyük
                </Label>
                <FormFeedback>{orderError.size}</FormFeedback>
              </FormGroup>
            </Col>

            <Col>
              <h3>
                Hamur Seç <span style={{ color: "red" }}>*</span>
              </h3>
              <FormFeedback>{orderError.dough}</FormFeedback>
              <UncontrolledDropdown id="size-dropdown" className="crust">
                <DropdownToggle caret style={{ fontWeight: "bold" }}>
                  Hamur Kalınlığı
                </DropdownToggle>

                <FormGroup>
                  <DropdownItem
                    for="crust"
                    type="select"
                    name="dough"
                    data-cy="dough-normal"
                    value="Normal"
                    onClick={changeHandler}
                    invalid={orderError.dough}
                  >
                    Normal
                  </DropdownItem>

                  <DropdownItem
                    for="crust"
                    type="select"
                    name="dough"
                    value="İnce"
                    onClick={changeHandler}
                    invalid={orderError.dough}
                    data-cy="dough-ince"
                  >
                    İnce
                  </DropdownItem>
                  <DropdownItem
                    for="crust"
                    type="select"
                    name="dough"
                    value="Kalin"
                    onClick={changeHandler}
                    invalid={orderError.dough}
                    data-cy="dough-Kalin"
                  >
                    Kalın
                  </DropdownItem>
                </FormGroup>
                <span>{order.dough}</span>
              </UncontrolledDropdown>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="order-extra">
        <div>
          <h3>Ek Malzemeler</h3>
          <p>En Fazla 10 malzeme seçebilirsiniz. 5₺</p>
        </div>

        <Form id="extra" onSubmit={submitHandler}>
          <Row>
            <Col>
              <FormGroup>
                <Label>
                  <Input
                    type="checkbox"
                    name="extra"
                    onChange={changeHandler}
                    value="pepperoni"
                  />{" "}
                  Pepperoni
                </Label>
              </FormGroup>
              <FormGroup>
                <Label>
                  <Input
                    type="checkbox"
                    name="extra"
                    onChange={changeHandler}
                    value="sosis"
                  />{" "}
                  Sosis
                </Label>
              </FormGroup>
              <FormGroup>
                <Label>
                  <Input
                    type="checkbox"
                    name="extra"
                    onChange={changeHandler}
                    value="jambon"
                  />{" "}
                  Kanada Jambonu
                </Label>
              </FormGroup>
              <FormGroup>
                <Label>
                  <Input
                    type="checkbox"
                    name="extra"
                    onChange={changeHandler}
                    value="tavuk"
                  />{" "}
                  Tavuk Izgara
                </Label>
              </FormGroup>
              <FormGroup>
                <Label>
                  <Input
                    type="checkbox"
                    name="extra"
                    onChange={changeHandler}
                    value="sogan"
                  />{" "}
                  Soğan
                </Label>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>
                  <Input
                    type="checkbox"
                    name="extra"
                    onChange={changeHandler}
                    value="domates"
                  />{" "}
                  Domates
                </Label>
              </FormGroup>
              <FormGroup>
                <Label>
                  <Input
                    type="checkbox"
                    name="extra"
                    onChange={changeHandler}
                    value="zeytin"
                  />{" "}
                  Zeytin
                </Label>
              </FormGroup>
              <FormGroup>
                <Label>
                  <Input
                    type="checkbox"
                    name="extra"
                    onChange={changeHandler}
                    value="sucuk"
                  />{" "}
                  Sucuk
                </Label>
              </FormGroup>
              <FormGroup>
                <Label>
                  <Input
                    type="checkbox"
                    name="extra"
                    onChange={changeHandler}
                    value="jalepeno"
                  />{" "}
                  Jalepeno
                </Label>
              </FormGroup>
              <FormGroup>
                <Label>
                  <Input
                    type="checkbox"
                    name="extra"
                    onChange={changeHandler}
                    value="sarimsak"
                  />{" "}
                  Sarımsak
                </Label>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>
                  <Input
                    type="checkbox"
                    name="extra"
                    onChange={changeHandler}
                    value="biber"
                  />{" "}
                  Biber
                </Label>
              </FormGroup>
              <FormGroup>
                <Label>
                  <Input
                    type="checkbox"
                    name="extra"
                    onChange={changeHandler}
                    value="mantar"
                  />{" "}
                  Mantar
                </Label>
              </FormGroup>
              <FormGroup>
                <Label>
                  <Input
                    type="checkbox"
                    name="extra"
                    onChange={changeHandler}
                    value="ananas"
                  />{" "}
                  Ananas
                </Label>
              </FormGroup>
              <FormGroup>
                <Label>
                  <Input
                    type="checkbox"
                    name="extra"
                    onChange={changeHandler}
                    value="kabak"
                  />{" "}
                  Kabak
                </Label>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </div>

      <div id="special-text">
        <FormGroup className="order-name">
          <Label>
            <Input
              type="text"
              id="name"
              name="name"
              onChange={changeHandler}
              value={order.name}
              invalid={!!orderError.name}
              placeholder="Lütfen isminizi giriniz"
            />
          </Label>
          <FormFeedback>{orderError.name}</FormFeedback>
        </FormGroup>
        <Label>Sipariş Notu</Label>
        <br></br>
        <Input
          id="special"
          type="text"
          name="special"
          placeholder=""
          onChange={changeHandler}
          size="lg"
          data-cy="special"
          value={order.special}
        />

        <hr />
      </div>
      <div className="order-total">
        <div className="order-counter">
          <Button color="warning" size="lg" onClick={minus}>
            -
          </Button>
          <div className="count">
            <p>{count}</p>
          </div>
          <Button color="warning" size="lg" onClick={plus}>
            +
          </Button>
        </div>
        <div className="finally">
          <div className="order-total-right">
            <Row className="card">
              <h3>Sipariş Toplamı </h3>
              <Col>
                Seçimler: {extraPrice}₺ <br></br>
                <br></br>Toplam: {totalPrice}₺
              </Col>
              <Col></Col>
            </Row>
          </div>
          <div className="button">
            <Link to="/success">
              <Button
                id="order-button"
                color="warning"
                type="submit"
                disabled={!valid}
                data-cy="secondButton"
              >
                SİPARİŞ VER
              </Button>
            </Link>
          </div>
        </div>
        <br></br>
        <br></br>
      </div>
    </div>
  );
};

export default OrderForm;
