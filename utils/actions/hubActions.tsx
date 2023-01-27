import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import React, { useState } from "react";
import backend from "../../constants/backend";
import { AuthResponse } from "../interfaces/AuthResponse";

export const useHubConnection = (accessToken: string) => {
  const [hubConnection, setHubConnection] = useState<HubConnection | null>(
    null
  );

  const createHubConnection = () => {
    const connection = new HubConnectionBuilder()
      .withUrl(backend.hubUrl + "presence", {
        accessTokenFactory: () => accessToken,
      })
      .withAutomaticReconnect()
      .build();
    setHubConnection(connection);

    connection.start().catch((error) => console.log(error));

    connection.on("UserIsOnline", (userId) => {
      console.log(`${userId} 'id li kullanıcı is online`);
    });

    connection.on("UserIsOffline", (userId) => {
      console.log(`${userId} 'id li kullanıcı is offline`);
    });
  };

  const stopHubConnection = () => {
    if (hubConnection) {
      hubConnection.stop();
      setHubConnection(null);
    }
  };

  return { hubConnection, createHubConnection, stopHubConnection };
};

// export const createHubConnection = (accessToken: string) => {
//  const connection= new HubConnectionBuilder()
//     .withUrl(backend.hubUrl + "presence", {
//       accessTokenFactory: () => accessToken,
//     })
//     .withAutomaticReconnect()
//     .build();

//     connection.start().catch((error) => console.log(error));

//     connection.on("UserIsOnline", (userId) => {
//     console.log(`${userId} 'id li kullanıcı is online`);
//   });

//   connection.on("UserIsOffline", (userId) => {
//     console.log(`${userId} 'id li kullanıcı is offline`);
//   });
// };
