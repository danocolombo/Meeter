import React from "react";

class PhoneComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      phone: "",
      isvalid: false,
      message: "",
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      phone: e.target.value,
    });
  }

  phoneValidation() {
    const regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
    return !(!this.state.phone || regex.test(this.state.phone) === false);
  }

  onSubmit() {
    const isPhoneValid = this.phoneValidation();
    this.setState(
      {
        isvalid: isPhoneValid,
        message: isPhoneValid
          ? "Phone Number is Valid!"
          : "Phone Number not valid!",
      },
      () => this.props.onPhoneSubmit(this.state)
    );

    // Check if email is valid
    if (this.state.isvalid) {
      console.log(this.state);
    }
  }

  render() {
    const messageTemplate = this.state.message ? (
      <div
        className={"alert alert-" + (this.state.isvalid ? "success" : "danger")}
        role="alert"
      >
        {this.state.message}
      </div>
    ) : (
      ""
    );

    return (
      <div className="child-component">
        <div className="form-group mb-3">
          <label>
            <strong>Phone</strong>
          </label>
          <input
            type="phone"
            name="phone"
            value={this.state.phone}
            onChange={this.onChange}
            className="form-control"
          />
        </div>

        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => this.onSubmit()}
          >
            Submit
          </button>
        </div>
        <br />
        {messageTemplate}
      </div>
    );
  }
}

export default PhoneComponent;