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
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_request = gql`
  mutation addRequest($requestText: String!) {
    addRequest(requestText: $requestText) {
      _id
      requestText
      requestAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($requestId: ID!, $commentText: String!) {
    addComment(requestId: $requestId, commentText: $commentText) {
      _id
      requestText
      requestAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
