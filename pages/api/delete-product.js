import { NextApiHandler } from "next";
import { getXataClient } from '../../src/xata';


const xata = getXataClient();

const handler = async (req, res) => {
  const { id } = req.body;
  await xata.db["Product-Review"].delete(id);
  res.end();
};

export default handler;