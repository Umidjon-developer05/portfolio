import { gql, request } from "graphql-request";
const MASTER_URL = `https://api-us-east-1-shared-usea1-02.hygraph.com/v2/cls1sckzi2vrh01utgehu6ke3/master`;

const getAllBanner = async () => {
  const query = gql`
    query Assets {
      banners {
        image {
          url
        }
        programing {
          ... on Programing {
            id
            dasturlashImage {
              url
            }
          }
        }
        firstName
        id
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};
const getAllPortfolio = async () => {
  const query = gql`
    query MyQuery {
      portfolios {
        id
        images {
          url
        }
        title
        portfoliocom {
          ... on Portfoliocom {
            id
            lanuges
          }
        }
        description
        url
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

export default {
  getAllBanner,
  getAllPortfolio,
};
