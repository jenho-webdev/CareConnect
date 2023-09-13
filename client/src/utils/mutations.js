import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation signUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_REQUEST = gql`
  mutation createRequest($requestTitle: String!, $location: String!, $type: String!, $startTime: String!, $endTime: String!, $requestText: String!) {
    createRequest(requestTitle: $requestTitle, location: $location, type: $type, startTime: $startTime, endTime: $endTime, requestText: $requestText) {
      _id
      requestTitle
      location
      type
      createdAt
      startTime
      endTime
      status
      requestText
      owner {
        _id
      }
      participants {
        _id
      }
    }
  }
`;

export const DELETE_REQUEST = gql`
  mutation deleteRequest($requestId: ID!) {
    deleteRequest(requestId: $requestId) {
      _id
    }
  }
`;
