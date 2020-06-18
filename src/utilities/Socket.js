import React, { Component } from "react";
import io from "socket.io-client";
import { RNToasty } from "react-native-toasty";

const socket = io("https://helajob.com:3001"); // Live server

export default class Socket extends Component {
  initalizeSocket = cb => {
    //Listners
    socket.on("connect", res => {
      cb("connected");
    });
    //Socet joined
    socket.on("joined", res => {});

    //Socket disconnected
    socket.on("disconnect", () => {});
    socket.on("extendHireStatus", response => {});
  };

  onSocketConnect = user_id => {
    //Join socket connection
    socket.emit("join", { id: user_id });
  };

  // Requesting a service
  onRequestService = details => {
    let obj = {
      user: details.user,
      latitude: details.latitude,
      longitude: details.logitude,
      service: details.service,
      booking_date: details.booking_date,
      address: details.formatted_address,
      schedule: details.schedule,
      local_booking_date: details.local_booking_date
    };
    socket.emit("requestService", obj);
  };

  // Makinag a payment to expert
  paymentSuccessfull = id => {
    socket.emit("paymentSuccess", {
      service_id: id
    });
  };

  // Called if expert accepts the request
  onRequestAccept = cb => {
    socket.on("accRequestResponse", data => {
      RNToasty.Success({
        title: "********EXPERT FOUND*********",
        withIcon: false
      });
      cb(data);
    });
  };

  // Called if no expert is found
  noExpertFound = cb => {
    socket.on("noExpert", data => {
      RNToasty.Error({
        title: "*****NO EXPERT FOUND********",
        withIcon: false
      });
      cb(true);
    });
  };

  // Called while sending a message
  sendMessage = data => {
    socket.emit("sendMessage", data);
  };

  // Called when receiving a message
  messageReceived = cb => {
    socket.on("newMessage", message => {
      cb(message);
    });
  };

  // Used for live tracking an expert
  liveTrackingExpert = cb => {
    socket.on("updatedExpertLocation", location => {
      cb(location);
    });
  };

  // Used for getting reference number
  getReference = cb => {
    socket.on("sendRequest", referenceNumber => {
      cb(referenceNumber);
    });
  };

  // Used for closing service popup
  servicePopup = cb => {
    socket.on("closeQRCodePopUP", response => {
      cb(response);
    });
  };

  // Used to receive response from Expert
  requestResponse = cb => {
    socket.on("sendRequest", response => {
      cb(response);
      socket.removeAllListeners(["sendRequest"]);
    });
  };

  // Called when a rating is sent
  onSetRating = user_id => {
    socket.emit("getLatestUserDetail", { user_id: user_id });
  };

  // Called when a rating is received
  onGetRating = cb => {
    socket.on("getLatestUserDetail", response => {
      cb(response);
    });
  };

  extendHireStatus = cb => {
    socket.on("extendHireStatus", response => {
      cb(true);
    });
  };

  extendHireRequest = request_id => {
    socket.emit("extendHire", { request_id: request_id });
  };
}
