// Register User
export const register = (theRequest) => async (dispatch) => {
    //==========================================
    // flush the request to variables
    //==========================================
    // required
    let firstName = theRequest.firstName;
    let lastName = theRequest.lastName;
    let gender = theRequest.gender;
    let email = theRequest.email;
    let password = theRequest.password;
    let preferred_username = theRequest.preferred_username;
    //----------------------------------------
    // optional reg info
    let userName = null;
    let address = null;
    let phone = null;
    let birthday = null;
    let shirt = null;
  
    //now see if there is other registration info provided
    if (theRequest?.userName) {
      userName = theRequest.userName;
    }
    if (theRequest?.address) {
      address = theRequest.address;
    }
    if (theRequest?.phone) {
      phone = theRequest.phone;
    }
    if (theRequest?.birthday) {
      birthday = theRequest.birthday;
    }
    if (theRequest?.shirt) {
      shirt = theRequest.shirt;
    }
    //   build attributeList
    let attributeList = [
      {
        Name: "given_name",
        Value: firstName,
      },
      {
        Name: "family_name",
        Value: lastName,
      },
      {
        Name: "gender",
        Value: gender,
      },
      {
        Name: "email",
        Value: email,
      },
      {
        Name: "preferred_username",
        Value: preferred_username,
      },
    ];
    //   add optional reg info
    if (address) {
      attributeList.push({ Name: "address", Value: address });
    }
    if (phone) {
      attributeList.push({ Name: "phone", Value: phone });
    }
    if (birthday) {
      attributeList.push({ Name: "birthday", Value: birthday });
    }
    //    this is new code
    var originalParams = {
      ClientId:
        process.env.REACT_APP_COGNITO_CLIENTID /* 'STRING_VALUE', /* required */,
      Password: password /* 'STRING_VALUE', /* required */,
      Username: "dcolombo" /* 'STRING_VALUE', /* required */,
  
      SecretHash: "5dDa/mgbrIIaOdAet+xIJIJEOIh8+iZWSjL7fZrh+S0=",
      UserAttributes: attributeList,
      ValidationData: [
        {
          Name: "email" /* 'STRING_VALUE', /* required */,
          Value: email,
        },
        /* more items */
      ],
    };