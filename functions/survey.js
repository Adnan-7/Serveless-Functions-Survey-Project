require('dotenv').config();
const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appzY7TorthrOd3qS')
  .table('survey');

exports.handler = async (event, context, cd) => {
  try {
    const { records } = await airtable.list();
    const survey = records.map((item) => {
      const { id } = item;
      const { votes, room } = item.fields;
      return { id, room, votes };
    });

    return {
      statusCode: 200,
      body: JSON.stringify(survey),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Server Error',
    };
  }
};
