import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query getUsersByName($firstName: String!, $lastName: String!) {
    getUsersByName(firstName: $firstName, lastName: $lastName) {
      _id
      firstName
      lastName
      zip
    }
  }
`;

export const QUERY_USER_INFO = gql`
  query getUserById($_id: ID!) {
    getUserById(_id: $_id) {
      _id
      firstName
      lastName
      zip
      helpCircle {
        _id
        firstName
        lastName
      } 
      requests {
        _id
        location
        type
        startTime
        endTime
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
        startTime
        endTime
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
  query getAllRequests {
    getAllRequests {
      _id
      requestTitle
      requestText
      owner
      createdAt
      location
      type
      startTime
      endTime
      status
      participants
    }
  }
`;

export const QUERY_SINGLE_REQUEST = gql`
  query getRequestById($requestId: ID!) {
    getRequestById(requestId: $requestId) {
      _id
      requestTitle
      requestText
      startTime
      endTime
      location
      type
      status
      createdAt
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
`;

export const QUERY_MY_REQUESTS = gql`
  query getMyRequests {
    getMyRequests {
      _id
      requestTitle
      location
      type
      startTime
      endTime
      requestText
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
`;

export const QUERY_MY_OFFERS = gql`
  query getMyOffers {
    getMyOffers {
      _id
      requestTitle
      location
      type
      startTime
      endTime
      status
      requestText
      owner {
          _id
          firstName
          lastName
          zip
      }
      participants {
          _id
          firstName
          lastName
          zip
      }
    }
  }
`;

export const QUERY_MY_HELP_CIRCLE = gql`
  query getMyHelpCircle {
    getMyHelpCircle {
      _id
      firstName
      lastName
      email
      zip
    }
  }
`;

export const QUERY_MY_FRIEND_REQUESTS = gql`
  query getMyFriendRequests {
    getMyFriendRequests {
      _id
      email
      firstName
      lastName
      zip
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      firstName
      lastName
      email
      zip
      helpCircle {
        _id
        firstName
        lastName
        zip
      } 
      requests {
        _id
        location
        type
        startTime
        endTime
        status
      }
      offers {
        _id
        location
        type
        startTime
        endTime
        status
      }
    }
  }
`;
