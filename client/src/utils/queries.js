import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query getUsersByName($firstName: String!, $lastName: String!) {
    getUsersByName(firstName: $firstName, lastName: $lastName) {
      _id
      firstName
      lastName
    }
  }
`;

export const QUERY_USER_INFO = gql`
  query getUserById($_id: ID!) {
    getUserById(_id: $_id) {
      firstName
      lastName
      helpCircle {
        _id
        firstName
        lastName
      } 
      requests {
        _id
        location
        type
        time
        date
        status
        participants {
          _id
          firstName
          lastName
        }
      }
      offers {
        _id
        location
        type
        time
        date
        status
        owner {
          _id
          firstName
          lastName
        }
        participants {
          _id
          firstName
          lastName
        }
      }
    }
  }
`;

export const QUERY_REQUESTS = gql`
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
