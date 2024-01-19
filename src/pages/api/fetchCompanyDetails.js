// import axios from 'axios';

// export default async function handler(req, res) {
//   let company_domain = req.body.domain_name;
//   if (company_domain) {
//     try {
//       const { data } = await axios.get(
//         `https://api.thecompaniesapi.com/v1/companies/${company_domain}?token=${process.env.THE_COMPANIES_API}`,
//       );
//       res.status(200).send(data);
//     } catch (error) {
//       res.status(500).send({ data: null, error: error });
//     }
//   } else {
//     res.status(200).send({ data: null, error: 'url is required in body' });
//   }
// }


import axios from 'axios';

export default async function handler(req, res) {
  let company_domain = req.body.domain_name;
  if (company_domain) {
    try {
      const { data } = await axios.get(
        `https://api.apollo.io/v1/organizations/enrich?api_key=${process.env.APPOLO_API}&domain=${company_domain}`,
      );
      res.status(200).send(data.organization);

    } catch (error) {
      res.status(500).send({ data: null, error: error });
    }
  } else {
    res.status(200).send({ data: null, error: 'url is required in body' });
  }
}
