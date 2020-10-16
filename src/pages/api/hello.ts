// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {NextApiRequest, NextApiResponse} from "next";

type Data = {
  name: string;
};

export default (_req: NextApiRequest, res: NextApiResponse<Data>): void => {
  res.statusCode = 200;
  res.json({name: "John Doe"});
};
