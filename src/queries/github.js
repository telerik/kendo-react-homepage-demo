import gql from "graphql-tag";
export const GITHUB_REPO_QUERY = gql`
query {
    repository(owner:"telerik", name:"kendo-react") {
      issues(last:100) {
        edges {
          node {
            title
            state
            number
            body
            createdAt
            author{
              login
              avatarUrl
            }
            assignees (last: 10) {
                nodes {
                  name
                  avatarUrl
                }
            }
            url
            labels(first:5) {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
  }`;
export const GITHUB_REPO_QUERY_REACT = gql`
query {
    repository(owner:"facebook", name:"react") {
      issues(last:100) {
        edges {
          node {
            title
            state
            number
            body
            createdAt
            author{
              login
              avatarUrl
            }
            assignees (last: 10) {
                nodes {
                  name
                  avatarUrl
                }
            }
            url
            labels(first:5) {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
  }`;

  export function getQuery(repo){
    if(repo === "kendo"){
        return GITHUB_REPO_QUERY
    } else if(repo === "react"){
        return GITHUB_REPO_QUERY_REACT
    }
  }