import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      foundUser {
        _id
        email
        firstName
        lastName
        zip
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation signUp(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $zip: String!
  ) {
    signUp(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      zip: $zip
    ) {
      token
      newUser {
        _id
        firstName
        lastName
        email
        zip
      }
    }
  }
`;

export const ADD_REQUEST = gql`
  mutation createRequest(
    $requestTitle: String!
    $location: String!
    $type: String!
    $startTime: String!
    $endTime: String!
    $requestText: String!
  ) {
    createRequest(
      requestTitle: $requestTitle
      location: $location
      type: $type
      startTime: $startTime
      endTime: $endTime
      requestText: $requestText
    ) {
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

export const CANCEL_REQUEST = gql`
  mutation cancelRequest($requestId: ID!) {
    cancelRequest(requestId: $requestId) {
      _id
      status
      owner {
        _id
      }
      requestTitle
    }
  }
`;

export const OFFER_HELP = gql`
  mutation offerHelp($requestId: ID!) {
    offerHelp(requestId: $requestId) {
      _id
    }
  }
`;

export const SEND_FRIEND_REQUEST = gql`
  mutation sendFriendRequest($targetUserId: ID!) {
    sendFriendRequest(targetUserId: $targetUserId) {
      _id
      firstName
      lastName
      zip
      email
    }
  }
`;

export const ACCEPT_FRIEND_REQUEST = gql`
  mutation acceptFriendRequest($requesterId: ID!) {
    acceptFriendRequest(requesterId: $requesterId) {
      _id
      email
      firstName
      lastName
      zip
    }
  }
`;

export const CANCEL_HELP = gql`
  mutation cancelHelp($requestId: ID!) {
    cancelHelp(requestId: $requestId) {
      _id
    }
  }
`;
