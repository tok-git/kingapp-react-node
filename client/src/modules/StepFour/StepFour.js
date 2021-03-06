import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import InfoModal from 'components/InfoModal';
import FooterSection from 'modules/FooterSection';
import history from 'browserHistory';

import './style.scss';

class StepFour extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      userphone: '',
      useremail: '',
      message: '',
      validated: false,
      sent: false
    };
  }

  onChangeState = field => event => {
    this.setState({ [field]: event.target.value });
  };

  onPrev = () => {
    history.push('/step3');
  };

  onClose = () => {
    this.setState({ sent: false });
  };

  async handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({ validated: true });
      return;
    }

    event.preventDefault();

    const { hatLogoImage, hatLogoPos, products } = this.props;
    const { username, userphone, useremail, message } = this.state;

    await axios
      .post('/api/form', {
        username,
        userphone,
        useremail,
        message,
        hatLogoPos,
        products,
        hatLogoImage
      })
      .then(res => {
        this.setState({ sent: true });
      })
      .catch(err => {
        console.error('--Email Send--', err);
      });
  }

  render() {
    const { username, userphone, useremail, message, validated } = this.state;

    return (
      <div className="step4">
        <div className="step">
          <div className="step4-label step4-mainlabel">Excellent!</div>
          <div className="step-title step4-sublabel">Ready to send for a quote?</div>
          <Form
            noValidate
            validated={validated}
            onSubmit={e => this.handleSubmit(e)}
            className="step4-form"
          >
            <Form.Group controlId="validationCustom01">
              <Form.Label>Name*</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  value={username}
                  placeholder="First name, Last name"
                  onChange={this.onChangeState('username')}
                  required
                  name="username"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide your name.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="validationCustom04">
              <Form.Label>Phone*</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  value={userphone}
                  placeholder="Phone Number"
                  aria-describedby="inputGroupPrepend"
                  onChange={this.onChangeState('userphone')}
                  required
                  name="userphone"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide your number.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="validationCustom01">
              <Form.Label>Email*</Form.Label>
              <InputGroup>
                <Form.Control
                  type="email"
                  value={useremail}
                  placeholder="Email Address"
                  onChange={this.onChangeState('useremail')}
                  required
                  name="useremail"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="message" className="form-groupbox">
              <Form.Label className="form-title">Order Comments</Form.Label>
              <Form.Control
                as="textarea"
                className="form-message"
                value={message}
                rows={6}
                placeholder="Any specifics about your order that you would like us to know?"
                onChange={this.onChangeState('message')}
              />
            </Form.Group>

            <Button type="submit" variant="success" className="step4-submitbtn">
              Send for a quote
            </Button>
          </Form>
        </div>
        <FooterSection isNext={false} onPrev={this.onPrev} />
        <InfoModal
          show={this.state.sent}
          title="Thank you for your order"
          buttonText="Close"
          onClick={this.onClose}
          icon="fa fa-check-circle"
        >
          We will reach out as soon as possible.
        </InfoModal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hatLogoImage: state.hatLogoImage,
  hatLogoPos: state.hatLogoPos,
  products: state.products
});

const withConnect = connect(mapStateToProps);

export default withConnect(StepFour);
