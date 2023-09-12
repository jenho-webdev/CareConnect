import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      requests {
        _id
        requestText
        createdAt
      }
    }
  }
`;

export const QUERY_RQUESTS = gql`
  query getRequests {
    requests {
      _id
      requestText
      requestAuthor
      createdAt
    }
  }
`;
export const QUERY_SINGLE_REQUEST = gql`
  query getSingleRequest($requestId: ID!) {
    request(requestId: $requestId) {
      _id
      requestText
      requestAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      requests {
        _id
        requestText
        requestAuthor
        createdAt
      }
    }
  }
`;
