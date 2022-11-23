import { getXataClient } from '../../src/xata';


const xata = getXataClient();

const handler = async (req, res) => {
  const {productName, productPrice, productReview, productImage} = req.body;
  const result = await xata.db["Product-Review"].create({productName, productPrice, productReview, productImage});
  res.send({result});
};

export default handler;